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

async function handle_status(response) {
    switch (response.status) {
        case 400:
        case 500:
            throw Error;
        case 401:
            // client not recognised by server - but they do have a valid oli.casa token
            window.location.hash = "#/signup/";
            return;
        case 404: // request not found
            return false;
        case 200:
        default:
            try {
                return await response.json();
            } catch (e) {
                console.log(e);
                return false;
            }
    }
}
