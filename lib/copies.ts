import { db } from './firebase/firebaseConfig';
import { collection,addDoc,serverTimestamp, query, where, getDocs, deleteDoc, doc, orderBy } from 'firebase/firestore';
import {auth} from './firebase/firebaseConfig'

export async function getAllCopies(userId: string) {
    if (!userId) throw new Error("User not authenticated");
    const q = query(
      collection(db, 'copies'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
  export async function deleteCopyById(id: string) {
    await deleteDoc(doc(db, 'copies', id));
  }
  export async function removeCopies(userId: string){
    if (!userId) throw new Error("User not authenticated");
    const q = query(
      collection(db, 'copies'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, 'copies', docSnap.id))
    );
    await Promise.all(deletePromises);

  }
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