import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pillar: {
    height: '0%',
    width: '100%',
  },
  semicircle: {
    height: '100%',
    borderBottomRightRadius: '100%',
    borderBottomLeftRadius: '100%',
    width: '100%',
  },
}));
type PillarProps = {
  color: string;
};
const Pillar = ({ color }: PillarProps) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div style={{height: '100%'}}>
      <div
        className={classes.pillar}
        style={{ backgroundColor: theme.palette[color] }}
      />
      <div
        className={classes.semicircle}
        style={{ backgroundColor: theme.palette[color] }}
      />
    </div>
  );
};

export default Pillar;
