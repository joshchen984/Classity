import React, { useEffect, useState } from 'react';
import withUserAuth from '../hoc/withUserAuth';
import LoggedInNav from '../components/LoggedInNav';
import { getApi } from '../app/requestApi';

type ClassesProps = {
  token: string;
};
const Classes = ({ token }: ClassesProps) => {
  const [classes, setClasses] = useState();
  useEffect(() => {
    const getClasses = async () => {
      const response = await getApi('/classes', token);
      setClasses(response);
    };
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
