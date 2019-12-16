import React, { useState } from "react"
import { LocationAdd } from "../components/NewLocation"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import DiscoverPanel from "../pages/DiscoverMap"

export const DiscoverLocationButton = props => {
    const { locationList } = props
    console.log(locationList)
    const [discoverOpen, setDiscoverOpen] = useState(false)

    const DiscoverPanelModal = locationList => {
        return <DiscoverPanel locationList={locationList} />
    }

    const newLocationClickOpen = event => {
        setDiscoverOpen(true)
    }

    const newLocationHandleClose = event => {
        setDiscoverOpen(false)
    }

    return (
        <div>
            {discoverOpen && DiscoverPanelModal(locationList)} />}
            <Fab
                onClick={newLocationClickOpen}
                aria-label="Add Location"
                color="secondary"
                variant="extended"
                size="large"
                style={{ left: 50, bottom: 50, position: "fixed" }}
                className="add-location"
            >
                <AddIcon /> Discover New Locations
            </Fab>
        </div>
    )
}
