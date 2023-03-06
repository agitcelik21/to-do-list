let formVerisi = document.getElementById("veri");
let fname = document.querySelector("#fname");
let list = document.querySelector(".list");
let conta = document.querySelector(".conta");
let uyari = document.querySelector(".uyari");
let icon = document.getElementById("icon");
list.addEventListener("click", removeIcon);

formVerisi.addEventListener("submit", function (e) {

    if (fname.value.trim() === "") {
        showAlert("danger", "Please Fill In The Box");
    } else {
        storageEkle(fname.value);
        window.reload();
        loadAllUI(fname.value);
        removeIcon(fname.value);
        showAlert("success", "Successfully added");
        fname.value = "";
    }
    e.preventDefault();
})

function storageEkle(deger) {
    let value = callStorage();
    value.push(deger);
    localStorage.setItem("value", JSON.stringify(value));
}

function callStorage() {
    let value;

    if (localStorage.getItem("value") === null) {
        value = [];
    } else {
        value = JSON.parse(localStorage.getItem("value"));
    }
    return value;
}

document.addEventListener("DOMContentLoaded", function loadAllUI() {
    let value = callStorage();
    value.forEach(function (valu) {
        list.innerHTML += `
        <div id="yapildi">
        <ul>
        <li>${valu}</li>
        <i class="glyphicon glyphicon-remove" id="icon"></i>
        </ul>
        </div>
        `;
    });
});

function removeIcon(e) {
    if (e.target.id === "icon") {
        e.target.parentElement.remove();
        showAlert("dark", "Successfully deleted.");
        deleteValueFromStorage(e.target.parentElement.textContent.trim());
        localStorage.setItem("value", JSON.stringify(value));
    }
}

function deleteValueFromStorage(sil) {
    let value = callStorage();
    value.forEach(function (valu, index) {
        if (valu.trim() === sil) {
            value.splice(index, 1); // Arrayden değeri silebiliriz.
        }
    });
    localStorage.setItem("value", JSON.stringify(value));
}

function showAlert(type, message) {
    let alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    uyari.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 2000);
}


