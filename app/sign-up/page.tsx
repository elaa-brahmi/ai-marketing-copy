"use client";
import { auth } from "../../lib/firebase/firebaseConfig";
import { IconFidgetSpinner } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { usersCollection } from "../../lib/firebase/firebaseConfig";
export default function SignUp() {
  const router = useRouter();
  const [createUser] = useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async () => {
    setLoading(true);
    try {
      const userCredential = await createUser(email, password);
      if (userCredential) {
        await addDoc(usersCollection, {
          email: userCredential.user.email,
          createdAt: serverTimestamp(),
        });
        await sendEmailVerification();
        router.push("/");
      }
    } catch (e) {
      console.error(e);}
    setLoading(false);
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <h1>Create account</h1>
      {loading ? (
        <IconFidgetSpinner className="animate-spin w-8 h-8" />
      ) : (
        <>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="text-xl px-4 py-2 rounded-md border border-gray-300 mb-4"
          />
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="text-xl px-4 py-2 rounded-md border border-gray-300 mb-4"
          />
          <button
            className="cursor-pointer bg-yellow-500 text-black px-4 py-2 rounded-md font-bold"
            onClick={onSubmit}
          >
            SIGN UP
          </button>
          <button
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 mt-4 rounded-md font-bold"
            onClick={() => signInWithGoogle()}
          >
            Sign In with Google
          </button>
        </>
      )}
    </div>
  );
}