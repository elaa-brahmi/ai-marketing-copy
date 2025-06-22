import { DocumentData, Query, getDocs } from "firebase/firestore";
import { auth,usersCollection,db } from "./firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
export type User = {
  userId: string;
  user_email: string;
  username: string;
  password: string; // Do NOT store plain passwords in production!
  account_status: string;
};

// Save user to Firestore
export async function saveUser(user: User) {
  await setDoc(doc(db, "users", user.userId), user);
}

// Retrieve user from Firestore
export async function getUser(userId: string): Promise<User | null> {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data() as User;
  }
  return null;
}