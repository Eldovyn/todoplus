import React, { useState } from "react";
import Cookies from "js-cookie";
import { alertFailed, alertSuccess } from "../ui/Alert";

interface CompletedProps {
    item: any;
    setListTask: (data: any) => void
}

const Completed: React.FC<CompletedProps> = ({ item, setListTask }) => {
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const apiUpdateTask = async (id: string, isCompleted: boolean) => {
        let response = await fetch('http://127.0.0.1:5000/todoplus/task/is_completed', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('accessToken')}`,
            },
            body: JSON.stringify({
                id: id,
                status: !isCompleted,
                limit: 5
            }),
        })
        return response
    }
    const handleUpdateIsCompleted = (id: string, isCompleted: boolean) => {
        setLoadingUpdate(true);
        const apiUpdateTask_ = async () => {
            let response = await apiUpdateTask(id, isCompleted);
            let resp = await response.json();
            if (response.status !== 201) {
                await alertFailed(resp.message)
                setLoadingUpdate(false);
                return
            }
            await alertSuccess(resp.message)
            setListTask(resp.new_task);
            setLoadingUpdate(false);
            return
        }
        apiUpdateTask_()
    }

    return (
        <>
            <input className="cursor-pointer m-1 form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="checkbox" checked={item.is_completed} id="flexCheckDefault" onChange={loadingUpdate ? () => { } : () => handleUpdateIsCompleted(item.id, item.is_completed)} />
        </>
    )
};

export default Completed