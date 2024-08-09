export default function (main) {
    document.title = "My Account - The System";

    main.innerHTML = `
<h1>Manage Account</h1>

<button><a href="${window.AUTH_URL}myaccount">Manage Password</a></button>
<button><a href="${window.AUTH_URL}logout">Logout</a></button>

<h2>Update Name</h2>
<form id="form-update-name" action="/api/user/update-name" method="post">
    <label>Name: </label>
    <input type="text" name="name" autocomplete="off" placeholder="Oli Cass" />
    <input type="submit" value="Change Name" />
</form>

<h2>Change Profile Picture</h2>
<div>
    <p>change profile picture settings here</p>
</div>
    `;
}