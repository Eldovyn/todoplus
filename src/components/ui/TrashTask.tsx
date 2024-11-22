import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import { alertFailed, alertSuccess } from "../ui/Alert";

interface TrashTaskProps {
    item: any;
    setListTask: (data: any) => void;
}

const TrashTask: React.FC<TrashTaskProps> = ( { item, setListTask } ) => {
    const [loadingRemove, setLoadingRemove] = useState(false);

    const handleRemoveListTask = (id: string) => {
        setLoadingRemove(true);
        const apiRemoveTask = async () => {
        let response = await fetch('http://127.0.0.1:5000/todoplus/task/id', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('accessToken')}`,
            },
            body: JSON.stringify({
            id: id,
            limit: 5
            }),
        })
        let resp = await response.json();
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
        apiRemoveTask()
    }

    return (
        <>
            <FaTrash size={18} className="m-1 cursor-pointer" onClick={loadingRemove ? () => { } : () => handleRemoveListTask(item.id)} />
        </>
    )
}

export default TrashTask