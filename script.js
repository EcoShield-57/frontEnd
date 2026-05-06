// Toggle Login / Signup
function toggleForm() {
    const loginBox = document.querySelector('.login');
    const signupBox = document.querySelector('.signup');

    if (loginBox.style.display === "none") {
        loginBox.style.display = "block";
        signupBox.style.display = "none";
    } else {
        loginBox.style.display = "none";
        signupBox.style.display = "block";
    }
}

// Default: show login first
document.querySelector('.signup').style.display = "none";

let userEmail = "";

// ================= SIGNUP =================
document.querySelector('.signup form').addEventListener('submit', function(e) {
    e.preventDefault();

    let email = this.querySelector('input[name="email"]').value.trim();
    let password = this.querySelector('input[name="password"]').value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(err => {
        console.error("Signup Error:", err);
        alert("Signup failed. Backend check karo.");
    });
});

// ================= LOGIN =================
document.querySelector('.login form').addEventListener('submit', function(e) {
    e.preventDefault();

    let email = this.querySelector('input[name="email"]').value.trim();
    let password = this.querySelector('input[name="password"]').value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);

        if (data.message === "Login successful") {
            userEmail = email;
        }
    })
    .catch(err => {
        console.error("Login Error:", err);
        alert("Login failed. Backend connect nahi ho raha.");
    });
});
