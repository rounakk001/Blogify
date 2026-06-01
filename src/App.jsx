import { useState,useEffect } from 'react'
import {Provider, useDispatch} from 'react-redux'
import React from 'react'
import AuthService from "./appwrite/auth"
import { login,logout } from './store/authSlice'
import store from './store/store'
import Footer from "./components/Footer/Footer";


import Header  from './components/Header/Header'
import { Outlet } from 'react-router-dom'

function App() {
   
  const [Loading,setLoading] =useState(true)

  const dispatch=useDispatch()  


 useEffect(() => {

    AuthService.getCurrentUser()
        .then((userData) => {

            if (userData) {
                dispatch(login({ userData }))
            } else {
                dispatch(logout())
            }

        })
        .catch((error) => {
            console.log(error)
            dispatch(logout())
        })
        .finally(() => setLoading(false))

}, [])
  
  //agar loading false hai to  kya return kreynege warna kya krayenge 
  return !Loading ? (
    <div className='min-h-screen flex flex-col bg-theme-bg text-theme-text font-sans selection:bg-theme-accent selection:text-white'>
      <Header/>
      <main className='flex-grow w-full'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  ) : null
}

export default App
