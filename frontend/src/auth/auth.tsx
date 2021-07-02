import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import firebaseClient from './firebaseClient';
import 'firebase/auth';
import { login, logout } from "./authSlice";

type AuthProviderProps = {
  children: React.ReactNode;
};
const AuthProvider = ({ children }: AuthProviderProps) => {
  firebaseClient();
  const dispatch = useDispatch();
  useEffect(
    () =>
      firebase.auth().onIdTokenChanged(async (curUser) => {
        if (!curUser) {
          dispatch(logout());
        } else {
          const token: string = await curUser.getIdToken();
          const email = curUser.email as string;
          dispatch(login({ token, email }));
        }
      }),
    []
  );

  return <>{children}</>;
};

export default AuthProvider;
