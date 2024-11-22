import { toast } from 'react-toastify';

export const alertSuccess = async (message: string) => {
    toast.success(message, {
        position: "bottom-right",
    });
};

export const alertFailed = async (message: string) => {
    toast.error(message, {
        position: "bottom-right",
    });
};
