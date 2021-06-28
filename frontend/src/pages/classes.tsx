import React from 'react';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import firebase from 'firebase/app';
import verifyIdToken from '../auth/firebaseAdmin';
import firebaseClient from '../auth/firebaseClient';

const Classes = ({ test }) => {
  firebaseClient();
  return <div>{test}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: {
        test: `Uid: ${uid}  EMAIL: ${email}`,
      },
    };
  } catch {}
};
export default Classes;
