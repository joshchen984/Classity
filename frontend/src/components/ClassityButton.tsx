/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme, Button, ButtonProps } from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';

type StyleProps = {
  color: PaletteColor;
};
const useStyles = makeStyles<Theme, StyleProps>(() => ({
  button: {
    backgroundColor: ({ color }) => color.main,
    color: ({ color }) => color.contrastText,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: ({ color }) => color.dark,
    },
  },
}));
interface ClassityButtonProps
  extends Pick<
    Pick<ButtonProps, Exclude<keyof ButtonProps, 'color'>>,
    Exclude<
      keyof Pick<ButtonProps, Exclude<keyof ButtonProps, 'color'>>,
      'variant'
    >
  > {
  color: PaletteColor;
}
const ClassityButton = (props: ClassityButtonProps) => {
  const { color, className, children, ...buttonProps } = props;
  const classes = useStyles({ color });

  return (
    <Button {...buttonProps} className={`${classes.button} ${className}`}>
      {children}
    </Button>
  );
};
ClassityButton.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  className: '',
};
export default ClassityButton;
