import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup,
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
 } from  'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAQpyhz8OTHpbYL33Y_sOYuBq94RSP07E0",
  authDomain: "e-commerce-shop-db-8cdb9.firebaseapp.com",
  projectId: "e-commerce-shop-db-8cdb9",
  storageBucket: "e-commerce-shop-db-8cdb9.appspot.com",
  messagingSenderId: "134944111445",
  appId: "1:134944111445:web:70fe4fbd801941a2608ddc"
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, aditionalInfo = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { 
        displayName, 
        email, 
        createdAt,
        ...aditionalInfo
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userDocRef;
};

export const createAuthUserFromEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done')
};

export const getCategoriesAndDocuments = async () => {
   const collectionRef = collection(db, 'categories');
   const q = query(collectionRef);

   const querySnapshot = await getDocs(q);
   const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
   }, {});

   return categoryMap;
};
