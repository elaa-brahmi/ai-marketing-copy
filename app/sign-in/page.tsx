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
import {  getUserByEmail,verifyPassword } from "../../lib/users";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { getIdToken } from "firebase/auth";
export default function SignIn() {
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential && userCredential.user) {
        // Fetch user from Firestore
       // const userFromDb = await getUser(userCredential.user.uid);
       const userExists= await getUserByEmail(email);
       const passwordVerified=await verifyPassword(email,password)
        if (userExists && passwordVerified ) {
          const token = await getIdToken(userCredential.user, true);
          document.cookie = `firebase_id_token=${token}; path=/;`;
          window.location.href = "/";
        } else {
          alert("verify credentials.");
        }
      }
    } catch (e: any) {
      if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
        alert("Invalid credentials. Please check your email and password.");
      } else {
        console.error("sign in error ", e);
        alert("An unexpected error occurred. Please try again.");
      }
    }
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
        const googleEmail=result.user.email as string;
        const userExists= await getUserByEmail(googleEmail);
        if (userExists) {
          const token = await getIdToken(result.user, true);
          document.cookie = `firebase_id_token=${token}; path=/;`;
         window.location.href = "/";
        }
        else{
          alert("you don't have an account with google try signig up ")

        }
        //wait saveUser(userData);
       
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  return (
    <div className="bg-violet-100/60 h-auto py-5 w-xl px-5 rounded-xl mx-auto flex justify-center items-center flex-col">
      <div className=" h-full w-96 text-center">
        <span  className="mx-auto h-9 w-9 flex justify-center items-center rounded bg-blue-100 ">
          <User className="h-6 w-6 text-violet-700"/>
        </span>
        <h1 className="text-center font-bold sm:text-2xl my-3 md:text-3xl">Welcome back</h1>
        <p className="text-gray-500">Sign in to your account to continue</p>
        <span className=" my-3 flex p-3 flex-col items-start justify-start rounded-xl bg-violet-200">
            <p className="text-violet-700 font-semibold text-start">Demo Credentials:</p>
            <p className="text-gray-500">Email: demo@example.com | Password: password</p>
        </span>
        {loading ? (
          <IconFidgetSpinner className="animate-spin w-8 h-8 mt-10 mx-auto" />
        ) : (
          <>
            <button
              className="cursor-pointer my-3 bg-white text-black w-xs p-4 rounded-md font-bold"
              onClick={handleGoogleSignIn}
            >
              Continue with Google
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
            <Mail className="w-5 h-5  inline absolute ms-2 mt-5 text-gray-500 "/>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your Email"
              className="focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-200 ps-9 w-xs text-xl px-4 py-2 py-4 rounded-md border border-gray-300 mb-4"
            /></span>
            <span>
            <Lock className=" w-5 h-5 absolute ms-10 mt-5  text-gray-500 "/>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Create a Password"
              className="focus:outline-none focus:ring-2 focus:ring-violet-500  transition-colors duration-200 ps-9  w-xs text-xl px-4 py-4 rounded-md border border-gray-300 mb-4"
            /></span>
            <button
              className="w-xs my-3 cursor-pointer bg-violet-500 text-white p-4  rounded-md font-bold"
              onClick={onSubmit}
            >
            Sign in
            </button>
            <p className="mt-7 text-gray-500">Don't have an account? <span className="text-violet-500 cursor-pointer" >
              <Link href="/sign-up"> Sign up</Link>
             </span></p>
          
          </>
        )}
      </div>
    </div>
  );
}