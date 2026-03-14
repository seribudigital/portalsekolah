import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

function initAdmin(): Firestore {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey || privateKey.includes("YOUR_PRIVATE_KEY_HERE")) {
        throw new Error(
            "[Firebase Admin] Missing or invalid credentials. " +
            "Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY in your environment variables."
        );
    }

    const serviceAccount: ServiceAccount = {
        projectId,
        clientEmail,
        privateKey,
    };

    const adminApp =
        getApps().length > 0
            ? getApps()[0]
            : initializeApp({ credential: cert(serviceAccount) });

    return getFirestore(adminApp);
}

// Lazy initialization to avoid build-time errors when env vars are not set
let _adminDb: Firestore | null = null;

export function getAdminDb(): Firestore {
    if (!_adminDb) {
        _adminDb = initAdmin();
    }
    return _adminDb;
}
