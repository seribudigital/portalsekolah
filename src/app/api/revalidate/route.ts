import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * POST /api/revalidate
 * Body: { "tag": "daftar-siswa" }
 * Header: x-revalidation-secret: <REVALIDATION_SECRET>
 *
 * Triggers on-demand revalidation for the specified cache tag.
 */
export async function POST(request: NextRequest) {
    try {
        const secret = request.headers.get("x-revalidation-secret");

        if (secret !== process.env.REVALIDATION_SECRET) {
            return NextResponse.json(
                { error: "Invalid revalidation secret" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const tag = body?.tag;

        if (!tag || typeof tag !== "string") {
            return NextResponse.json(
                { error: "Missing or invalid 'tag' in request body" },
                { status: 400 }
            );
        }

        revalidateTag(tag, "max");

        return NextResponse.json(
            { revalidated: true, tag, timestamp: Date.now() },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("[Revalidate API] Error:", error);
        return NextResponse.json(
            { error: "Internal server error", message: error.message },
            { status: 500 }
        );
    }
}
