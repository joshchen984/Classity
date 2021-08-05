import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Logo from './Logo';

function ElevationScroll({ children }: { children: React.ReactElement }) {
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

type HomePageNavProps = {
  loginHandler: () => void;
  signupHandler: () => void;
};
const HomePageNav = ({ loginHandler, signupHandler }: HomePageNavProps) => {
  const classes = useStyles();
  return (
    <>
      <ElevationScroll>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Logo onClickRoute="/" />
              <Grid
                container
                item
                justifyContent="flex-end"
                alignItems="center"
                xs={10}
                sm={8}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={loginHandler}
                  >
                    Log in
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    onClick={signupHandler}
                  >
                    Sign up
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* <div className={classes.toolbarMargin} /> */}
    </>
  );
};

export default HomePageNav;
