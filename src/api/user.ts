interface UserOptions {
    [key: string]: any;
}

const apiUpdateUser = async (category: string, accessToken: string, options: UserOptions) => {
    let data;
    if (category === 'email') {
        data = {
            new_email: options.email
        }
    } else if (category === 'username') {
        data = {
            new_username: options.username
        }
    }
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/profile/${category}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    })
    return response;
}

const apiGetUser = async (accessToken: string) => {
    console.log(accessToken, process.env.NEXT_PUBLIC_TODOPLUS_API)
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/@me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    return response;
}

export { apiUpdateUser, apiGetUser }