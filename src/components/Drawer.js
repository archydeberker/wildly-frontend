import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import MenuIcon from "@material-ui/icons/Menu"
import PublicIcon from "@material-ui/icons/Public"
import SettingsIcon from "@material-ui/icons/Settings"
import PersonIcon from "@material-ui/icons/Person"

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
})

export default function MainDrawer() {
    const classes = useStyles()
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    })

    const toggleDrawer = (side, open) => event => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return
        }

        setState({ ...state, [side]: open })
    }

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem button key="trip monitor">
                    <ListItemIcon>
                        {" "}
                        <PublicIcon />
                    </ListItemIcon>
                    <ListItemText primary="Trip Monitor" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key="settings">
                    <ListItemIcon>
                        {" "}
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button key="Account">
                    <ListItemIcon>
                        {" "}
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Your Account" />
                </ListItem>
            </List>
        </div>
    )

    return (
        <div>
            <MenuIcon onClick={toggleDrawer("left", true)} />
            <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
                {sideList("left")}
            </Drawer>
        </div>
    )
}
