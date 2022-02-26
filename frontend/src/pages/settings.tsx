import React from 'react';
import Head from 'next/head';
import withUserAuth from '../hoc/withUserAuth';
import LoggedInNav from '../components/LoggedInNav';

const Settings = () => {
  return (
    <>
      <Head>
        <title>Settings | Classity</title>
      </Head>
      <LoggedInNav />
      <div>Settings</div>
    </>
  );
};

export default withUserAuth(Settings, '/');
