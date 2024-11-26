import React, { useState, useEffect } from 'react';
import LoadingSpinnerComponent from 'react-spinners-components';
import { apiUserResetPassword } from '@/api/user';
import { alertFailed, alertSuccess } from './ui/Alert';

const ResetPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState(false);

    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const api_task = await apiUserResetPassword(email);
        const resp = await api_task.json();
        if (api_task.status !== 201) {
            if (resp.errors && resp.errors.email) {
                setEmailError(true);
                setEmailErrorMessage(resp.errors.email[0]);
            }
            setLoading(false);
            await alertFailed(resp.message);
            return;
        }
        setEmailErrorMessage('');
        setEmailError(false);
        setEmail('');
        setLoading(false);
        await alertSuccess(resp.message);
    }

    return (
        <>
            <form className='pt-2' onSubmit={handleSubmit}>
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
                <a href={`${process.env.NEXT_PUBLIC_TODOPLUS_URL}register`}>
                    <p className='underline font-semibold text-sm mb-3 text-right'>Register</p>
                </a>
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-md shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:bg-gray-900 focus:ring-opacity-50 w-full"
                >
                    {loading ? <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'20px'} /> : "Reset Password"}
                </button>
            </form>
        </>
    );
}

export default ResetPasswordForm;
