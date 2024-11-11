import { collection, addDoc, getDocs, deleteDoc, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const savedArticlesCollectionRef = collection(firestore, "savedarticles");

// Save an article for a user
export const saveArticle = async (userId, articleId) => {
    try {
        const saveData = {
            userId,
            articleId,
            savedAt: new Date().toISOString()
        };
        
        const docRef = await addDoc(savedArticlesCollectionRef, saveData);
        return { id: docRef.id, ...saveData };
    } catch (error) {
        console.error("Error saving article:", error);
        throw error;
    }
};

// Get all saved articles for a specific user
export const getUserSavedArticles = async (userId) => {
    try {
        const q = query(savedArticlesCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const savedArticles = [];
        
        querySnapshot.forEach((doc) => {
            savedArticles.push({ id: doc.id, ...doc.data() });
        });
        
        return savedArticles;
    } catch (error) {
        console.error("Error getting saved articles:", error);
        throw error;
    }
};

// Check if a user has saved a specific article
export const isArticleSaved = async (userId, articleId) => {
    try {
        const q = query(
            savedArticlesCollectionRef, 
            where("userId", "==", userId),
            where("articleId", "==", articleId)
        );
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error("Error checking saved article:", error);
        throw error;
    }
};

// Unsave an article for a user
export const unsaveArticle = async (userId, articleId) => {
    try {
        const q = query(
            savedArticlesCollectionRef,
            where("userId", "==", userId),
            where("articleId", "==", articleId)
        );
        const querySnapshot = await getDocs(q);
        
        // Delete the first matching document
        if (!querySnapshot.empty) {
            await deleteDoc(querySnapshot.docs[0].ref);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error unsaving article:", error);
        throw error;
    }
};