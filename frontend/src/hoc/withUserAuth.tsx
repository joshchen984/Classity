/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import verifyIdToken from "../auth/firebaseAdmin";
import firebaseClient from '../auth/firebaseClient';

const withUserAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props) => {
    firebaseClient();
    const token = useSelector((state) => state.auth.token);
    return <WrappedComponent {...props} token={token} />;
  };
};

export default withUserAuth;
