/**
 * Triggers on-demand revalidation for the public student list pages.
 * Called from admin dashboard after add/edit/delete operations.
 *
 * Uses NEXT_PUBLIC_REVALIDATION_SECRET to authenticate with the API route.
 * Handles errors gracefully — a failed revalidation should NOT block admin operations.
 */
export async function triggerRevalidation(): Promise<void> {
    try {
        const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
        const secret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET;

        if (!secret) {
            console.warn(
                "[Revalidation] NEXT_PUBLIC_REVALIDATION_SECRET is not set. Skipping revalidation."
            );
            return;
        }

        const response = await fetch(`${baseUrl}/api/revalidate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-revalidation-secret": secret,
            },
            body: JSON.stringify({ tag: "daftar-siswa" }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error(
                `[Revalidation] API returned ${response.status}:`,
                errorData
            );
            // Do NOT throw — revalidation failure should not block admin operations
            return;
        }

        const result = await response.json();
        console.log("[Revalidation] Success:", result);
    } catch (error) {
        // Network errors, fetch failures, etc.
        // Silently log — admin operations should always succeed regardless of revalidation
        console.error("[Revalidation] Failed to trigger:", error);
    }
}
