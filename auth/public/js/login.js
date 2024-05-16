const submitForm = ()=> {
    let email    = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const body = {
        email: email,
        password: password
    }

    fetch('/api/login', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include',
    }).then(res => res.json())
    .then(res => window.location.reload());
}