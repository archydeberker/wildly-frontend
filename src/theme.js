import { createMuiTheme } from '@material-ui/core/styles';
import { green, orange, cyan, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
  	primary: {
  		main: teal[800],
  	},
    secondary: {
      main: cyan[300],
    },
  },
});

export default theme;