import React, { useState, useEffect } from 'react';
import { alertFailed, alertSuccess } from './ui/Alert';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import LoadingSpinnerComponent from 'react-spinners-components';
import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';
import { apiUserLogin, apiUserAccountVerification } from '@/api/user';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const api_login = await apiUserLogin(email, password);
        let data = await api_login.json();
        if (api_login.status === 400) {
            if (data.errors) {
                setEmailError(false);
                setPasswordError(false);
                if (data.errors.email && data.errors.email[0]) {
                    setEmailError(true);
                    if (typeof data.errors.email === 'object') {
                        setEmailErrorMessage(data.errors.email[0]);
                    } else {
                        setEmailErrorMessage(data.errors.email);
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
        if (api_login.status === 403) {
            await alertFailed(data.message);
            setLoading(false);
            setEmailError(false);
            setPasswordError(false);
            const api_verification = await apiUserAccountVerification(email);
            const api_resp = await api_verification.json();
            if (api_verification.status === 201) {
                return redirect(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/account-active/verification?user_id=${data.data.id}&token=${api_resp.data.token}`);
            }
        }        
        if (api_login.status !== 201) {
            await alertFailed(data.message);
            setLoading(false);
            setEmailError(false);
            setPasswordError(false);
            return;
        }
        await alertSuccess(data.message);
        setLoading(false);
        setEmailError(false);
        setPasswordError(false);
        setPasswordErrorMessage('');
        setEmailErrorMessage('');
        setEmail('');
        setPassword('');
        Cookies.set('accessToken', data.data.access_token);
        redirect('/');
    };

    return (
        <>
            <form onSubmit={loading ? () => { } : handleLogin} className='pt-2'>
                <div className="mb-3">
                    <input
                        type="email"
                        id="exampleInputEmail1"
                        className={`mt-1 block w-full px-3 py-2 border ${emailError ? "focus:ring-red-500 focus:border-red-500 border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm`}
                        placeholder="Email Address"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="text-red-500 text-xs mt-1">{emailErrorMessage}</p>}
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
                <a href={`${process.env.NEXT_PUBLIC_TODOPLUS_URL}forgot-password`}>
                    <p className='underline font-semibold text-sm mb-3 text-right'>Forgot Password</p>
                </a>
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-md shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:bg-gray-900 focus:ring-opacity-50 w-full"
                >
                    {loading ? <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'20px'} /> : "Login"}
                </button>
            </form>
        </>
    );
}

export default LoginForm;
