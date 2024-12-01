import React from "react";

interface PasswordErrorProps {
    passwordErrorMessage: string[];
}

const PasswordError: React.FC <PasswordErrorProps> = ( { passwordErrorMessage} ) => {
    return (
        <>
        {
            passwordErrorMessage.length > 0 && (
                <div className='mb-3'>
                    <ul className="list-disc pl-5 text-xs text-red-500">
                        {passwordErrorMessage.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))
                        }
                    </ul>
                </div>
            )
        }
        </>
    )
};

export default PasswordError