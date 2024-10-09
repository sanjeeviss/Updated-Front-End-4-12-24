import { createTheme } from '@mui/material/styles';

export const LightThemeConfig = createTheme({
  palette: {
    primary: {
      main: '#797BCF',
    },
    secondary: {
      main: '#B7B8DC',
    },
    background: {
      default: '#fff', // This corresponds to the sidebar background in AntD (siderBG)
    },
  },
});
