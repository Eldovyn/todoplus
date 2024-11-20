import React from 'react';

const RegisterForm: React.FunctionComponent = () => {
    return (
        <>
            <form action="" className='pt-2'>
                <div className="mb-3">
                    <input
                        type="email"
                        id="exampleInputEmail1"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Email Address"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="Username"
                        id="exampleInputEmail1"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Username"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        id="exampleInputPassword"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Password"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        id="exampleInputPassword"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Confirm Password"
                        aria-describedby="emailHelp"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-md shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:bg-gray-900 focus:ring-opacity-50 w-full"
                >
                    Register
                </button>
            </form>
        </>
    )
}

export default RegisterForm