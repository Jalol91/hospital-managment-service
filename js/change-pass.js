const form = document.getElementById("change-pass-form");

function changePass(e) {
  e.preventDefault();
  console.log(form);
  const dataRequest = {
    passwords: {
      old: form[0].value,
      new: form[1].value,
    },
  };
  fetch(port + "change-password", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    method: "PATCH",
    body: JSON.stringify(dataRequest),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
      } else {
        alert(data.message);
      }
    });
}
