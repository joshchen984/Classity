/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../app/hooks';
import firebaseClient from '../auth/firebaseClient';

const withUserAuth = (
  WrappedComponent: React.ComponentType<any>,
  redirectRoute: string
) => {
  return (props: object) => {
    firebaseClient();
    const router = useRouter();
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    useEffect(() => {
      if (loggedIn !== undefined && !loggedIn) {
        router.push(redirectRoute);
      }
    }, [loggedIn]);
    const token = useAppSelector((state) => state.auth.token);
    return <WrappedComponent {...props} token={token} />;
  };
};

export default withUserAuth;
