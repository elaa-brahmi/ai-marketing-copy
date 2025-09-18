import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  collection 
} from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";

export type User = {
  userId: string;
  user_email: string;
  username: string;
  account_status: string;
};

// Save user to Firestore only if they don't exist 
export async function saveUser(user: User): Promise<boolean> {
  const userRef = doc(db, "users", user.userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, user);
    return true; // User created
  }
  return false; // User already exists
}

//Get user by UID 
export async function getUser(userId: string): Promise<User | null> {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.exists() ? (userDoc.data() as User) : null;
}

//Check if a user with the given email already exists
export async function getUserByEmail(email: string): Promise<boolean> {
  const q = query(collection(db, "users"), where("user_email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}
