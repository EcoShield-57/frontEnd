// ogin/sign-up switch 
function toggleForm() {  ddfd
    const login = document.querySelector('.login');
    const signup = document.querySelector('.signup');
    
    if (login.style.display === "none") {
        login.style.display = "block";
        signup.style.display = "none";
    } else {
        login.style.display = "none";
        signup.style.display = "block";
    }
}

// back-end link code
let userEmail = "";

/* =========================
   SIGNUP
function signup() {
  let email = document.getElementById("signupEmail").value.trim();
  let password = document.getElementById("signupPassword").value.trim();

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
    console.log("Signup Response:", data);
    alert(data.message);
  })
  .catch(err => {
    console.error("Signup Error:", err);
    alert("Signup failed. Backend check karo.");
  });
}


/* =========================
   LOGIN
function login() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

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
    console.log("Login Response:", data);

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


/* =========================
   SAVE DETAILS (Country + State)
function saveDetails() {
  let country = document.getElementById("country").value;
  let state = document.getElementById("state").value;

  if (!country || !state) {
    alert("Please select country and state");
    return;
  }

  fetch("http://127.0.0.1:5000/save-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: userEmail,
      country: country,
      state: state
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Save Details Response:", data);
    alert(data.message);

    // Optional redirect
    // window.location.href = "dashboard.html";
  })
  .catch(err => {
    console.error("Save Error:", err);
    alert("Data save nahi hua");
  });
}
function login() {
    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("result").innerText = data.message;
    });
}


// hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
