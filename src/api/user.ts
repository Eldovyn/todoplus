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



const apiUserRegister = async (email: string, username: string, password: string) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password,
        })
    });
    return response;
};


const apiUserResetPassword = async (email: string) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
        })
    });
    return response;
};

const apiUserAccountVerification = async (email: string) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/account-active`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
        })
    });
    return response;
};

const apiTaskPagination = async (accessToken: string, limit: string, per_page: string) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/task/page?limit=${limit}&per_page=${per_page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    });
    return response;
}

const apiAllTask = async (accessToken: string, limit: string) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/task/all?limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    });
    return response;
}

export { apiAllTask, apiTaskPagination, apiUserAccountVerification, apiUpdateUserProfile, apiGetUser, apiUpdateUserPassword, apiUserLogin, apiUserRegister, apiUserResetPassword };