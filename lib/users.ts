import { DocumentData, Query, getDocs } from "firebase/firestore";
import { auth,usersCollection,db } from "./firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
export type User = {
  userId: string;
  user_email: string;
  username: string;
  account_status: string;
};
import { collection, query, where } from "firebase/firestore";

// Save user to Firestore
export async function saveUser(user: User) {
  //check whether the user already exists
  const userRef = doc(db, "users", user.userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, user);
    return true; // User was created
  }
  return false; // User already exists
}

// Retrieve user from Firestore
export async function getUser(userId: string): Promise<User | null> {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data() as User;
  }
  return null;
}
export async function getUserByEmail(email: string): Promise<boolean | null> {
  const q = query(collection(db, "users"), where("user_email", "==", email));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return true;
  }
  return false;
}


