const getRequest = (route) =>{
    const get = async(handler) => {
        const response = await fetch(`/api/${route}`, {
            method: 'get',
            })
        
        const json = await response.json()
        const output = json.map(name => ({'label': name, 'value': name}))
        handler(output)
    }

    return get
}

const getRequestWithAuth = (route) =>{
    const get = async(handler, getTokenSilently) => {
        const token = await getTokenSilently()
        const response = await fetch(`/api/${route}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
            })
        
        const json = await response.json()
        const output = json.map(name => ({'label': name, 'value': name}))
        handler(output)
    }

    return get
}

export const getUserLocations = getRequestWithAuth('user-locations')
export const getActivities = getRequest('activities')
    