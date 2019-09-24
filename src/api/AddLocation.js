export const registerNewLocation = (location) => {
    // const { getTokenSilently } = useAuth0();
    // const token = getTokenSilently();
    console.log(location);
    addToLocationTable(location)
}


const addToLocationTable = (location) => {
    fetch('/api/add-location', {
        method: 'post',
        body: JSON.stringify(location),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}
