// firebaseArticlesService.js
import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase"; // adjust the import path based on your setup

const articlesCollectionRef = collection(firestore, "articles");

// Create a new article with validation
export const createArticle = async (articleData) => {
    try {
        // Validate required fields
        if (!articleData.title?.trim()) {
            throw new Error("A cikk címe kötelező!");
        }
        if (!articleData.content?.trim()) {
            throw new Error("A cikk tartalma kötelező!");
        }
        if (!articleData.img_path) {
            throw new Error("Kép feltöltése kötelező!");
        }

        const docRef = await addDoc(articlesCollectionRef, articleData);
        return { id: docRef.id, ...articleData };
    } catch (error) {
        console.error("Error creating article:", error);
        throw error; // Re-throw the error to be handled by the component
    }
};

// Read an article by ID
export const getArticleById = async (id) => {
    try {
        const docRef = doc(firestore, "articles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Article not found!");
        }
    } catch (error) {
        console.error("Error getting article:", error);
        throw error;
    }
};

// Get all articles
export const getAllArticles = async () => {
    try {
        const q = query(
            articlesCollectionRef,
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const articles = [];
        querySnapshot.forEach((doc) => {
            articles.push({ id: doc.id, ...doc.data() });
        });
        return articles;
    } catch (error) {
        console.error("Error getting articles:", error);
        throw error;
    }
};

// Update an article by ID
export const updateArticle = async (id, updatedData) => {
    try {
        const docRef = doc(firestore, "articles", id);
        await updateDoc(docRef, updatedData);
        return { id, ...updatedData };
    } catch (error) {
        console.error("Error updating article:", error);
        throw error;
    }
};

// Delete an article by ID
export const deleteArticle = async (id) => {
    try {
        const docRef = doc(firestore, "articles", id);
        await deleteDoc(docRef);
        return id;
    } catch (error) {
        console.error("Error deleting article:", error);
        throw error;
    }
};

export const getArticlesByAuthor = async (userId) => {
    try {
        // Simplified query that only filters by author
        const q = query(
            articlesCollectionRef,
            where("author", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const articles = [];
        querySnapshot.forEach((doc) => {
            articles.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort the articles by createdAt locally
        return articles.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    } catch (error) {
        console.error("Error getting author's articles:", error);
        throw error;
    }
};