import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  typographyContainer: {
    maxWidth: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '3rem',
    },
  },
}));

type TitleProps = {
  children: React.ReactNode;
};
const Title = ({ children }: TitleProps) => {
  const classes = useStyles();
  return (
    <Grid item className={classes.typographyContainer}>
      <Typography variant="h1" className={classes.title}>
        {children}
      </Typography>
    </Grid>
  );
};

export default Title;
