"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { CheckCircle2, Loader2, Wrench, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FixAdminPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [success, setSuccess] = useState(false);
    const [details, setDetails] = useState("");
    const [checkingDoc, setCheckingDoc] = useState(false);
    const [docExists, setDocExists] = useState<boolean | null>(null);
    const [checkStatus, setCheckStatus] = useState("");
    const router = useRouter();

    const handleFix = async () => {
        setLoading(true);
        setSuccess(false);
        setStatus("Logging in as admin to get UID...");
        setDetails("");

        try {
            // Login with the existing credentials
            const userCred = await signInWithEmailAndPassword(auth, "admin@alkhoir.sch.id", "admin123");
            const uid = userCred.user.uid;

            setStatus(`Got UID: ${uid}. Writing SUPER_ADMIN document...`);

            // Force write the missing document
            const adminRef = doc(db, "users", uid);
            await setDoc(adminRef, {
                uid: uid,
                email: "admin@alkhoir.sch.id",
                displayName: "Administrator Al-Khoir",
                role: "SUPER_ADMIN",
                unit: "ALL"
            });

            setStatus("Document created successfully!");
            setDetails("You can now close this page and login at /login");
            setSuccess(true);
        } catch (error: any) {
            console.error(error);
            setStatus(`Error: ${error.message}`);
            setDetails(`Code: ${error.code}. If this is a permission error, please temporarily open your Firestore Rules again.`);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckDoc = async () => {
        setCheckingDoc(true);
        setDocExists(null);
        setCheckStatus("Checking for admin document...");

        try {
            const userCred = await signInWithEmailAndPassword(auth, "admin@alkhoir.sch.id", "admin123");
            const uid = userCred.user.uid;
            const adminRef = doc(db, "users", uid);
            const docSnap = await getDoc(adminRef);

            if (docSnap.exists()) {
                setDocExists(true);
                setCheckStatus("Admin document found!");
            } else {
                setDocExists(false);
                setCheckStatus("Admin document NOT found. Please click 'Fix Broken Admin Account'.");
            }
        } catch (error: any) {
            console.error(error);
            setDocExists(false);
            setCheckStatus(`Error checking document: ${error.message} (Code: ${error.code})`);
        } finally {
            setCheckingDoc(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-4">
            <Card className="border-red-200 shadow-md">
                <CardHeader className="bg-red-50 text-red-900 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-red-600" />
                        Fix Admin Document
                    </CardTitle>
                    <CardDescription className="text-red-700/80">
                        This will create the missing Firestore document for the admin user.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <Button
                        onClick={handleFix}
                        disabled={loading || success}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {success ? "Fixed Successfully" : "Fix Broken Admin Account"}
                    </Button>

                    {status && (
                        <div className={`p-4 rounded-md text-sm font-medium ${success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                            {success && <CheckCircle2 className="inline-block mr-2 w-4 h-4" />}
                            {status}
                            {details && <div className="mt-2 text-xs font-mono bg-white/50 p-2 rounded">{details}</div>}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
