import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCpiEU3wTjqsfTd4lY7_Kdtm7U4wS_1oxQ",
  authDomain: "crwn-db-a7824.firebaseapp.com",
  projectId: "crwn-db-a7824",
  storageBucket: "crwn-db-a7824.appspot.com",
  messagingSenderId: "405051126497",
  appId: "1:405051126497:web:82a5135385606fc5c1fda0",
  measurementId: "G-G3GXL2Y1H5",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
