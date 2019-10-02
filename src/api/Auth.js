import { useAuth0,  } from "../react-auth0-wrapper";
import React, { useState } from "react";


const logUserToBackend = async(user, setShowResult, setApiMessage, getTokenSilently) => {
    
    const token = await getTokenSilently();

    const response = fetch('/api/add-user', {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    return (response)
  };


export const LogUserToBackend = () => {
    const [showResult, setShowResult] = useState(false);
    const [apiMessage, setApiMessage] = useState("");
    const { getTokenSilently } = useAuth0();
    const user = 
    logUserToBackend(user, setShowResult, setApiMessage, getTokenSilently)

    return (<div></div>)
    }
  
