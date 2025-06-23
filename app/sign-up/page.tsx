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
import { saveUser, getUser } from "../../lib/users";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
export default function SignUp() {
  const router = useRouter();
  const [createUser] = useCreateUserWithEmailAndPassword(auth);
 // const [sendEmailVerification] = useSendEmailVerification(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async () => {
    setLoading(true);
    try {
      const userCredential = await createUser(email, password);
      if (userCredential) {
        const userData = {
          userId: userCredential.user.uid,
          user_email: userCredential.user.email || email,
          username: email.split('@')[0], // Use email prefix as username
          password: password, // Note: storing plain password is not secure
          account_status: 'active'
        };
        await saveUser(userData);
        if (userCredential && userCredential.user) {
          await sendEmailVerification(userCredential.user);
        }
        router.push("/");
      }
    } catch (e) {
      console.error("sign up error ",e);}
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result && result.user) {
        const userData = {
          userId: result.user.uid,
          user_email: result.user.email || '',
          username: result.user.displayName || result.user.email?.split('@')[0] || 'user',
          password: '', // Google users don't have a password
          account_status: 'active'
        };
        await saveUser(userData);
         // Only send verification for email/password users
       
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="bg-violet-100/60 h-dvh py-5 w-xl px-5 rounded-xl mx-auto flex justify-center items-center flex-col">
      <div className=" h-full w-96 text-center">
        <span  className="mx-auto h-9 w-9 flex justify-center items-center rounded bg-blue-100 ">
          <User className="h-6 w-6 text-violet-700"/>
        </span>
        <h1 className="text-center font-bold sm:text-2xl my-3 md:text-3xl">Create account</h1>
        <p className="text-gray-500">Enter your information to get started</p>
        {loading ? (
          <IconFidgetSpinner className="animate-spin w-8 h-8 mt-5" />
        ) : (
          <>
            <button
              className="cursor-pointer my-3 bg-white text-black w-xs p-4 rounded-md font-bold"
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
            </button>
           {/*  <span>
              <p className="text-gray-500 capitalize mb-3">Or continue with email</p>
            </span> */}
            <div className="mb-10 mt-4 flex items-center justify-center gap-4 text-gray-500 text-sm">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="whitespace-nowrap">OR CONTINUE WITH EMAIL</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <span>
            <Mail className="w-5 h-5  inline absolute ms-2 mt-3 text-gray-500 "/>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your Email"
              className="focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-200 ps-9 w-xs text-xl px-4 py-2 rounded-md border border-gray-300 mb-4"
            /></span>
            <span>
            <Lock className=" w-5 h-5 absolute ms-10 mt-3  text-gray-500 "/>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Create a Password"
              className="focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-200 ps-9  w-xs text-xl px-4 py-2 rounded-md border border-gray-300 mb-4"
            /></span>
            <button
              className="w-xs my-3 cursor-pointer bg-violet-500 text-white p-4  rounded-md font-bold"
              onClick={onSubmit}
            >
            Create account
            </button>
            <p className="mt-7 text-gray-500">Already have an account? <span className="text-violet-500 cursor-pointer" >
              <Link href="/sign-in"> Sign in</Link>
             </span></p>
          
          </>
        )}
      </div>
    </div>
  );
}