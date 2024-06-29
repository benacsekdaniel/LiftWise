// src/services/UserService.ts
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const savedCollection = collection(db, "saved");

const UserService = {
    savePost: async (userId: string, postId: string): Promise<void> => {
        await addDoc(savedCollection, { userId, postId });
    },

    getSavedPosts: async (userId: string): Promise<string[]> => {
        const q = query(savedCollection, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => doc.data().postId as string);
    },

    removeSavedPost: async (userId: string, postId: string): Promise<void> => {
        const q = query(savedCollection, where("userId", "==", userId), where("postId", "==", postId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docId = querySnapshot.docs[0].id;
            await deleteDoc(doc(db, "saved", docId));
        }
    }
};

export default UserService;
