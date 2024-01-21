import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCuRLBhwKMUQP6lwSys_3zr1JFubuZk6yM',
  authDomain: 'x-beat-arun.firebaseapp.com',
  projectId: 'x-beat-arun',
  storageBucket: 'x-beat-arun.appspot.com',
  messagingSenderId: '306531009006',
  appId: '1:306531009006:web:e94d82b102a939a011ceff',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, firestore, storage };
