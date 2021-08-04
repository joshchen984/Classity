/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  logoText: {
    marginLeft: theme.spacing(1),
    color: 'black',
    fontWeight: 300,
    fontSize: '2rem',
  },
}));

type LogoProps = {
  onClickRoute: string;
};
const Logo = ({ onClickRoute }: LogoProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const aboveSm = useMediaQuery(theme.breakpoints.up('sm'));
  let logoText = null;
  if (aboveSm) {
    logoText = <Typography className={classes.logoText}>Classity</Typography>;
  }
  return (
    <Grid item xs={2} sm={4} container alignItems="center">
      <Link href={onClickRoute}>
        <Button component="a" disableRipple style={{ textDecoration: 'none' }}>
          <Image src="/logo.svg" width="50" height="50" />
          {logoText}
        </Button>
      </Link>
    </Grid>
  );
};

export default Logo;
