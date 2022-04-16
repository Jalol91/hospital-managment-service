const port = "https://hospital-service-express-api.herokuapp.com/";

function checkUser() {
  const isToken = localStorage.getItem("token");
  if (!isToken) {
    window.location.href = "index.html";
  }
}
checkUser();

function logOut() {
  fetch(port + "sign-out", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
        localStorage.removeItem("token");
        window.location.href = "index.html";
      } else {
        alert(data.message);
      }
    });
}
