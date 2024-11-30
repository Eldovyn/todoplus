import React, { useState } from "react";
import Cookies from "js-cookie";
import { alertFailed, alertSuccess } from "../Alert";
import { apiTaskComplete } from "@/api/task";

interface CompletedProps {
    item: any;
    setListTask: (data: any) => void
}

const Completed: React.FC<CompletedProps> = ({ item, setListTask }) => {
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const handleUpdateIsCompleted = (id: string, isCompleted: boolean) => {
        setLoadingUpdate(true);
        const apiUpdateTask_ = async () => {
            let response = await apiTaskComplete(Cookies.get('accessToken') ?? '', id, 5, !isCompleted);
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
            <input className="cursor-pointer m-1 form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="checkbox" checked={item.is_completed} id="flexCheckDefault" onChange={loadingUpdate ? () => { } : () => handleUpdateIsCompleted(item.task_id, item.is_completed)} />
        </>
    )
};

export default Completed