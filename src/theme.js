import { createMuiTheme } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
  	primary: {
  		main: green[900],
  	},
    secondary: {
      main: orange[500],
    },
  },
});

export default theme;