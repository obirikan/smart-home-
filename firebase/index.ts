import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqr-RUgHbk85X57F3n8MrsT4iK_mcaSa8",
  authDomain: "letter-duel1.firebaseapp.com",
  databaseURL: "https://letter-duel1-default-rtdb.firebaseio.com",
  projectId: "letter-duel1",
  storageBucket: "letter-duel1.firebasestorage.app",
  messagingSenderId: "268073447618",
  appId: "1:268073447618:web:abe39fecc9d80556930b5b",
  measurementId: "G-GED3TLQNL7"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);


export { auth, firestore };
