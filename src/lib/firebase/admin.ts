import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Validates each Firebase Admin env var individually and logs
 * specific, actionable error messages to the Vercel console.
 */
function validateEnvVars() {
    const issues: string[] = [];

    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

    // --- Check FIREBASE_ADMIN_PROJECT_ID ---
    if (!projectId) {
        issues.push("❌ FIREBASE_ADMIN_PROJECT_ID is MISSING. Set it to your Firebase project ID (e.g. 'my-school-app').");
    } else if (projectId.length < 4) {
        issues.push(`⚠️ FIREBASE_ADMIN_PROJECT_ID looks too short: "${projectId}". Expected something like 'my-school-app'.`);
    }

    // --- Check FIREBASE_ADMIN_CLIENT_EMAIL ---
    if (!clientEmail) {
        issues.push("❌ FIREBASE_ADMIN_CLIENT_EMAIL is MISSING. Set it to the service account email (e.g. 'firebase-adminsdk-xxxxx@my-app.iam.gserviceaccount.com').");
    } else if (!clientEmail.includes("@") || !clientEmail.includes(".iam.gserviceaccount.com")) {
        issues.push(`⚠️ FIREBASE_ADMIN_CLIENT_EMAIL doesn't look like a valid service account email: "${clientEmail}". Expected format: 'firebase-adminsdk-xxxxx@<project>.iam.gserviceaccount.com'.`);
    }

    // --- Check FIREBASE_ADMIN_PRIVATE_KEY ---
    if (!privateKey) {
        issues.push("❌ FIREBASE_ADMIN_PRIVATE_KEY is MISSING. Copy it from your service account JSON (the field called 'private_key').");
    } else if (privateKey.includes("YOUR_PRIVATE_KEY_HERE") || privateKey.includes("PLACEHOLDER")) {
        issues.push("❌ FIREBASE_ADMIN_PRIVATE_KEY contains a placeholder value. Replace it with the actual private key from your service account JSON.");
    } else if (!privateKey.includes("PRIVATE KEY")) {
        issues.push("⚠️ FIREBASE_ADMIN_PRIVATE_KEY doesn't contain 'PRIVATE KEY' header. Make sure you copied the FULL key including '-----BEGIN PRIVATE KEY-----' and '-----END PRIVATE KEY-----'.");
    } else if (!privateKey.includes("-----BEGIN") || !privateKey.includes("-----END")) {
        issues.push("⚠️ FIREBASE_ADMIN_PRIVATE_KEY is missing BEGIN/END markers. Ensure the full PEM key is included.");
    }

    return { issues, projectId, clientEmail, privateKey };
}

function initAdmin(): Firestore {
    console.log("[Firebase Admin] Initializing...");

    const { issues, projectId, clientEmail, privateKey } = validateEnvVars();

    if (issues.length > 0) {
        console.error("═══════════════════════════════════════════════════════");
        console.error("[Firebase Admin] ❌ CONFIGURATION ERRORS DETECTED:");
        console.error("═══════════════════════════════════════════════════════");
        issues.forEach((issue, i) => console.error(`  ${i + 1}. ${issue}`));
        console.error("───────────────────────────────────────────────────────");
        console.error("  💡 Fix: Go to Vercel → Project Settings → Environment Variables");
        console.error("  💡 After adding/fixing vars, trigger a redeploy.");
        console.error("═══════════════════════════════════════════════════════");
        throw new Error(`[Firebase Admin] ${issues.length} configuration error(s). Check Vercel logs for details.`);
    }

    // Process escaped newlines — Vercel/dotenv stores \n as literal "\\n",
    // which causes "DECODER routines::unsupported" if not converted to real newlines.
    const serviceAccount: ServiceAccount = {
        projectId: projectId!,
        clientEmail: clientEmail!,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
    };

    try {
        const adminApp =
            getApps().length > 0
                ? getApps()[0]
                : initializeApp({ credential: cert(serviceAccount) });

        const db = getFirestore(adminApp);
        console.log(`[Firebase Admin] ✅ Initialized successfully for project: "${projectId}"`);
        return db;
    } catch (error: any) {
        console.error("═══════════════════════════════════════════════════════");
        console.error("[Firebase Admin] ❌ INITIALIZATION FAILED:");
        console.error("═══════════════════════════════════════════════════════");
        console.error(`  Error: ${error.message}`);

        if (error.message?.includes("private key")) {
            console.error("  💡 Hint: FIREBASE_ADMIN_PRIVATE_KEY format is invalid.");
            console.error("  💡 Common fix: In Vercel env vars, paste the key WITHOUT wrapping quotes.");
            console.error("  💡 The key should start with: -----BEGIN PRIVATE KEY-----");
        } else if (error.message?.includes("project")) {
            console.error("  💡 Hint: FIREBASE_ADMIN_PROJECT_ID might be wrong.");
        } else if (error.message?.includes("credential") || error.message?.includes("auth")) {
            console.error("  💡 Hint: Service account credentials don't match the project.");
            console.error("  💡 Make sure all 3 vars are from the SAME service account JSON file.");
        }

        console.error("═══════════════════════════════════════════════════════");
        throw error;
    }
}

// Lazy initialization to avoid build-time errors when env vars are not set
let _adminDb: Firestore | null = null;

export function getAdminDb(): Firestore {
    if (!_adminDb) {
        _adminDb = initAdmin();
    }
    return _adminDb;
}
