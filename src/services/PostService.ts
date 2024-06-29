// src/services/PostService.ts
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Post } from "../models/Post";

const postsCollection = collection(db, "posts");

const PostService = {
    getPosts: async (): Promise<Post[]> => {
        const postsSnapshot = await getDocs(postsCollection);
        return postsSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        })) as Post[];
    },

    addPost: async (post: Post): Promise<void> => {
        await addDoc(postsCollection, post);
    },

    updatePost: async (id: string, updatedPost: Partial<Post>): Promise<void> => {
        const postDoc = doc(db, "posts", id);
        await updateDoc(postDoc, updatedPost);
    },

    deletePost: async (id: string): Promise<void> => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    }
};

export default PostService;
