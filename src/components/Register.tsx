import React, { useState, useEffect } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import LoadingSpinnerComponent from 'react-spinners-components';

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const userRegister = async (email: string, username: string, password: string, confirmPassword: string) => {
        let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                confirmPassword: confirmPassword
            })
        });
        return response;
    };

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

    const clearForm = async () => {
        setEmail('');
        setEmailError(false);
        setEmailErrorMessage('');
        setUsername('');
        setUsernameError(false);
        setUsernameErrorMessage('');
        setPassword('');
        setPasswordError(false);
        setPasswordErrorMessage('');
        setConfirmPassword('');
        setConfirmPasswordError(false);
        setConfirmPasswordErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const api_register = await userRegister(email, username, password, confirmPassword);
        let data = await api_register.json();
        if (api_register.status === 400) {
            if (data.errors) {
                setEmailError(false);
                setPasswordError(false);
                setUsernameError(false);
                setConfirmPasswordError(false);
                if (data.errors.email && data.errors.email[0]) {
                    setEmailError(true);
                    if (typeof data.errors.email === 'object') {
                        setEmailErrorMessage(data.errors.email[0]);
                    } else {
                        setEmailErrorMessage(data.errors.email);
                    }
                }
                if (data.errors.username && data.errors.username[0]) {
                    setUsernameError(true);
                    if (typeof data.errors.username === 'object') {
                        console.log('coba')
                        setUsernameErrorMessage(data.errors.username[0]);
                    } else {
                        setUsernameErrorMessage(data.errors.username);
                    }
                }
                if (data.errors.confirmPassword && data.errors.confirmPassword[0]) {
                    setConfirmPasswordError(true);
                    if (typeof data.errors.confirmPassword === 'object') {
                        setConfirmPasswordErrorMessage(data.errors.confirmPassword[0]);
                    } else {
                        setConfirmPasswordErrorMessage(data.errors.confirmPassword);
                    }
                }
                if (data.errors.password && data.errors.password[0]) {
                    setPasswordError(true);
                    if (typeof data.errors.password === 'object') {
                        setPasswordErrorMessage(data.errors.password[0]);
                    } else {
                        setPasswordErrorMessage(data.errors.password);
                    }
                }
            }
            setLoading(false);
            await alertFailed(data.message);
            return;
        }        
        if (api_register.status !== 201) {
            await alertFailed(data.message);
            setLoading(false);
            setUsernameError(false);
            setEmailError(false);
            setPasswordError(false);
            setConfirmPasswordError(false);
            return;
        }
        await alertSuccess(data.message);
        setLoading(false);
        await clearForm();
        redirect('/login');
    };

    return (
        <>
            <form onSubmit={loading ? () => {} : handleSubmit} className='pt-2'>
                <div className="mb-3">
                    <input
                        type="email"
                        id="exampleInputEmail1"
                        className={`${emailError ? "border-red-500" : ""} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Email Address"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="text-red-500 text-xs mt-1">{emailErrorMessage}</p>}
                </div>
                <div className="mb-3">
                    <input
                        type="Username"
                        id="exampleInputEmail1"
                        className={`${usernameError ? "border-red-500" : ""} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Username"
                        aria-describedby="emailHelp"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameError && <p className="text-red-500 text-xs mt-1">{usernameErrorMessage}</p>}
                </div>
                <div className="mb-3 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="exampleInputPassword"
                        className={`mt-1 block w-full px-3 py-2 border ${passwordError ? "focus:ring-red-500 focus:border-red-500 border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm`}
                        placeholder="Password"
                        aria-describedby="passwordHelp"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className={`absolute inset-y-0 right-0 px-4 text-gray-600 focus:outline-none ${passwordError ? 'pb-4' : ''}`}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <IoEyeOutline className={`${passwordError ? "text-red-500" : "text-gray-600"}`}/> : <FaRegEyeSlash className={`${passwordError ? "text-red-500" : "text-gray-600"}`} />}
                    </button>
                    {passwordError && <p className="text-red-500 text-xs mt-1">{passwordErrorMessage}</p>}
                </div>
                <div className="mb-3 relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="exampleInputPassword"
                        className={`mt-1 block w-full px-3 py-2 border ${confirmPasswordError ? "focus:ring-red-500 focus:border-red-500 border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm`}
                        placeholder="Confirm Password"
                        aria-describedby="passwordHelp"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className={`absolute inset-y-0 right-0 px-4 text-gray-600 focus:outline-none ${confirmPasswordErrorMessage ? 'pb-4' : ''}`}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <IoEyeOutline className={`${confirmPasswordError ? "text-red-500" : "text-gray-600"}`}/> : <FaRegEyeSlash className={`${passwordError ? "text-red-500" : "text-gray-600"}`} />}
                    </button>
                    {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordErrorMessage}</p>}
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-md shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:bg-gray-900 focus:ring-opacity-50 w-full"
                >
                    {loading ? <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'20px'} /> : "Register"}
                </button>
            </form>
        </>
    )
}

export default RegisterForm