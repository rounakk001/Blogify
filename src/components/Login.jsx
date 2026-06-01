import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from '../components'
import { useDispatch } from 'react-redux'
import AuthService from "../appwrite/auth";
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await AuthService.login(data);

            if (session) {
                const userData = await AuthService.getCurrentUser();

                if (userData) {
                    dispatch(authLogin({ userData }));
                }

                navigate("/");
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full min-h-[70vh] py-12'>
            <div className={`mx-auto w-full max-w-sm bg-white rounded-2xl p-10 border border-theme-border shadow-sm`}>
                <div className="mb-6 flex justify-center">
                    <span className="inline-block">
                        <Logo width="40px" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-serif font-bold leading-tight text-theme-text mb-2">Welcome back</h2>
                <p className="text-center text-sm text-theme-secondary mb-8">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="text-font-medium text-theme-accent transition-all duration-200 hover:text-theme-accentHover hover:underline"
                    >
                        Sign up
                    </Link>
                </p>

                {error && <p className="text-red-600 text-sm mb-6 text-center bg-red-50 py-2 rounded border border-red-100">{error}</p>}

                <form onSubmit={handleSubmit(login)}>
                    <div className='space-y-4'>
                        <Input
                            label="Email"
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
                            type="password"
                            placeholder="••••••••"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <div className="pt-2">
                            <Button
                                type="submit"
                                className="w-full"
                            >Sign in</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login