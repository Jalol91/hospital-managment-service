const timeArr = [
  {time: "12 a.m.", ms: 0},
  {time: "01 a.m.", ms: 3600000},
  {time: "02 a.m.", ms: 7200000},
  {time: "03 a.m.", ms: 10800000},
  {time: "04 a.m.", ms: 14400000},
  {time: "05 a.m.", ms: 18000000},
  {time: "06 a.m.", ms: 21600000},
  {time: "07 a.m.", ms: 25200000},
  {time: "08 a.m.", ms: 28800000},
  {time: "09 a.m.", ms: 32400000},
  {time: "10 a.m.", ms: 36000000},
  {time: "11 a.m.", ms: 39600000},
  {time: "12 p.m.", ms: 43200000},
  {time: "01 p.m.", ms: 46800000},
  {time: "02 p.m.", ms: 50400000},
  {time: "03 p.m.", ms: 54000000},
  {time: "04 p.m.", ms: 57600000},
  {time: "05 p.m.", ms: 61200000},
  {time: "06 p.m.", ms: 64800000},
  {time: "07 p.m.", ms: 68400000},
  {time: "08 p.m.", ms: 72000000},
  {time: "09 p.m.", ms: 75600000},
  {time: "10 p.m.", ms: 79200000},
  {time: "11 p.m.", ms: 82800000},
];
const timePicker = document.querySelector("#timepicker"),
  dateInput = document.querySelector("#date-input"),
  comment = document.querySelector("#comment"),
  enrollBtn = document.querySelector(".enroll-btn");
dateInput.valueAsDate = new Date();
timeArr.forEach((checkedTime) => {
  timePicker.innerHTML += `<option value="${checkedTime.time}">${checkedTime.time}</option>`;
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(dateInput.value);
  let fullCheckedTime;
  timeArr.forEach((checkedTime) => {
    fullCheckedTime = dateInput.valueAsNumber + checkedTime.ms;
  });
  const dataRequest = {
    date: fullCheckedTime, // должна быть дата в миллисекундах
    text: comment.value,
  };
  console.log(dataRequest);
  fetch(port + "create-appointment", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    method: "POST",
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
});
