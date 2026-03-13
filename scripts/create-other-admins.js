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

const admins = [
    { email: 'admin-tk@alkhoir.sch.id', pass: 'admin123', name: 'Admin TK Al-Khoir', unit: 'TK' },
    { email: 'admin-mts@alkhoir.sch.id', pass: 'admin123', name: 'Admin MTS Al-Khoir', unit: 'MTS' },
    { email: 'admin-ma@alkhoir.sch.id', pass: 'admin123', name: 'Admin MA Al-Khoir', unit: 'MA' }
];

async function createDummyAdmins() {
    for (const admin of admins) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, admin.email, admin.pass);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: admin.email,
                displayName: admin.name,
                role: 'ADMIN_UNIT',
                unit: admin.unit
            });

            console.log(`Dummy Admin ${admin.unit} created successfully:`, user.uid);
        } catch (error) {
            console.error(`Error creating dummy admin ${admin.unit}:`, error.message);
        }
    }
    process.exit(0);
}

createDummyAdmins();
