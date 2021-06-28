import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import firebase from 'firebase/app';
import firebaseClient from './firebaseClient';
import 'firebase/auth';

type AuthProviderProps = {
  children: React.ReactNode;
}
const AuthContext = createContext({});
export const AuthProvider = ({ children } : AuthProviderProps) => {
  firebaseClient();
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(
    () =>
      firebase.auth().onIdTokenChanged(async (curUser) => {
        if (!curUser) {
          setUser(null);
          nookies.set(undefined, 'token', '');
        } else {
          const token: string = await curUser.getIdToken();
          setUser(curUser);
          nookies.set(undefined, 'token', token);
        }
      }),
    []
  );

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
