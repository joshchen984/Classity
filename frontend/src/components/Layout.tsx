import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  layout: {
    maxWidth: 757,
    margin: 'auto',
  },
}));

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  return <div className={classes.layout}>{children}</div>;
};

export default Layout;
