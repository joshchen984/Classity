import React, { useEffect } from 'react';
import withUserAuth from '../hoc/withUserAuth';
import LoggedInNav from '../components/LoggedInNav';

type ClassesProps = {
  token: string;
};
const Classes = ({ token }: ClassesProps) => {
  useEffect(() => {
    const getClasses = async () => {};
    getClasses();
  }, []);
  return (
    <>
      <LoggedInNav />
      <div>{token}</div>
    </>
  );
};

export default withUserAuth(Classes, '/');
