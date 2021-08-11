/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Grid, Typography, Hidden } from '@material-ui/core';
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
  typographyContainer: {
    maxWidth: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden',
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
          deleteHandler();
          setDialogOpen(false);
        }}
      />
      <Grid item container xs={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2">
            {gradeReceived}/{gradeWorth}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={6} direction="column">
        <Grid item className={classes.typographyContainer}>
          <Typography
            onClick={() => setDialogOpen(true)}
            className={classes.title}
            noWrap
          >
            {title}
          </Typography>
        </Grid>
        <Hidden xsDown>
          <Grid item>
            <Typography variant="subtitle1">{trimmedDesc}</Typography>
          </Grid>
        </Hidden>
      </Grid>
      <Grid
        container
        item
        direction="column"
        xs={4}
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Grid item style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Typography variant="subtitle1">Type</Typography>
          <Typography variant="subtitle2" className={classes.assignmentType}>
            {assignmentType}
          </Typography>
        </Grid>
        <Hidden xsDown>
          <Grid item>
            <Typography variant="subtitle1">{`Created ${createdAt}`}</Typography>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default Assignment;
