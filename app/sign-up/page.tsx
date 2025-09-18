"use client";
import { auth } from "../../lib/firebase/firebaseConfig";
import { IconFidgetSpinner } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { saveUser } from "../../lib/users";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner"

export default function SignUp() {
  const [createUser] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
  });
  return () => unsubscribe();
}, []);
const onSubmit = async () => {
  setLoading(true);
  try {
    const userCredential = await createUser(email, password);

    if (!userCredential) {
      throw new Error("user having this email already exists");
    }

    const uid = userCredential.user.uid;

  

    const userData = {
      userId: uid,
      user_email: userCredential.user.email || email,
      username: email.split("@")[0],
      account_status: "active",
    };
    await saveUser(userData);

    const token = await getIdToken(userCredential.user, true);
    const expires = new Date(Date.now() + 3 * 60 * 60 * 1000).toUTCString();

    document.cookie = `firebase_id_token=${token}; expires=${expires}; path=/;`;

    toast.success("Account created successfully!");
    window.location.href = "/";
  } catch (e: any) {
    console.error("Sign up error", e);
    toast.error(e.message || "Sign up failed");
  } finally {
    setLoading(false);
  }
};



  const handleGoogleSignIn = async () => {
  setLoading(true);
  try {
    const result = await signInWithGoogle();

    if (result && result.user) {
      const { uid, email, displayName } = result.user;

      const userData = {
        userId: uid,
        user_email: email || "",
        username: displayName || email?.split("@")[0] || "user",
        account_status: "active",
      };

      // Save to Firestore (only if new)
      const wasCreated = await saveUser(userData);

      if (wasCreated) {
      } else {
      }

      // Save token to cookie
      const token = await result.user.getIdToken(true);
      const expires = new Date(Date.now() + 3 * 60 * 60 * 1000).toUTCString();
      document.cookie = `firebase_id_token=${token}; expires=${expires}; path=/; SameSite=Lax; Secure`;

      window.location.href = "/";
    }
  } catch (e) {
    console.error("Google Sign-In Error:", e);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 flex justify-center items-center rounded-full bg-violet-100 mb-4">
              <User className="h-6 w-6 text-violet-700" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Create account
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Enter your information to get started
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <IconFidgetSpinner className="animate-spin w-8 h-8 text-violet-600" />
            </div>
          ) : (
            <>
              {/* Google Sign-Up */}
              <button
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 p-3 sm:p-4 rounded-lg font-medium text-sm sm:text-base mb-6"
                onClick={handleGoogleSignIn}
              >
                <img
                  src="icons8-google.svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  alt="Google"
                />
                Sign up with Google
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center gap-4 text-gray-500 text-xs sm:text-sm mb-6">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="whitespace-nowrap px-2">
                  OR CONTINUE WITH EMAIL
                </span>
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
                  placeholder="Create a Password"
                  className="w-full pl-10 pr-4 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Create Account Button */}
              <button
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 sm:py-4 rounded-lg transition-colors duration-200 text-sm sm:text-base mb-6"
                onClick={onSubmit}
              >
                Create account
              </button>

              {/* Sign In Link */}
              <p className="text-center text-gray-600 text-sm sm:text-base">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-violet-600 hover:text-violet-700 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
