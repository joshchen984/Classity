import React from 'react';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  logoText: {
    marginLeft: theme.spacing(1),
    color: 'black',
    fontWeight: 300,
    fontSize: '2rem',
  },
}));
const Logo = () => {
  const theme = useTheme();
  const classes = useStyles();
  const aboveSm = useMediaQuery(theme.breakpoints.up('sm'));
  let logoText = null;
  if (aboveSm) {
    logoText = (
      <Grid item>
        <Typography className={classes.logoText}>Classity</Typography>
      </Grid>
    );
  }
  return (
    <Grid item xs={2} sm={4} container alignItems="center">
      <Grid item>
        <Image src="/logo.svg" width="50" height="50" />
      </Grid>
      {logoText}
    </Grid>
  );
};

export default Logo;
