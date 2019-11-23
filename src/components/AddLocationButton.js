import React, {useState} from 'react'
import {LocationAdd} from '../components/NewLocation'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


export const AddLocationButton = (props) => {
    
    const {getLocationList, setLocationList} = props
    const [locationAddOpen, setLocationAddOpen] = useState(false)

    const newLocationClickOpen = (event) => {
        setLocationAddOpen(true);
    }

    const newLocationHandleClose = (event) => {
        setLocationAddOpen(false);
        getLocationList(setLocationList);
    }

    return (<div>
        <LocationAdd open={locationAddOpen} onClose={newLocationHandleClose} />
        <Fab onClick={newLocationClickOpen} aria-label='Add Location'
            color='secondary' variant="extended"
            size='large'
            style={{ right: 50, bottom: 50, position: 'fixed' }}>
            <AddIcon /> New Location
          </Fab>
    </div>

    )
}

