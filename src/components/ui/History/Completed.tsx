import React, { useState } from "react";
import Cookies from 'js-cookie';
import { apiTaskComplete } from "@/api/task";
import { alertFailed, alertSuccess } from "../Alert";

interface CompletedProps {
    item: any;
    setListTask: any;
    setLimit: any;
    setTotalPage: any;
    setItemsPerPage: any;
    setTotalItems: any;
}

const Completed: React.FC<CompletedProps> = ({ item, setListTask, setLimit, setTotalPage, setItemsPerPage, setTotalItems }) => {
    const [loadingCompleted, setLoadingCompleted] = useState(false);

    const handleUpdateIsCompleted = (id: string, isCompleted: boolean) => {
        setLoadingCompleted(true);
        const apiUpdateTask_ = async () => {
            let response = await apiTaskComplete(Cookies.get('accessToken') ?? '', id, 0, !isCompleted);
            let resp = await response.json();
            if (response.status !== 201) {
                await alertFailed(resp.message);
                setLoadingCompleted(false);
                return;
            }
            await alertSuccess(resp.message);
            setListTask(resp.page.tasks);
            setLimit(resp.page.size);
            setTotalPage(resp.page.total_page);
            setItemsPerPage(resp.data.per_page);
            setTotalItems(resp.page.size);
            setLoadingCompleted(false);
        };
        apiUpdateTask_();
    };

    return (
        <>
            <input className="cursor-pointer m-1 form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="checkbox" checked={item.is_completed} id="flexCheckDefault" onChange={loadingCompleted ? () => { } : () => handleUpdateIsCompleted(item.task_id, item.is_completed)} />
        </>
    )
};

export default Completed;