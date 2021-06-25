import * as admin from 'firebase-admin';
import serviceAccount from '../firebase-secrets.json';

const verifyIdToken = (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://classity-daac0-default-rtdb.firebaseio.com/',
    });
  }
  return admin.auth().verifyIdToken(token);
};
export default verifyIdToken;
