/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentDialog from './Dialogs/AssignmentDialog';

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
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
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
  deleteHandler: () => Promise<void>;
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
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  let trimmedDesc = description;
  if (description.length > 70) {
    // eslint-disable-next-line no-param-reassign
    trimmedDesc = `${description.substring(0, 70)}...`;
  }
  return (
    <Grid container className={classes.assignment}>
      <AssignmentDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={title}
        description={description}
        assignmentType={assignmentType}
        createdAt={createdAt}
        gradeReceived={gradeReceived}
        gradeWorth={gradeWorth}
        deleteHandler={async () => {
          await deleteHandler();
          setDialogOpen(false);
        }}
      />
      <Grid item container lg={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2">
            {gradeReceived}/{gradeWorth}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item lg={7} direction="column">
        <Grid item>
          <Typography
            onClick={() => setDialogOpen(true)}
            className={classes.title}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{trimmedDesc}</Typography>
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
