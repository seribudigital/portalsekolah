require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createDummyAdmin() {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, 'admin-sd@alkhoir.sch.id', 'admin123');
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: 'admin-sd@alkhoir.sch.id',
            displayName: 'Admin SD Al-Khoir',
            role: 'ADMIN_UNIT',
            unit: 'SD'
        });

        console.log('Dummy Admin SD created successfully:', user.uid);
        process.exit(0);
    } catch (error) {
        console.error('Error creating dummy admin:', error);
        process.exit(1);
    }
}

createDummyAdmin();
