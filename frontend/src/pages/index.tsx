import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Pillar from '../components/Pillar';
import HomePageNav from '../components/HomePageNav';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.darkBlue,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nav: {
    height: '10rem',
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <HomePageNav />
      <Grid container direction="column">
        <Grid item container className={classes.nav}></Grid>
        <Typography variant="h1" className={classes.title}>
          Organize Your Grades
        </Typography>
      </Grid>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      f
    </>
  );
}
