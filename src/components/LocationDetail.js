import React from "react"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import { Weather } from "../components/Location"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

export default function LocationDetail(props) {
    const { onClose, open, location, locationMap } = props

    function handleClose() {
        onClose()
    }

    let locationName = location

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={open}
                fullWidth="true"
                maxWidth="lg"
            >
                <DialogTitle id="simple-dialog-title">
                    {locationName}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        style={{ position: "absolute", top: 10, right: 10 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Card style={{ width: "100%", height: "50%" }}>
                    <CardMedia style={{ width: "100%", height: "100%" }}>
                        <Grid container spacing={3} flexDirection="row" wrap="nowrap">
                            {location ? (
                                <Weather id={location} type="Weather" url={locationMap[location]["detailedWeather"]} />
                            ) : (
                                "Nothing"
                            )}

                            {location ? (
                                <Weather id={location} type="Map" url={locationMap[location]["mapUrl"]} />
                            ) : (
                                "Nothing"
                            )}
                        </Grid>
                    </CardMedia>
                </Card>
            </Dialog>
        </div>
    )
}
