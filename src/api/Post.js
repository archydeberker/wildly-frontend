export const PostRequest = route => {
    const post = async (handler, data) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${route}`, {
            method: "post",
            body: JSON.stringify(data),
        })

        const json = await response.json()
        const output = json.map(name => ({ label: name, value: name }))
        handler(output)
    }

    return post
}

const PostRequestWithAuth = route => {
    const post = async (handler, getTokenSilently, data) => {
        const token = await getTokenSilently()
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${route}`, {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        const json = await response.json()
        handler(json)
    }

    return post
}

export const RetrieveUserLocations = PostRequestWithAuth("user-locations")
export const AddUserLocation = PostRequestWithAuth("add-location")
export const AddExistingLocation = PostRequestWithAuth("add-existing-location")
export const CheckOnboarding = PostRequestWithAuth("user-onboarded")
export const CheckTouring = PostRequestWithAuth("user-toured")
export const SetTouring = PostRequestWithAuth("set-user-toured")
export const AddUser = PostRequestWithAuth("add-user-home")
export const GetUserHome = PostRequestWithAuth("user-home")
