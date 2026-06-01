import { useState } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'
import {Button,Input,Logo} from '../components'                 
import { Link,useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AuthService from '../appwrite/auth'
import { login } from '../store/authSlice'

function Signup() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [error,setError]=useState("")
    const {register, handleSubmit,reset}=useForm()

    const signup=async(data)=>{
        setError("")
        try {
            const Session=await AuthService.createAccount(data)
            if(Session) 
                {
                    reset(); //form clear
                    const userData=await AuthService.getCurrentUser()
                    if(userData)  dispatch(login({ userData }));
                    navigate("/")
                }
        } catch (error) {
            setError(error.message)
        }
    }

   return (
    <div className="flex items-center justify-center min-h-[70vh] py-12">
            <div className={`mx-auto w-full max-w-sm bg-white rounded-2xl p-10 border border-theme-border shadow-sm`}>
                <div className="mb-6 flex justify-center">
                    <span className="inline-block">
                        <Logo width="40px" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-serif font-bold leading-tight text-theme-text mb-2">Create an account</h2>
                <p className="text-center text-sm text-theme-secondary mb-8">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-theme-accent transition-all duration-200 hover:text-theme-accentHover hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
                
                {error && <p className="text-red-600 text-sm mb-6 text-center bg-red-50 py-2 rounded border border-red-100">{error}</p>}

                <form onSubmit={handleSubmit(signup)} autoComplete="off">
                    <div className='space-y-4'>
                        <Input
                        label="Full Name"
                        placeholder="John Doe"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email"
                        autoComplete="off"
                        placeholder="name@example.com"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password"
                        autoComplete="new-password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password", {
                            required: true,})}
                        />
                        <div className="pt-2">
                            <Button type="submit" className="w-full">
                                Create Account
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default Signup