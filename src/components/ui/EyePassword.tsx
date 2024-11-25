import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

interface EyePasswordProps {
    passwordErrorMessage: string[];
    setShowPassword: (data: boolean) => void;
    showPassword: boolean;
}

const EyePassword: React.FC<EyePasswordProps> = ({ passwordErrorMessage, showPassword, setShowPassword }) => {
    const paddingBottom = `pb-${passwordErrorMessage.length * 4}`;

    return (
        <button
            type="button"
            className={`absolute inset-y-0 right-0 px-4 text-gray-600 focus:outline-none ${passwordErrorMessage.length > 0 ? paddingBottom : ''}`}
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ? <IoEyeOutline className={`${passwordErrorMessage.length > 0 ? "text-red-500" : "text-gray-600"}`} /> : <FaRegEyeSlash className={`${passwordErrorMessage.length > 0 ? "text-red-500" : "text-gray-600"}`} />}
        </button>
    );
};

export default EyePassword;
