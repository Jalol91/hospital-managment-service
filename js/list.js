const list = document.querySelector(".list-wrapper"),
      modalPage = document.querySelector(".modal-wrapper"),
      commentEl = document.querySelector('#comment');

let currentItem = {
    _id: '',
    date: null,
    text: ''
}


renderList();
function renderList() {

    fetch(port + "get-all-appointments", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status === "success") {
                for(let item of data.data){
                    list.innerHTML += `
                        <div class="list-item" id="list-item-${item._id}">
                            <div class="text-content">
                              <p>Acceptance record for: <span class="enroll">${item.date}</span></p>
                              <p>Information: <span class="information">${item.text}</span></p>
                            </div>
                            <div class="buttons">
                              <button class="change-btn" onclick="openModal('${item._id}', '${item.date}', '${item.text}')">change</button>
                              <button class="cancel-btn" onclick="deleteItem('${item._id}')">cancel</button>
                            </div>
                          </div>
                        `;
                }
            } else {
                alert(data.message);
            }
        });



}

function updateItem() {
    const dataRequest = {
        date: Date.now(), // currentItem.date,
        text: currentItem.text,
    };

    fetch(port + "update-appointment/" + currentItem._id, {
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
                const itemEl = document.getElementById("list-item-" + data.appointment._id);
                closeModal();
                itemEl.querySelector('.information').innerHTML = data.appointment.text;
            } else {
                alert(data.message);
            }
        });
}




function deleteItem(id){
    fetch(port + "delete-appointment/" + id, {
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
                const itemEl = document.getElementById('list-item-' + id);
                itemEl.remove();
            } else {
                alert(data.message);
            }
        });
}
function openModal(id, date, text) {
    debugger;
  modalPage.style.display = "block";
  commentEl.innerHTML = text;
  currentItem._id = id;
}
function closeModal(){
    modalPage.style.display = "none";
}

function onChangeComment() {
    currentItem.text = commentEl.value;
}


