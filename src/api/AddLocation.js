export const registerNewLocation = async(location, getTokenSilently) => {

    const token = await getTokenSilently()
    fetch('/api/add-location', {
        method: 'post',
        body: JSON.stringify(location),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}
