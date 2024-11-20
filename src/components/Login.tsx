import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { IoEyeOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import LoadingSpinnerComponent from 'react-spinners-components';

const LoginForm: React.FunctionComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const alertSuccess = async (message: string) => {
        toast.success(message, {
            position: "bottom-right",
        });
    };

    const alertFailed = async (message: string) => {
        toast.error(message, {
            position: "bottom-right",
        });
    };

    const userLogin = async (email: string, password: string) => {
        let response = await fetch('http://127.0.0.1:5000/todoplus/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        return response
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        if (!email || !password) {
            if (email.trim().length === 0 && password.trim().length > 0) {
                await alertFailed("email cannot be empty");
                setLoading(false);
                return
            }
            if (password.trim().length === 0 && email.trim().length > 0) {  
                await alertFailed("password cannot be empty");
                setLoading(false);
                return
            }
            await alertFailed("email and password cannot be empty");
            setLoading(false);
            return
        }
        const api_login = await userLogin(email, password);
        let data = await api_login.json();
        if (api_login.status !== 201) {
            await alertFailed(data.message);
            setLoading(false);
            return
        }
        await alertSuccess(data.message);
        setLoading(false);
        return
    };

    return (
        <>
            <form onSubmit={loading ? () => {} : handleLogin} className='pt-2'>
                <div className="mb-3">
                    <input
                        type="email"
                        id="exampleInputEmail1"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Email Address"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="exampleInputPassword"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Password"
                        aria-describedby="emailHelp"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 px-4 text-gray-600 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <IoEyeOutline /> : <FaEyeSlash />}
                    </button>
                </div>
                <a href="http://localhost:3000/register">
                    <p className='underline font-semibold text-sm mb-3 text-right'>Forget Password</p>
                </a>
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-md shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:bg-gray-900 focus:ring-opacity-50 w-full"
                >
                    {loading ? <LoadingSpinnerComponent type={ 'Spinner' } color={ 'white' } size={ '20px' } /> : "Login"}
                </button>
            </form>
        </>
    )
}

export default LoginForm
