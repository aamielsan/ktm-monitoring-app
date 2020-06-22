import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { grey as primary, orange as secondary } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary[900]
    },
    secondary: {
      main: secondary[900],
    },
  },
});

export default function Theme(props) {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
}
