import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { assignmentDto, classDto } from '@classity/dto';
import RoundButton from '../RoundButton';
import { postApi } from '../../app/requestApi';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.darkBlue.main,
  },
}));
type CreateAssignmentDialogProps = {
  onClose: () => void;
  open: boolean;
  assignmentTypes: classDto.assignmentType[] | undefined;
  token: string;
  classId: string;
  getClass: () => Promise<void>;
};
const CreateAssignmentDialog = ({
  onClose,
  open,
  assignmentTypes,
  token,
  classId,
  getClass,
}: CreateAssignmentDialogProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [curAssignmentType, setCurAssignmentType] = useState<string>('');
  const [pointsReceived, setPointsReceived] = useState<string>('');
  const [pointsPossible, setPointsPossible] = useState<string>('');

  const addAssignmentHandler = async () => {
    const requestBody: assignmentDto.CreateAssignmentDto = {
      name,
      description,
      assignmentType: curAssignmentType,
      pointsReceived: parseFloat(pointsReceived),
      pointsWorth: parseInt(pointsPossible, 10),
      classId,
    };
    await postApi('/api/assignment', requestBody, token);
    await getClass();
    onClose();
  };
  let selectOptions: JSX.Element | JSX.Element[] = <MenuItem>Loading</MenuItem>;
  if (assignmentTypes !== undefined) {
    selectOptions = assignmentTypes?.map((value) => (
      <MenuItem key={value.name} value={value.name}>
        {value.name}
      </MenuItem>
    ));
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className={classes.title}>Add Assignment</DialogTitle>
      <DialogContent>
        <Grid container direction="column">
          <Grid item>
            <TextField
              margin="normal"
              variant="outlined"
              id="assignment-name"
              type="text"
              label="Assignment Name"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              margin="normal"
              variant="outlined"
              id="assignment-description"
              type="text"
              label="Description"
              required
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              id="assignment-type"
              select
              label="Assignment Type"
              value={curAssignmentType}
              onChange={(e) => setCurAssignmentType(e.target.value)}
              fullWidth
              disabled={assignmentTypes === undefined}
            >
              {selectOptions}
            </TextField>
          </Grid>
          <Grid container item justifyContent="space-between">
            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                id="points-received"
                type="text"
                label="Points Received"
                fullWidth
                value={pointsReceived}
                onChange={(e) => setPointsReceived(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                variant="outlined"
                id="points-possible"
                type="text"
                label="Points Possible"
                fullWidth
                value={pointsPossible}
                onChange={(e) => setPointsPossible(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <RoundButton
          onClick={addAssignmentHandler}
          color={theme.palette.primary}
        >
          Add Assignment
        </RoundButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAssignmentDialog;
