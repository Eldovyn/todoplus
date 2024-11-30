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



const apiAddTask = async (accessToken: string, title: string, limit: number) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/task`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            limit: limit
        }),
    });
    return response;
};



const apiDeleteTask = async (accessToken: string, id: string) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/task/id`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            id: id,
            limit: 0
        }),
    })
    return response;
};



const apiTaskComplete = async (accessToken: string, id: string, limit: number, status: boolean) => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/task/is_completed`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            id: id,
            status: status,
            limit: limit
        }),
    })
    return response;
}

const apiUpdateTitle = async (accessToken: string, title: string, id: string, limit: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_TODOPLUS_API}todoplus/task/title`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            new_title: title,
            id: id,
            limit: limit
        }),
    });
    return response;
}


export { apiTaskPagination, apiAllTask, apiAddTask, apiDeleteTask, apiTaskComplete, apiUpdateTitle };