import React, { useEffect, useState } from 'react';
import withUserAuth from '../hoc/withUserAuth';
import LoggedInNav from '../components/LoggedInNav';
import { getApi } from '../app/requestApi';
import { Class } from 'classity-dto';

type ClassesProps = {
  token: string;
};
const Classes = ({ token }: ClassesProps) => {
  const [classes, setClasses] = useState<Class[]>();
  useEffect(() => {
    const getClasses = async () => {
      const response: Class[] = (await getApi(
        '/api/class',
        token
      )) as unknown as Class[];
      setClasses(response);
    };
    if (token) {
      getClasses();
    }
  }, [token]);
  return (
    <>
      <LoggedInNav />
      <div>{token}</div>
    </>
  );
};

export default withUserAuth(Classes, '/');
