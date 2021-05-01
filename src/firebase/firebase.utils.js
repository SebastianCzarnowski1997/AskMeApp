import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyApoT224vumN-0EZAEh9UQydNSSs-4qvNk",
  authDomain: "crwn-db-dbeb2.firebaseapp.com",
  databaseURL: "https://crwn-db-dbeb2.firebaseio.com",
  projectId: "crwn-db-dbeb2",
  storageBucket: "crwn-db-dbeb2.appspot.com",
  messagingSenderId: "367283906070",
  appId: "1:367283906070:web:2a638f4b4cb2d55cb63737",
  measurementId: "G-XQMSWJTB30"
};
export const createUserProfileDocument = async (userAuth, addctionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addctionalData
      });
    } catch(error){
      console.log(error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;