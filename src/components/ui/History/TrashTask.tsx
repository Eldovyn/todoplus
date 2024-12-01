import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import { apiDeleteTask } from "@/api/task";
import { alertFailed, alertSuccess } from "../Alert";

interface TrashTaskProps {
    item: any;
    setListTask: (data: any) => void;
    setTotalPage: (data: any) => void;
}


const TrashTask: React.FC<TrashTaskProps> = ({ setListTask, setTotalPage, item }) => {
    const [loadingRemove, setLoadingRemove] = useState(false);

    const handleRemoveListTask = async (id: string) => {
        setLoadingRemove(true);
        const accessToken = Cookies.get('accessToken');
        const response = await apiDeleteTask(accessToken ?? '', id);
        const resp = await response.json();
        if (response.status !== 201) {
            await alertFailed(resp.message);
            setLoadingRemove(false);
            return;
        }
        setListTask(resp.page.tasks);
        await alertSuccess(resp.message);
        setTotalPage(resp.page.total_page);
        setLoadingRemove(false);
    };

    return (
        <>
            <FaTrash size={18} className="m-1 cursor-pointer" onClick={loadingRemove ? () => { } : () => handleRemoveListTask(item.task_id)} />
        </>
    )
};

export default TrashTask;