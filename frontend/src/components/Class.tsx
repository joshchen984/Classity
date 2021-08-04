/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Link from 'next/link';
import Circle from './Circle';
import RoundButton from './RoundButton';

const useStyles = makeStyles((theme) => ({
  class: {
    border: '1px solid #C4C4C4',
    padding: '1rem',
    margin: '1rem 0',
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
  return (
    <Grid container className={classes.class}>
      <Grid item lg={4}>
        <Circle size="medium">{grade.toFixed()}%</Circle>
      </Grid>
      <Grid container item lg={5} direction="column">
        <Grid item>
          <Link href={classLink}>
            <a className={classes.title}>{title}</a>
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{teacher}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="column"
        lg={3}
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Grid item style={{ textAlign: 'center' }}>
          <Typography variant="subtitle2">{numGrades}</Typography>
          <Typography variant="subtitle1">
            {numGrades === 1 ? 'grade' : 'grades'}
          </Typography>
        </Grid>
        <Grid item>
          <RoundButton color={theme.palette.brown} onClick={unenrollHandler}>
            Unenroll
          </RoundButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Class;
