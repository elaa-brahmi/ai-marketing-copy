import { db } from './firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import {auth} from './firebase/firebaseConfig'

export async function saveCopy(data: any) {
    const user = auth.currentUser;
    const userId = user ? user.uid : null;
    if (!userId) throw new Error("User not authenticated");

    // Check for duplicate (same userId and productName)
    const q = query(
      collection(db, 'copies'),
      where('userId', '==', userId),
      where('productName', '==', data.productName)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Duplicate found
      return { error: "A copy with this product name already exists." };
    }

    // No duplicate, proceed to save
    return addDoc(collection(db, 'copies'), {
      userId,
      ...data,
      createdAt: serverTimestamp(),
    });
}