import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from './Drawer'
import Button from '@material-ui/core/Button';
import AccountDetails from '../pages/AccountDetails'
import { useAuth0 } from "../react-auth0-wrapper";


export default function NavBar () {

	const [openDetail, setOpen] = React.useState(false)
	const { loading, isAuthenticated, loginWithRedirect, logout, user, getTokenSilently } = useAuth0();
	
	const setLoggedInUser =  async(getTokenSilently) => {
		const token = await getTokenSilently();
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add-user`, {
			method: 'post',
			body: JSON.stringify(user),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		})
		return <div></div>
}


 if (loading) {
    return (<div>Loading...</div>)}
{isAuthenticated && setLoggedInUser(getTokenSilently)}
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
		<div>
			{!isAuthenticated && 
			<Button onClick={() => loginWithRedirect({})} color='button'  style={{fontSize:15, weight:'light'}}> Login </Button>
			}
			{isAuthenticated && 
			<Button><Typography onClick={() => logout()} variant='light' style={{fontSize:15, weight:'light'}}> Logout {user.email} </Typography></Button>
			}
		</div>
			
		</Toolbar>
		</AppBar>
		{isAuthenticated && <AccountDetails open={openDetail} setOpen={setOpen} userID={user.email} onLogout={()=> logout()}/>}
		{!isAuthenticated && <AccountDetails open={openDetail} setOpen={setOpen} userID= "No User" onLogout={()=> loginWithRedirect()}/>}
		</div>
		)
}
