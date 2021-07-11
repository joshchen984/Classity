/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
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
    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
      if (mounted) {
        if (!loggedIn) {
          router.push(redirectRoute);
        }
      } else {
        setMounted(true);
      }
    }, [loggedIn]);
    const token = useSelector((state) => state.auth.token);
    return <WrappedComponent {...props} token={token} />;
  };
};

export default withUserAuth;
