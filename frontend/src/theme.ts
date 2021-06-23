import { createMuiTheme } from '@material-ui/core/styles';

const blue = '#55A6D8';
const orange = '#E99B26';
const darkBlue = '#004E79';
const brown = '#8E4F00';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    blue?: string;
    orange?: string;
    darkBlue?: string;
    brown?: string;
  }
  interface PaletteOptions {
    blue?: string;
    orange?: string;
    darkBlue?: string;
    brown?: string;
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue,
    },
    secondary: {
      main: orange,
    },
    blue,
    orange,
    darkBlue,
    brown,
  },
});
export default theme;
