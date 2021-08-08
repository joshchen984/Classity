/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Grid,
  Typography,
  Hidden,
  useMediaQuery,
  IconButton,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import Circle from './Circle';
import RoundButton from './RoundButton';

const useStyles = makeStyles((theme) => ({
  class: {
    border: '1px solid #C4C4C4',
    padding: '1rem',
    margin: '1rem 0',
    position: 'relative',
  },
  title: {
    fontSize: '1.5rem',
    textDecoration: 'none',
    fontWeight: 'bold',
    color: theme.palette.darkBlue.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  unenrollButton: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  },
}));
type ClassProps = {
  title: string;
  teacher: string;
  numGrades: number;
  grade: number;
  classLink: string;
  unenrollHandler: () => void;
};
const Class = ({
  title,
  teacher,
  numGrades,
  grade,
  classLink,
  unenrollHandler,
}: ClassProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const xsSize = useMediaQuery(theme.breakpoints.down('xs'));
  let unenrollButton = (
    <RoundButton color={theme.palette.brown} onClick={unenrollHandler}>
      Unenroll
    </RoundButton>
  );
  if (xsSize) {
    unenrollButton = (
      <IconButton onClick={unenrollHandler} className={classes.unenrollButton}>
        <DeleteIcon />
      </IconButton>
    );
  }
  return (
    <Grid container className={classes.class}>
      <Grid item xs={5} sm={3} md={4}>
        <Circle size="medium">{grade.toFixed()}%</Circle>
      </Grid>
      <Grid container item xs={6} sm={5} md={5} direction="column">
        <Grid item>
          <Link href={classLink}>
            <a className={classes.title}>{title}</a>
          </Link>
        </Grid>
        <Hidden xsDown>
          <Grid item>
            <Typography variant="subtitle1">{teacher}</Typography>
          </Grid>
        </Hidden>
      </Grid>
      <Grid
        container
        item
        direction="column"
        xs="auto"
        sm={4}
        md={3}
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Hidden xsDown>
          <Grid item style={{ textAlign: 'center' }}>
            <Typography variant="subtitle2">{numGrades}</Typography>
            <Typography variant="subtitle1">
              {numGrades === 1 ? 'grade' : 'grades'}
            </Typography>
          </Grid>
        </Hidden>
        <Grid item>{unenrollButton}</Grid>
      </Grid>
    </Grid>
  );
};

export default Class;
