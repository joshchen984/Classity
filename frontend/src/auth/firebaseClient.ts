import firebase from 'firebase/app';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyA9dyjLsaWTx7FmKiayu-piNVHiTsu6Vlg',
  authDomain: 'classity-daac0.firebaseapp.com',
  projectId: 'classity-daac0',
  storageBucket: 'classity-daac0.appspot.com',
  messagingSenderId: '961423566067',
  appId: '1:961423566067:web:e4f56fbb2cf8fa05318386',
  measurementId: 'G-3E8VDJXFS5',
};
export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
