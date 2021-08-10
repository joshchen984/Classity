import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  layout: {
    maxWidth: 757,
    margin: 'auto',
  },
  layoutContainer: {
    padding: '0 2rem',
  },
}));

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  return (
    <div className={classes.layoutContainer}>
      <div className={classes.layout}>{children}</div>
    </div>
  );
};

export default Layout;
