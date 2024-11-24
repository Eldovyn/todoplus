interface UserOptions {
    [key: string]: any;
}

const apiUpdateUserProfile = async (accessToken: string, options: UserOptions) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/profile`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(options)
    })
    return response;
}

const apiGetUser = async (accessToken: string) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/@me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    return response;
}

const apiUpdateUserPassword = async (accessToken: string, options: UserOptions) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(options)
    })
    return response;
}



const apiUserLogin = async (email: string, password: string) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    return response;
};



const apiUserRegister = async (email: string, username: string, password: string, confirmPassword: string) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword
        })
    });
    return response;
};

export { apiUpdateUserProfile, apiGetUser, apiUpdateUserPassword, apiUserLogin, apiUserRegister };