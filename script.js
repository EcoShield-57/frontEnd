// Login/Sign-up switch 
function toggleForm() {
    const login = document.querySelector('.login');
    const signup = document.querySelector('.signup');
    
    // Ensure display isn't empty on first click
    if (login.style.display === "none") {
        login.style.display = "block";
        signup.style.display = "none";
    } else {
        login.style.display = "none";
        signup.style.display = "block";
    }
}

let userEmail = "";

// SIGNUP
function signup() {
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(err => {
        console.error("Signup Error:", err);
        alert("Signup failed. Check backend.");
    });
}

// LOGIN
function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("msg").innerText = data.message;
        if (data.message === "Login successful") {
            userEmail = email;
            document.getElementById("extra").style.display = "block";
        }
    })
    .catch(err => {
        console.error("Login Error:", err);
        alert("Login failed. Backend connect nahi ho raha.");
    });
}

// SAVE DETAILS
function saveDetails() {
    let country = document.getElementById("country").value;
    let state = document.getElementById("state").value;

    if (!country || !state) {
        alert("Please select country and state");
        return;
    }

    fetch("http://127.0.0.1:5000/save-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: userEmail,
            country: country,
            state: state
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(err => {
        console.error("Save Error:", err);
        alert("Data save nahi hua");
    });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
