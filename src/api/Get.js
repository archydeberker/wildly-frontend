const getRequest = route => {
    const get = async handler => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${route}`, {
            method: "get",
        })

        const json = await response.json()
        handler(json)
    }

    return get
}

const getRequestWithAuth = route => {
    const get = async (handler, getTokenSilently) => {
        const token = await getTokenSilently()
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${route}`, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        const json = await response.json()
        handler(json)
    }

    return get
}

export const getUserLocations = getRequestWithAuth("user-locations")
export const getActivities = getRequest("activities")
export const getLocations = getRequest("locations")
