import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {collection, getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyBL7i4bWuLKPUhLKZlavgtgOUXe7aH-IGQ",
    authDomain: "liftwise-d4d9e.firebaseapp.com",
    projectId: "liftwise-d4d9e",
    storageBucket: "liftwise-d4d9e.appspot.com",
    messagingSenderId: "792631455473",
    appId: "1:792631455473:web:2d907c84bfd69d934f8350",
    measurementId: "G-VJX32SVM4R"
};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app)

export {app, auth, firestore, storage};

// ----------- firebase fetch - létrehozás dátuma
export const getAccountCreationDate = async (userId) => {
    try {
        // const userDocRef = firestore.collection('users').doc(userId);
        const userDocRef = collection(firestore, "users", userId, "links");
        const userDoc = await userDocRef.get();

        if (userDoc.exists) {
            const userData = userDoc.data();
            const accountCreationDate = userData.createdAt;

            return accountCreationDate;
        } else {
            throw new Error('Nem található ilyen felhasználó!');
        }
    } catch (error) {
        console.error('Hiba a dátum megjelenítésében:', error.message);
        throw error;
    }
};
// -----------
