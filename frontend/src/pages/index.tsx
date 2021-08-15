import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useRouter } from 'next/router';
import { useAppSelector } from '../app/hooks';
import HomePageNav from '../components/HomePageNav';
import LoginDialog from '../components/Dialogs/LoginDialog';
import SignupDialog from '../components/Dialogs/SignupDialog';
import ClassPagePicture from '../../public/class-page.png';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginBottom: '4rem',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      marginLeft: theme.spacing(8),
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: '4rem',
      marginLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
    },
  },
  getStarted: {
    borderRadius: '50em',
    fontSize: '1.25rem',
    backgroundColor: theme.palette.brown.main,
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.brown.dark,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(8),
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.5rem',
      marginLeft: theme.spacing(10),
    },
  },
  description: {
    textAlign: 'center',
    marginBottom: '3rem',
    lineHeight: 1.5,
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
      textAlign: 'left',
      marginLeft: theme.spacing(8),
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(10),
    },
  },
  imageContainer: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      height: '500px',
      marginTop: theme.spacing(4),
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const aboveMd = useMediaQuery(theme.breakpoints.up('md'));
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState<boolean>(false);
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) {
      router.push('/classes');
    }
  }, [loggedIn]);
  const signupHandler = () => {
    setSignupDialogOpen(true);
    setLoginDialogOpen(false);
  };

  return (
    <>
      <Head>
        <title>Home | Classity</title>
        <meta
          name="description"
          content="The best and easiest way for students to manage their grades. Easily calculate your grade without having to do any math. Get started now!"
        />
      </Head>
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
      <Grid container>
        <Grid
          container
          item
          xs={12}
          md={6}
          direction="column"
          alignItems={!aboveMd ? 'center' : undefined}
        >
          <Grid item>
            <Typography variant="h1" className={classes.title}>
              Calculate Your Class Grade
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className={classes.description}>
              Want to keep track of your class grade, get a sense of what your
              final grade will be and the grades you&apos;ll need to improve it?
              <br />
              <br />
              Whether you’re in high school or graduate school, our easy-to-use
              grade calculator will help you stay on top of your grades in just
              a few minutes!
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className={classes.getStarted}
              onClick={signupHandler}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} className={classes.imageContainer}>
          <Image
            src={ClassPagePicture}
            alt="Picture of Class Page"
            quality={100}
            layout="fill"
            objectFit="contain"
          />
        </Grid>
      </Grid>
    </>
  );
}
