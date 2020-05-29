import React from "react"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import ExternalAPI from "../components/ExternalAPI"

export default function AccountDetails(props) {
    const { open, setOpen, userID, onLogout } = props
    return (
        <div>
            <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={() => {
                    console.log("closing")
                    setOpen(false)
                }}
                fullWidth="false"
                maxWidth="sm"
            >
                <DialogTitle id="simple-dialog-title">Account Details</DialogTitle>
                <Card>
                    <CardContent>
                        <Grid>Logged in user is {userID}</Grid>
                        <Grid>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => onLogout()}
                                style={{ marginTop: 20 }}
                            >
                                Logout
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Dialog>
        </div>
    )
}
