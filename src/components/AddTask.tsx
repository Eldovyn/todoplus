import React, { useEffect, useState } from "react";
import { IoAdd } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

interface AddTaskProps {
    listTask: any[];
    setListTask: Dispatch<SetStateAction<any[]>>;
}

const AddTask: React.FunctionComponent<AddTaskProps> = ({ listTask, setListTask }) => {
    const [title, setTitle] = useState("");

    const [loading, setLoading] = useState(false);

    const [titleError, setTitleError] = useState(false);

    const [token, setToken] = useState('');

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        setToken(accessToken ?? '');
    }, []);

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

    const userTask = async () => {
        let response = await fetch('http://localhost:5000/todoplus/task', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title
            }),
        });
        return response;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const api_task = await userTask();
        let data = await api_task.json();
        if (api_task.status !== 201) {
            setTitleError(false);
            if (data.errors && data.errors.title) {
                setTitleError(true);
                await alertFailed(data.message);
                setLoading(false);
                return;
            }
            if (api_task.status === 401) {
                await alertFailed(data.message);
                setLoading(false);
                Cookies.remove('accessToken');
                redirect('/');
            }
            await alertFailed(data.message);
            setLoading(false);
            return;
        }
        await alertSuccess(data.message);
        setTitleError(false);
        setTitle('');
        setListTask([...listTask, data.data]);
        setLoading(false);
        return;
    };

    return (
        <>
            <form className="mb-3 mt-3 flex justify-center items-center" onSubmit={loading ? () => { } : handleSubmit}>
                <div className="flex flex-col mb-3 w-[60%]">
                    <div className="flex items-center">
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text"
                            placeholder="Tulis Disini ..."
                            className={`flex-1 px-4 py-2 text-white placeholder-white bg-[#1d4ed8] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-400 h-12`}
                        />
                        <button
                            className="flex items-center justify-center px-4 bg-gray-900 text-white rounded-r-lg hover:bg-gray-800 transition h-12"
                            aria-label="Add"
                            type="submit"
                        >
                            <IoAdd className="text-xl" />
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddTask;
