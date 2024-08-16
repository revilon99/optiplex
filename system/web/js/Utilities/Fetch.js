export const GET = async (url) => {
    const get = await (fetch(url));
    return handle_status(get);
}

export const POST = async (url, body) => {
    const post = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    return handle_status(post);
}

async function handle_status(response){
    switch (response.status) {
        case 200:
            return await response.json();
        case 401:
            // client not recognised by server - but they do have a valid token
            window.location.hash = "#/signup/";
            return;
        case 404:
            // request not found
            window.location.hash = "#/error/";
            return;
    }
}