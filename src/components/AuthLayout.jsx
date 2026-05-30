import React from 'react'
import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children,authentication=true}) {
    const navigate=useNavigate()
    const [loader,setloader]=useState("")
    const authStatus=useSelector(state=>state.auth.status)

    useEffect(() => {

    // Agar page ko access karne ke liye login zaroori hai
    // aur user login nahi hai
    // to usse login page par bhej do
    if (authentication && authStatus !== authentication) {
        navigate("/login")
    }

    // Agar page sirf logged-out users ke liye hai
    // aur user pehle se login hai
    // to usse home page par bhej do
    else if (!authentication && authStatus !== authentication) {
        navigate("/")
    }

    // Authentication check complete ho gayi
    // loading band kar do
    setloader(false)

}, [authStatus, navigate, authentication])

return (
    // Jab tak authentication check ho rahi hai
    // Loading message dikhao
    loader

        ? <h1>Loading....</h1>

        // Check complete hone ke baad
        // actual page/component dikhao
        : <>{children}</>
)
}

