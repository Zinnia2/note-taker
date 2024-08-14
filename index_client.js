const btn = document.getElementById("btn");
btn.addEventListener("click", (event) => {
    alert("Hello");
})
// Get the popup element
const signinPopup = document.getElementById("signinPopup");
const signupPopup = document.getElementById("signupPopup");
// Get the button that opens the popup
const signInButton = document.getElementById("sign-in");
const signUpButton = document.getElementById("sign-up")

// Get the <span> element that closes the popup
const signInCloseButton = document.getElementById("sign-in-close");
const signUpCloseButton = document.getElementById("sign-up-close");

const signupSubmitButton = document.getElementById("sign-up-submit");

// When the user clicks the button, open the popup
signInButton.addEventListener("click", (event) => {
    signinPopup.style.display = "flex";
})

// When the user clicks on <span> (x), close the popup
signInCloseButton.addEventListener("click", (event) =>{
    signinPopup.style.display = "none";
})

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
    if (event.target === signinPopup) {
        signinPopup.style.display = "none";
    }
}
signUpButton.addEventListener("click", (event) => {
    signupPopup.style.display = "flex";
})

// When the user clicks on <span> (x), close the popup
signUpCloseButton.addEventListener("click", (event) => {
    signupPopup.style.display = "none";
})

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
    if (event.target === signinPopup) {
        signupPopup.style.display = "none";
    }
}

signupSubmitButton.addEventListener("click", (event) => {
    const signUpEndPoint = `http://${window.location.hostname}:${window.location.port}/signup`;
    const payload = {
        email : document.getElementById("email").value,
        password : document.getElementById("password").value
    }
    console.log(payload)
    fetch(signUpEndPoint, {
        method : "POST",
        body : JSON.stringify(payload)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        } else {
            signupPopup.style.display = "none";
            return response.json()
        }
    }).then(data => {
        console.log(data)
    })
})