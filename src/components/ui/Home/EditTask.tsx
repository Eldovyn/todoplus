import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

interface EditTaskProps {
    item: any;
    openModal: (id: string) => void;
}

const EditTask: React.FC<EditTaskProps> = ({ item, openModal }) => {
    return (
        <>
            <MdEdit
                size={18}
                className="m-1 cursor-pointer"
                onClick={() => openModal(item.task_id)}
            />
        </>
    )
};

export default EditTask;