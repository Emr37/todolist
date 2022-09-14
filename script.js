const form = document.querySelector("form");
const input = document.getElementById("task");
const deleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
const alertEmpty = document.getElementById("alertEmpty");
const alertDone = document.getElementById("alertDone");
const closeIcon = document.getElementsByClassName("close");
let items;



loadItems();

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addNewItem);
    taskList.addEventListener("click", completedItem)
    taskList.addEventListener("click", deleteItem);
    deleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}
function getItemsFromLS() {
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
}

function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem("items", JSON.stringify(items));

}

function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });

    localStorage.setItem("items", JSON.stringify(items));

}

function createItem(text) {

    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));

    const b = document.createElement("a");
    b.style = "color: #A0D995"
    b.className = "check-item float-left mx-5";
    b.setAttribute("href", "#");
    b.innerHTML = '<i class="fa fa-check"></i>'
    li.appendChild(b);



    const x = document.createElement("a");
    x.style = "color: #f78501"
    x.className = "delete-item float-right mx-5";
    x.setAttribute("href", "#");
    x.innerHTML = '<i class="fas fa-times"></i>'
    li.appendChild(x);


    taskList.appendChild(li);

    let timer;

    console.log("Listeye eklendi.");
    alertDone.classList.add("show");

    setTimeout(() => {
        alertDone.classList.remove("show");
    }, 5000);

}



function addNewItem(e) {

    if (input.value === "") {
        let timer;

        console.log("Listeye boş ekleme yapamazsınız");
        alertEmpty.classList.add("show");

        setTimeout(() => {
            alertEmpty.classList.remove("show");
        }, 5000);

        return;

    }

    createItem(input.value);

    setItemToLS(input.value);

    input.value = "";

    e.preventDefault();
}

function deleteItem(e) {
    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek için emin misiniz?")) {
            e.target.parentElement.parentElement.remove();

            deleteItemFromLS(e.target.parentElement.parentElement.textContent);


        }
    }

    e.preventDefault();
}

function deleteAllItems(e) {

    if (confirm("Silmek için emin misiniz?")) {

        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        localStorage.clear();

    }

    e.preventDefault();

}
