import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import { alertFailed, alertSuccess } from "../Alert";
import { apiDeleteTask } from "@/api/task";

interface TrashTaskProps {
    item: any;
    setListTask: (data: any) => void;
}

const TrashTask: React.FC<TrashTaskProps> = ( { item, setListTask } ) => {
    const [loadingRemove, setLoadingRemove] = useState(false);

    const handleRemoveListTask = async (id: string) => {
        setLoadingRemove(true);
        const response = await apiDeleteTask(Cookies.get('accessToken') ?? '', id);
        const resp = await response.json();
        if (response.status !== 201) {
            await alertFailed(resp.message)
            setLoadingRemove(false);
            return
        }
        await alertSuccess(resp.message)
        setListTask(resp.new_task);
        setLoadingRemove(false);
        return
    }

    return (
        <>
            <FaTrash size={18} className="m-1 cursor-pointer" onClick={loadingRemove ? () => { } : () => handleRemoveListTask(item.task_id)} />
        </>
    )
}

export default TrashTask