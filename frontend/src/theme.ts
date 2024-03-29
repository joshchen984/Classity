import { createTheme } from '@material-ui/core/styles';
// import type { PaletteColor } from '@material-ui/core/styles';

type Color = {
  main: string;
};

const blue = '#55A6D8';
const orange = '#E99B26';
const darkBlue = '#004E79';
const brown = '#8E4F00';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    blue: Palette['primary'];
    orange: Palette['primary'];
    darkBlue: Palette['primary'];
    brown: Palette['primary'];
  }
  interface PaletteOptions {
    blue?: Color;
    orange?: Color;
    darkBlue?: Color;
    brown?: Palette['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: blue,
      contrastText: 'white',
    },
    secondary: {
      main: orange,
    },
    blue: {
      main: blue,
    },
    orange: {
      main: orange,
    },
    darkBlue: {
      main: darkBlue,
    },
    brown: {
      main: brown,
      light: '#c37b33',
      dark: '#5c2500',
      contrastText: 'white',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    h1: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '4rem',
      color: darkBlue,
    },
    h2: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '3rem',
      color: darkBlue,
    },
    // h3: {
    //   fontSize: '1.25rem',
    //   fontWeight: 'bold',
    //   color: darkBlue,
    // },
    subtitle1: {
      fontFamily: 'Montserrat',
      fontWeight: 300,
    },
    button: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      textTransform: 'none',
    },
    subtitle2: {
      fontSize: '1.3rem',
    },
  },
});
export default theme;
