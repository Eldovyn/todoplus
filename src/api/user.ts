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

export { apiUpdateUserProfile, apiGetUser }