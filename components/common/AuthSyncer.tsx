"use client"
// components/common/AuthSyncer.tsx
import { useEffect } from "react";
import { signOut } from "../../lib/firebase/auth";
import Cookies from "js-cookie";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase/firebaseConfig";
import { getIdToken } from "firebase/auth";

export default function AuthSyncer() {
  const [user, loading] = useAuthState(auth);
  
  useEffect(() => {
    if (!loading && user) {
      // Get the current token and set it as a cookie
      getIdToken(user, true).then((token) => {
        if (token) {
          Cookies.set("firebase_id_token", token, { 
            expires: 7, // 7 days
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
        }
      }).catch((error) => {
        console.error("Error getting ID token:", error);
      });
    } else if (!loading && !user) {
      // Clear the cookie when user is not authenticated
      Cookies.remove("firebase_id_token");
    }
  }, [user, loading]);

  return null;
}

/* export async function setServerCookie() {
  const user = auth.currentUser;
  if (user) {
    const token = await getIdToken(user, true);
    await fetch("/api/set-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  }
} */