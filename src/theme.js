import { createMuiTheme } from '@material-ui/core/styles';
import { amber, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
  	primary: {
  		main: teal[800],
  		contrastText: '#fff',
  	},
    secondary: {
      main: amber[500],
      contrastText: '#000',
    },
    button: {
    	main: '#FFF'
    }
  },
});

export default theme;