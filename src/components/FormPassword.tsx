import React, { useState } from "react";
import { apiUpdateUserPassword } from "@/api/user";
import { alertFailed } from "./ui/Alert";
import Cookies from "js-cookie";
import { redirect } from 'next/navigation';
import LoadingSpinnerComponent from 'react-spinners-components';

const FormPassword: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const api_task = await apiUpdateUserPassword(Cookies.get('accessToken') ?? '', { password: password, confirm_password: confirmPassword });
        const resp = await api_task.json();
        if (api_task.status !== 201) {
            if (api_task.status === 400 && resp.errors && resp.errors.password) {
                setPasswordError(true);
            }
            if (api_task.status === 400 && resp.errors && resp.errors.confirm_password) {
                setConfirmPasswordError(true);
            }
            setLoading(false);
            await alertFailed(resp.message);
            return;
        }
        setLoading(false);
        Cookies.remove('accessToken');
        redirect('/');
    };

    return (
        <>
            <form className="flex flex-col text-gray-900 w-[47%]" onSubmit={loading ? () => {} : handleSubmit}>
                <p className="text-left text-sm pt-3 text-gray-300 pb-1">Password</p>
                <input
                    type="password"
                    className={`block w-full px-4 py-2 text-base text-gray-700 bg-white border ${passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'} rounded-md focus:outline-none focus:ring-2`}
                    id="passwordInput"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <p className="text-left text-sm pt-5 text-gray-300 pb-1">Konfirmasi Password</p>
                <input
                    type="password"
                    className={`block w-full px-4 py-2 text-base text-gray-700 bg-white border ${confirmPasswordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'} rounded-md focus:outline-none focus:ring-2`}
                    id="passwordInput"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">
                {loading ? <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'20px'} /> : "Submit Password"}
                </button>
            </form>
        </>
    )
};

export default FormPassword