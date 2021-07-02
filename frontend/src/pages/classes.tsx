import React, {useEffect} from 'react';
import withUserAuth from '../hoc/withUserAuth';

type ClassesProps = {
  token: string;
}
const Classes = ({token}: ClassesProps) => {
  useEffect(() => {
    const getClasses = async () => {

    };
    getClasses();
  }, []);
  return <div>{token}</div>;
};

export default withUserAuth(Classes);
