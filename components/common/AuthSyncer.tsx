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
      const token = Cookies.get("firebase_id_token");
      if (!token) {
        signOut();
      }
    }
  }, [user, loading]);

  return null;
}

export async function setServerCookie() {
  const user = auth.currentUser;
  if (user) {
    const token = await getIdToken(user, true);
    // Send token to your server to set the cookie
    await fetch("/api/set-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  }
}