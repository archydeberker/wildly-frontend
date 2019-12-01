import React, { useState } from "react"
import { LocationAdd } from "../components/NewLocation"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"

export const AddLocationButton = props => {
    const { getLocationList, setLocationList, getActivityList, setActivityList, activities } = props
    const [locationAddOpen, setLocationAddOpen] = useState(false)

    const newLocationClickOpen = event => {
        setLocationAddOpen(true)
    }

    const newLocationHandleClose = event => {
        setLocationAddOpen(false)
        getLocationList(setLocationList)
        getActivityList(setActivityList)
    }

    return (
        <div>
            <LocationAdd open={locationAddOpen} onClose={newLocationHandleClose} activities={activities} />
            <Fab
                onClick={newLocationClickOpen}
                aria-label="Add Location"
                color="secondary"
                variant="extended"
                size="large"
                style={{ right: 50, bottom: 50, position: "fixed" }}
                className="add-location"
            >
                <AddIcon /> New Location
            </Fab>
        </div>
    )
}
