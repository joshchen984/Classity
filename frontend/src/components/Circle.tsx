import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  circle: {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    display: 'grid',
    'place-items': 'center',
  },
  medium: {
    width: '3em',
    height: '3em',
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.75rem',
    },
  },
  large: {
    width: '5em',
    height: '5em',
    fontSize: 35,
  },
}));
type CircleProps = {
  size: 'medium' | 'large';
  children: React.ReactNode;
};
const Circle = ({ size, children }: CircleProps) => {
  const classes = useStyles();
  return <div className={`${classes.circle} ${classes[size]}`}>{children}</div>;
};

export default Circle;
