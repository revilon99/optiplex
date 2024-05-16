const logout = ()=>{
    fetch('/api/logout', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            window.location.reload()
        });
}

window.onload = () => {
    fetch('/api/userdata', {
        method: "GET",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
    .then(res => {
        document.getElementById("email").innerHTML = res.email;
    });
}