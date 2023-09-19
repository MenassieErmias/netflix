import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Login = () => {

    const { user, logIn } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        setError("")
        e.preventDefault();
        try {
            await logIn(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }

    return (
        <div className='w-full h-screen'>
            <img src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
                alt=""
                className='hidden sm:block absolute w-full h-full object-cover'
            />
            <div className='fixed top-0 left-0 w-full h-screen bg-black/60 '></div>
            <div className="fixed w-full px-4 py-24 z-50">
                <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                    <div className='max-w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-bold'>Sign In</h1>
                        {
                            error && <p className='p-1 text-red-500'>{error}</p>
                        }
                        <form onSubmit={handleSignIn} className='w-full flex flex-col py-4'>
                            <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 bg-gray-700 rounded ' type="email" name="email" id="email" placeholder='E-mail' autoComplete='email' />
                            <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 bg-gray-700 rounded ' type="password" name="password" id="password" placeholder='Password' autoComplete='current-password' />
                            <button className='bg-red-600 py-3 my-6 rounded font-bold'>
                                Sign In
                            </button>
                            <div className='flex justify-between items-center text-sm text-gray-600'>
                                <p><input className='mr-2' type="checkbox" name="" id="" />Remember me</p>
                                <p>Need Help?</p>
                            </div>
                            <p className='py-8'>
                                <span className='text-gray-600'>New to Notflix?</span>&nbsp;&nbsp;&nbsp;
                                <Link to="/signup">
                                    Sign Up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login