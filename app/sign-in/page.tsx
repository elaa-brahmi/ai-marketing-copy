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
import { User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { IconFidgetSpinner } from "@tabler/icons-react";

export default function SignInPage() {
  const router = useRouter();
 // const [sendEmailVerification] = useSendEmailVerification(auth);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      setEmail('');
      setPassword('');
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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 flex justify-center items-center rounded-full bg-violet-100 mb-4">
              <User className="h-6 w-6 text-violet-700"/>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600 text-sm sm:text-base">Sign in to your account to continue</p>
          </div>

          {/* Demo Credentials */}
          <div className="mb-6 p-4 rounded-xl bg-violet-50 border border-violet-200">
            <p className="text-violet-700 font-semibold text-sm mb-1">Demo Credentials:</p>
            <p className="text-gray-600 text-xs sm:text-sm">Email: demo@example.com | Password: password</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <IconFidgetSpinner className="animate-spin w-8 h-8 text-violet-600" />
            </div>
          ) : (
            <>
              {/* Google Sign In */}
              <button
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 p-3 sm:p-4 rounded-lg font-medium text-sm sm:text-base mb-6"
                onClick={handleGoogleSignIn}
              >
                <img src="icons8-google.svg" className="h-5 w-5 sm:h-6 sm:w-6"/>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center gap-4 text-gray-500 text-xs sm:text-sm mb-6">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="whitespace-nowrap px-2">OR CONTINUE WITH EMAIL</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/* Email Input */}
              <div className="relative mb-4">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter your Email"
                  className="w-full pl-10 pr-4 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Password Input */}
              <div className="relative mb-6">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter your Password"
                  className="w-full pl-10 pr-4 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Sign In Button */}
              <button
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 sm:py-4 rounded-lg transition-colors duration-200 text-sm sm:text-base mb-6"
                onClick={onSubmit}
              >
                Sign in
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 text-sm sm:text-base">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-violet-600 hover:text-violet-700 font-medium">
                  Sign up
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}