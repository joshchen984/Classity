import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';

type StyleProps = {
  color: PaletteColor;
};
const useStyles = makeStyles<Theme, StyleProps>(() => ({
  button: {
    borderRadius: '50em',
    backgroundColor: ({ color }) => color.main,
    color: ({ color }) => color.contrastText,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: ({ color }) => color.dark,
    },
  },
}));
type RoundButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  color: PaletteColor;
  className?: string;
};
const RoundButton = ({
  children,
  onClick,
  color,
  className,
}: RoundButtonProps) => {
  const classes = useStyles({ color });
  return (
    <Button
      className={`${classes.button} ${className}`}
      onClick={onClick}
      variant="contained"
    >
      {children}
    </Button>
  );
};
RoundButton.defaultProps = {
  className: '',
};
export default RoundButton;
