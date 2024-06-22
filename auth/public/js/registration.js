const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const confPassInput = document.getElementById("passwordConfirm");
const submitButton = document.getElementById("submitButton");

const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");
const confPassError = document.getElementById("confPassError");

window.onload = () => {
    submitButton.disabled = true;
}

emailInput.addEventListener("input", function(){
    const value = emailInput.value;
    const isEmail = validateEmail(value);

    if(isEmail || value == ""){
        emailError.innerHTML = "";
    }else{
        emailError.innerHTML = "Please input a valid email..."
    }

    checkSubmit();
}, false);

passInput.addEventListener("input", function(){
    const value = passInput.value;
    const isGoodPassword = validatePassword(value);

    if(isGoodPassword){
        passError.innerHTML = "";
    }else{
        passError.innerHTML = "Passwords must contain at least 8 characters, one lowercase, one uppercase, a number and a special character"
    }

    checkSubmit();
}, false);

confPassInput.addEventListener("input", function(){
    const password = passInput.value;
    const confirmPassword = confPassInput.value;
    const passwordMatch = password === confirmPassword;

    if(passwordMatch){
        confPassError.innerHTML = "";
    }else{
        confPassError.innerHTML = "Passwords must match"
    }

    checkSubmit();
}, false);

const checkSubmit = ()=>{
    const okayToSubmit = validateEmail(emailInput.value)   && 
                         validatePassword(passInput.value) && 
                         passInput.value === confPassInput.value;

    if(okayToSubmit) submitButton.disabled = false;
    else             submitButton.disabled = true;
}


const validateEmail = (email="") => {
return String(email)
    .toLowerCase()
    .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password="") => {
    return  /[A-Z]/       .test(password) &&
            /[a-z]/       .test(password) &&
            /[0-9]/       .test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password.length >= 8;
}