import React, { useState, useEffect } from 'react';
import { alertFailed, alertSuccess } from './ui/Alert';
import { redirect } from 'next/navigation';
import LoadingSpinnerComponent from 'react-spinners-components';
import { apiUserRegister, apiUserAccountVerification } from '@/api/user';
import EyePassword from './ui/EyePassword';
import PasswordError from './ui/PasswordError';

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string[]>([]);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const clearForm = async () => {
        setEmail('');
        setEmailError(false);
        setEmailErrorMessage('');
        setUsername('');
        setUsernameError(false);
        setUsernameErrorMessage('');
        setPassword('');
        setPasswordError(false);
        setPasswordErrorMessage([]);
        setConfirmPassword('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const api_register = await apiUserRegister(email, username, password);
        let data = await api_register.json();
        if (api_register.status === 400) {
            setLoading(false);
            setPasswordError(false);
            setUsernameError(false);
            setEmailError(false);
            if (data.errors.username) {
                setUsernameErrorMessage(data.errors.username[0]);
                setUsernameError(true);
            }
            if (data.errors.email) {
                setEmailErrorMessage(data.errors.email);
                setEmailError(true);
            }
            if (data.errors.password) {
                setPasswordErrorMessage(data.errors.password);
                setPasswordError(true);
            }
            await alertFailed(data.message);
            return;
        }
        if (api_register.status !== 201) {
            await alertFailed(data.message);
            setLoading(false);
            setUsernameError(false);
            setEmailError(false);
            setPasswordError(false);
            return;
        }
        await alertSuccess(data.message);
        const api_verification = await apiUserAccountVerification(email);
        const api_resp = await api_verification.json();
        if (api_verification.status === 201) {
            return redirect(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/account-active/verification?user_id=${data.data.id}&token=${api_resp.data.token}`);
        }
        setLoading(false);
        await clearForm();
        redirect('/login');
    };

    return (
        <>
            <form onSubmit={loading ? () => { } : handleSubmit} className="pt-2">
                <div className="mb-3">
                    <input
                        type="email"
                        id="exampleInputEmail1"
                        className={`mt-1 block w-full px-3 py-2 border 
                            ${emailError ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} 
                            rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm`}
                        placeholder="Email Address"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="text-red-500 text-xs mt-1">{emailErrorMessage}</p>}
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        id="exampleInputUsername"
                        className={`mt-1 block w-full px-3 py-2 border 
                            ${usernameError ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} 
                            rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm`}
                        placeholder="Username"
                        aria-describedby="usernameHelp"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameError && <p className="text-red-500 text-xs mt-1">{usernameErrorMessage}</p>}
                </div>
                <div className="mb-3 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="exampleInputPassword"
                        className={`mt-1 block w-full px-3 py-2 border 
                            ${passwordError ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} 
                            rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm mb-1`}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <EyePassword setShowPassword={setShowPassword} showPassword={showPassword} passwordErrorMessage={passwordErrorMessage} />
                    <PasswordError passwordErrorMessage={passwordErrorMessage} />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-md shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:bg-gray-900 focus:ring-opacity-50 w-full"
                >
                    {loading ? <LoadingSpinnerComponent type="Spinner" color="white" size="20px" /> : "Register"}
                </button>
            </form>
        </>
    );
};

export default RegisterForm;
