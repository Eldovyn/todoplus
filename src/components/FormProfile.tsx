import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { apiUpdateUserProfile, apiGetUser } from "@/api/user";
import LoadingSpinnerComponent from 'react-spinners-components';
import { alertSuccess, alertFailed } from "./ui/Alert";

const FormProfile: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailMessageError, setEmailMessageError] = useState<string>('');

    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [usernameMessageError, setUsernameMessageError] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const api_task = await apiUpdateUserProfile(Cookies.get('accessToken') ?? '', { new_email: email, new_username: username });
        const resp = await api_task.json();
        if (api_task.status !== 201) {
            if (api_task.status === 400 && resp.errors && resp.errors.new_email) {
                setEmailError(true);
                setEmailMessageError(resp.errors.new_email[0]);
            }
            if (api_task.status === 400 && resp.errors && resp.errors.new_username) {
                setUsernameError(true);
                setUsernameMessageError(resp.errors.new_username[0]);
            }
            setLoading(false);
            await alertFailed(resp.message);
            return;
        }
        await alertSuccess(resp.message);
        setEmail(resp.data.new_email || resp.data.email);
        setUsername(resp.data.new_username || resp.data.username);
        setEmailError(false);
        setLoading(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const api_me = await apiGetUser(Cookies.get('accessToken') ?? '');
            const resp = await api_me.json();
            if (api_me.status === 200 && resp.data) {
                setEmail(resp.data.email || '');
                setUsername(resp.data.username || '');
            }
        };
        fetchUserData();
    }, []);

    return (
        <>
            <form className="flex flex-col text-gray-900 w-[47%]" onSubmit={loading ? () => {} : handleSubmit}>
                <p className="text-left text-sm pt-3 text-gray-300 pb-1">Email</p>
                <input
                    type="text"
                    className={`block w-full px-4 py-2 text-base text-gray-700 bg-white border ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'} rounded-md focus:outline-none focus:ring-2`}
                    id="profileInput"
                    placeholder="name@example.com"
                    value={email || ''}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-left text-sm pt-5 text-gray-300 pb-1">Username</p>
                <input
                    type="text"
                    className={`block w-full px-4 py-2 text-base text-gray-700 bg-white border ${usernameError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'} rounded-md focus:outline-none focus:ring-2`}
                    id="usernameInput"
                    placeholder="Username"
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">
                    {loading ? <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'20px'} /> : "Submit Profile"}
                </button>
            </form>
        </>
    );
};

export default FormProfile;
