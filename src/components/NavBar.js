import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from './Drawer'



const NavBar = () => {
return (
	<div>
	<AppBar position='static'>
	<Toolbar>
	<IconButton edge="start" color="inherit" aria-label="menu">
            <Drawer />
          </IconButton>
	<Typography style={{fontSize:24}}  variant='h6' color='inherit'>
	Wildly 
	</Typography>
	<Typography style={{paddingLeft: 10, fontSize:20}} variant='h7' color='fontSecondary'>Trip Monitor </Typography>
	</Toolbar>
	</AppBar>
	</div>
	)
}

export default NavBar