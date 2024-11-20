import React from "react";
import Image from 'next/image'
import IconWeb from '../../../../public/IconRemoverBg.png'
import RegisterForm from "@/components/Register";

const RegisterPage: React.FunctionComponent = () => {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-900">
                <span className="border-2 bg-[#F0F1F5] rounded-md p-5 md:w-[60%] w-[80%] xl:w-[45%]">
                    <div className="flex justify-between pt-2">
                        <div className='flex justify-start'>
                            <Image src={IconWeb} alt='' className='w-10' />
                            <p className='font-bold text-sm'>TodoPlus</p>
                        </div>
                        <a href="http://localhost:3000/">
                            <p className='underline font-semibold text-sm'>Login</p>
                        </a>
                    </div>
                    <br /><br /><br />
                    <p className='font-bold text-center text-lg'>Welcome Back</p>
                    <p className='text-center text-sm pt-1'>Enter Your Account Details</p>
                    <RegisterForm />
                </span>
            </div>
        </>
    )
};

export default RegisterPage;