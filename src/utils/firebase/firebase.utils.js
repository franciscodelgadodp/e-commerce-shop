import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from  'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQpyhz8OTHpbYL33Y_sOYuBq94RSP07E0",
  authDomain: "e-commerce-shop-db-8cdb9.firebaseapp.com",
  projectId: "e-commerce-shop-db-8cdb9",
  storageBucket: "e-commerce-shop-db-8cdb9.appspot.com",
  messagingSenderId: "134944111445",
  appId: "1:134944111445:web:70fe4fbd801941a2608ddc"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log(error);
    }
  }

  return userDocRef;

}