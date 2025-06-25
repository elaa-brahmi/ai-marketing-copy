
// components/common/AuthSyncer.tsx
import { useEffect } from "react";
import { signOut } from "../../lib/firebase/auth";
import Cookies from "js-cookie";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase/firebaseConfig";

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