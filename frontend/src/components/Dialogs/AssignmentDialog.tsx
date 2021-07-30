import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.darkBlue.main,
  },
  description: {
    wordWrap: 'break-word',
  },
  content: {
    overflowX: 'hidden',
  },
  deleteButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));
type AssignmentDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  gradeWorth: number;
  gradeReceived: number;
  assignmentType: string;
  createdAt: string;
  deleteHandler: () => void;
};
const AssignmentDialog = ({
  open,
  onClose,
  title,
  description,
  gradeWorth,
  gradeReceived,
  assignmentType,
  createdAt,
  deleteHandler,
}: AssignmentDialogProps) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className={classes.title}>
        <Typography variant="h6">{title}</Typography>
        <IconButton className={classes.deleteButton} onClick={deleteHandler}>
          <DeleteIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <Grid container direction="column">
          <Grid item style={{ width: '100%' }}>
            <Typography variant="subtitle1" className={classes.description}>
              {description}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>Type: {assignmentType}</Typography>
          </Grid>
          <Grid item>
            <Typography>
              Grade: {gradeReceived}/{gradeWorth}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{`Created ${createdAt}`}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentDialog;
