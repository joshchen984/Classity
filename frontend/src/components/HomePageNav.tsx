/* eslint-disable react/prop-types */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';

function ElevationScroll(props) {
  const { children } = props;
  return React.cloneElement(children, {
    elevation: 4,
  });
}
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.5em',
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: '3rem',
    margin: '0 0.6rem',
  },
}));

const HomePageNav = () => {
  const classes = useStyles();

  return (
    <>
      <ElevationScroll>
        <AppBar className={classes.appbar}>
          <Toolbar disableGutters>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" passHref>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Log in
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" passHref>
                  <Button variant="outlined" color="secondary" className={classes.button}>
                    Sign up
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default HomePageNav;
