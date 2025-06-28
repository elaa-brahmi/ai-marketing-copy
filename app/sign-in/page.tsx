"use client";
import { auth } from "../../lib/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { signInWithGoogle } from "../../lib/firebase/auth";

import {  getUserByEmail } from "../../lib/users";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner"

import { getIdToken} from "firebase/auth";
//import {setServerCookie} from '../../components/common/AuthSyncer';
import { User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { IconFidgetSpinner } from "@tabler/icons-react";

export default function SignInPage() {
  const router = useRouter();
  const [createUser] = useCreateUserWithEmailAndPassword(auth);
 // const [sendEmailVerification] = useSendEmailVerification(auth);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);

      if (userCredential && userCredential.user) {
       const userExists= await getUserByEmail(email);
        if (userExists  ) {
          const token = await getIdToken(userCredential.user, true);
          const expires = new Date(Date.now() + 3 * 60 * 60 * 1000).toUTCString(); // 3 hours from now
          document.cookie = `firebase_id_token=${token};  expires=${expires}; path=/;`;
         // await setServerCookie();
          window.location.href = "/";
        } else {
          toast.error("verify credentials");
        }
      }
    } catch (e: any) {
      if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
        toast.error("Invalid credentials. Please check your email and password")

      } else {
        console.error("sign in error ", e);
        toast.error("An unexpected error occurred. Please try again")
      }
    }
    setLoading(false);
  };
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      const user = auth.currentUser;
      console.log("user after signing in with google",user);
      if (user) {
        const googleEmail = user.email as string;
        const userExists = await getUserByEmail(googleEmail);
        if (userExists) {
          console.log("userExists", userExists)
          const token = await getIdToken(user, true);
          const expires = new Date(Date.now() + 3 * 60 * 60 * 1000).toUTCString(); // 3 hours from now
          document.cookie = `firebase_id_token=${token};  expires=${expires}; path=/;`;
          //await setServerCookie();
          window.location.href = "/";
        } else {
          toast.error("you don't have an account with google try signing up")
        }
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  return (
    <div className="mt-7 bg-violet-100/60 h-auto py-5 w-xl px-5 rounded-xl mx-auto flex justify-center items-center flex-col">
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
             <img src="icons8-google.svg" className="inline me-2 h-7 w-7"/>
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