export const PostRequest = (route) =>{
    const post = async(handler, data) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${route}`, {
            method: 'post',
            body: JSON.stringify(data)
            })
        
        const json = await response.json()
        const output = json.map(name => ({'label': name, 'value': name}))
        handler(output)
    }

    return post
}

const PostRequestWithAuth = (route) =>{
    const post = async(handler, getTokenSilently, data) => {
        const token = await getTokenSilently()
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${route}`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
            })
        
        const json = await response.json()
        console.log(json)
        handler(json)
        console.log("Hit the handler")
    }

    return post
}

export const RetrieveUserLocations = PostRequestWithAuth('user-locations')
export const AddUserLocation = PostRequestWithAuth('add-location')
