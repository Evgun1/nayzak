import { initializeApp } from "firebase/app";
import admin from "firebase-admin";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "shopez-53fe0.firebaseapp.com",
    databaseURL:
        "https://shopez-53fe0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shopez-53fe0",
    messagingSenderId: "314152683790",
    appId: "1:314152683790:web:d221aa296c2a629b78ef5f",
    storageBucket: "shopez-53fe0.appspot.com",
};

export default initializeApp(firebaseConfig);
