import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from './Drawer'
import AccountDetails from '../pages/AccountDetails'


const User = 'Steph Willis'

export default function NavBar () {

	const [openDetail, setOpen] = React.useState(false)
	const toggleVis = () => {console.log('opening account detail'); setOpen(true)}

return (
	<div>
	<AppBar position='static'>
	<Toolbar>
	<IconButton edge="start" color="inherit" aria-label="menu">
            <Drawer />
          </IconButton>
	<Typography style={{fontSize:24}}  variant='h6' color='inherit'>Wildly </Typography>
	<Typography style={{paddingLeft: 10, fontSize:20}} variant='h7' color='fontSecondary'>Trip Monitor </Typography>
	<div className='jss10' style={{flex: 1}} ></div>	
	<IconButton style={{alignSelf: 'right'}} color="inherit" aria-label="user" >
	<AccountCircle onClick={() => setOpen(true)}/>
    </IconButton>
    <Typography variant='light' style={{fontSize:15, weight:'light'}}> {User} </Typography>	
	</Toolbar>
	</AppBar>
	<AccountDetails open={openDetail} setOpen={setOpen} userID={User}/>	

	</div>
	)
}

