import { initializeApp } from "firebase/app";
import admin from "firebase-admin";

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   storageBucket: "shopez-53fe0.appspot.com",
// });

// const bucket = admin.storage().bucket();
//
// export default bucket;

const firebaseConfig = {
  apiKey: "AIzaSyCCMena_pvGh-8c76aLShlzKa_sf3F3kIs",
  authDomain: "shopez-53fe0.firebaseapp.com",
  databaseURL:
    "https://shopez-53fe0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shopez-53fe0",
  messagingSenderId: "314152683790",
  appId: "1:314152683790:web:d221aa296c2a629b78ef5f",
  storageBucket: "shopez-53fe0.appspot.com",
};

export default initializeApp(firebaseConfig);
