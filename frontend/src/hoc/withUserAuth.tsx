/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import firebaseClient from '../auth/firebaseClient';

const withUserAuth = (
  WrappedComponent: React.ComponentType<any>,
  redirectRoute: string
) => {
  return (props) => {
    firebaseClient();
    const router = useRouter();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    useEffect(() => {
      if (loggedIn !== undefined && !loggedIn) {
        router.push(redirectRoute);
      }
    }, [loggedIn]);
    const token = useSelector((state) => state.auth.token);
    return <WrappedComponent {...props} token={token} />;
  };
};

export default withUserAuth;
