export const registerNewLocation = async (location, getTokenSilently) => {
    const token = await getTokenSilently()
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add-location`, {
        method: "post",
        body: JSON.stringify(location),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
}
