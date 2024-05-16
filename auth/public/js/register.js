const submitForm = ()=> {
    let email    = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const body = {
        email: email,
        password: password
    }

    fetch('/api/signup', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
    }).then(res => res.json())
    .then(res => {
        console.log(res);
    });
}