import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Pillar from '../components/Pillar';
import HomePageNav from '../components/HomePageNav';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.darkBlue.main,
    textAlign: 'center',
    fontSize: '3rem',
  },
  getStarted: {
    borderRadius: '50em',
    backgroundColor: theme.palette.brown.main,
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.brown.dark,

    },
  },
  description: {
    textAlign: 'center',
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <HomePageNav />
      <Grid container direction="column" alignItems="center">
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
          <Button variant="contained" className={classes.getStarted}>Get Started</Button>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />f
    </>
  );
}
