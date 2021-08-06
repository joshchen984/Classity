import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HomePageNav from '../components/HomePageNav';
import LoginDialog from '../components/Dialogs/LoginDialog';
import SignupDialog from '../components/Dialogs/SignupDialog';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginTop: '8rem',
    marginBottom: '4rem',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      marginLeft: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: '8rem',
      marginTop: '12rem',
    },
  },
  getStarted: {
    borderRadius: '50em',
    fontSize: '1.5rem',
    backgroundColor: theme.palette.brown.main,
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.brown.dark,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.75rem',
    },
  },
  description: {
    textAlign: 'center',
    marginBottom: '3rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
      textAlign: 'left',
      marginLeft: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.75rem',
    },
  },
  topPillar: {
    height: '50vh',
    [theme.breakpoints.down('lg')]: {
      width: '20rem',
    },
  },
  bottomPillar: {
    height: '50vh',
    marginTop: '50vh',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('lg')]: {
      width: '20rem',
    },
  },
  pillarContainer: {
    margin: 0,
    padding: 0,
    position: 'relative',
  },
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const aboveMd = useMediaQuery(theme.breakpoints.up('md'));
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState<boolean>(false);

  const signupHandler = () => {
    setSignupDialogOpen(true);
    setLoginDialogOpen(false);
  };

  let output = (
    <Grid
      container
      direction="column"
      alignItems={!aboveMd ? 'center' : undefined}
    >
      <Grid item>
        <Typography variant="h1" className={classes.title}>
          Organize Your Grades
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" className={classes.description}>
          A platform for students to manage their grades easily. Never worry
          about your grades again.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          className={classes.getStarted}
          onClick={signupHandler}
        >
          Get Started
        </Button>
      </Grid>
    </Grid>
  );
  if (aboveMd) {
    output = (
      <Grid container>
        <Grid item lg={6} md={7}>
          {output}
        </Grid>
        <Grid container item lg={6} md={5} justifyContent="flex-end">
          <img
            src="/pillarTop.svg"
            alt="top pillar"
            className={classes.topPillar}
          />
          <img
            src="/pillarBottom.svg"
            alt="bottom pillar"
            className={classes.bottomPillar}
          />
        </Grid>
      </Grid>
    );
  }
  return (
    <>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
      <SignupDialog
        open={signupDialogOpen}
        onClose={() => setSignupDialogOpen(false)}
      />
      <HomePageNav
        loginHandler={() => {
          setLoginDialogOpen(true);
          setSignupDialogOpen(false);
        }}
        signupHandler={signupHandler}
      />
      {output}
    </>
  );
}
