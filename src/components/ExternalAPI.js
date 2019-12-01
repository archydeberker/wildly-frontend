import React, { useState } from "react"
import { useAuth0 } from "../react-auth0-wrapper"

const callPrivateApi = async (route, setShowResult, setApiMessage, getTokenSilently) => {
    try {
        const token = await getTokenSilently()

        const response = await fetch(`/api/${route}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const responseData = await response.json()

        setShowResult(true)
        setApiMessage(responseData)
    } catch (error) {
        console.error(error)
        setShowResult(true)
        setApiMessage("You need to login to see this page")
    }
}

const ExternalApiTest = () => {
    const [showResult, setShowResult] = useState(false)
    const [apiMessage, setApiMessage] = useState("")
    const { getTokenSilently } = useAuth0()

    return (
        <div>
            <button onClick={() => callPrivateApi("private", setShowResult, setApiMessage, getTokenSilently)}>
                Ping private API
            </button>
            ,{showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
        </div>
    )
}

export default ExternalApiTest
