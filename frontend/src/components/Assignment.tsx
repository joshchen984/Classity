/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  assignment: {
    border: '1px solid #C4C4C4',
    padding: '1rem 1rem 0',
    margin: '1rem 0',
  },
  title: {
    fontSize: '1.5rem',
    textDecoration: 'none',
    fontWeight: 'bold',
    color: theme.palette.darkBlue.main,
  },
  assignmentType: {
    fontSize: '1.2rem',
  },
}));
type AssignmentProps = {
  title: string;
  description: string;
  gradeWorth: number;
  gradeReceived: number;
  assignmentType: string;
  createdAt: string;
  deleteHandler: () => void;
};
const Assignment = ({
  title,
  description,
  gradeWorth,
  gradeReceived,
  assignmentType,
  createdAt,
  deleteHandler,
}: AssignmentProps) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.assignment}>
      <Grid item container lg={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2">
            {gradeReceived}/{gradeWorth}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item lg={7} direction="column">
        <Grid item>
          <span className={classes.title}>{title}</span>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{description}</Typography>
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
        <Grid item style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Typography variant="subtitle1">Type</Typography>
          <Typography variant="subtitle2" className={classes.assignmentType}>
            {assignmentType}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{`Created ${createdAt}`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Assignment;
