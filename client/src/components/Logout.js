import React, { useEffect , useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';


export const Logout = () => {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate()
    // Promises

    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },
            credentials: 'include'
        }).then((res) => {
            dispatch({ type: 'USER', payload: false })
            navigate('/login')
            if (!res === 200) {
                throw new Error('Not Found Data');
            }
        }).catch((err) => {
            console.error(err);
        })
    })

    return (
        <>
            Logout
        </>
    )
}
