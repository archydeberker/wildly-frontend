import { createMuiTheme } from '@material-ui/core/styles';
import { cyan, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
  	primary: {
  		main: teal[800],
  		contrastText: '#fff',
  	},
    secondary: {
      main: cyan[300],
    },
    button: {
    	main: '#FFF'
    }
  },
});

export default theme;