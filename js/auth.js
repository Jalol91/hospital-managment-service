const logInFormEl = document.querySelector(".login-form");
const registerFormEl = document.querySelector(".register-form");
const port = "https://hospital-service-express-api.herokuapp.com/";
function goToLogin() {
  logInFormEl.style.display = "block";
  registerFormEl.style.display = "none";
}

function goToRegister() {
  logInFormEl.style.display = "none";
  registerFormEl.style.display = "block";
}

function login(e) {
  e.preventDefault();
  const dataRequest = {
    credentials: {
      email: logInFormEl[0].value,
      password: logInFormEl[1].value,
    },
  };

  fetch(port + "sign-in", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(dataRequest),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        window.location.href = "order.html";
      } else {
        alert(data.message);
      }
    });
}

function register(e) {
  e.preventDefault();
  const dataRequest = {
    credentials: {
      firstName: registerFormEl[0].value,
      email: registerFormEl[1].value,
      password: registerFormEl[2].value,
      password_confirmation: registerFormEl[3].value,
    },
  };
  fetch(port + "sign-up", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(dataRequest),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        window.location.href = "order.html";
      } else {
        alert(data.message);
      }
    });
}
