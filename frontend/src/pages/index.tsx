import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.darkBlue,
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Typography variant="h1" className={classes.title}>
        Organize Your Grades
      </Typography>
    </Grid>
  );
}
