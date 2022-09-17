const form = document.querySelector("form");
const input = document.getElementById("task");
const deleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
const alertEmpty = document.getElementById("alertEmpty");
const alertAdded = document.getElementById("alertAdded");
const alertDone = document.getElementById("alertDone");
const alertEreased = document.getElementById("alertEreased");
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

function setItemToLS({text, completed}) {
    items = getItemsFromLS();

    items.push({text, completed});
    localStorage.setItem("items", JSON.stringify(items));

}


function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item.text === text) {
            items.splice(index, 1);
        }
    });

    localStorage.setItem("items", JSON.stringify(items));

}


function createItem(e) {

    const li = document.createElement("li");

    if(e.completed === true){
        li.className = "list-group-item list-group-item-secondary checked";
    }else if (e.completed === false){
        li.className = "list-group-item list-group-item-secondary";
    }
    
    li.appendChild(document.createTextNode(e.text));


    const b = document.createElement("a");
    b.style = "color: black"
    b.className = "check-item float-left mx-5";
    b.setAttribute("href", "#");
    b.innerHTML = '<i class="fa fa-check"></i>'
    li.appendChild(b);



    const x = document.createElement("a");
    x.style = "color: black";
    x.className = "delete-item float-right mx-5";
    x.setAttribute("href", "#");
    x.innerHTML = '<i class="fas fa-times"></i>'
    li.appendChild(x);


    taskList.appendChild(li);




    
    

}




function addNewItem(e) {

    if (input.value === "") {
        let timer;


        alertEmpty.classList.add("show");

        setTimeout(() => {
            alertEmpty.classList.remove("show");

        }, 3000);




        return;

    }

    createItem({text: input.value, completed:false});

    setItemToLS({text: input.value, completed:false});



    alertAdded.classList.add("show");

    setTimeout(() => {
        alertAdded.classList.remove("show");
    }, 3000);


    input.value = "";

    e.preventDefault();

}
function completedItem(e){
    if (e.target.className === "fa fa-check") {

        confirm("Görevi tamamlamak üzeresiniz!")

        e.target.parentElement.parentElement.classList.add("checked");
        
        items = getItemsFromLS();
        items.forEach(function (item) {
            if (item.text === e.target.parentElement.parentElement.textContent) {
                item.completed = true;
            }
        });
    
        localStorage.setItem("items", JSON.stringify(items));
    
        
            alertDone.classList.add("show");

            setTimeout(() => {
                alertDone.classList.remove("show");
            }, 3000); 
    }


}




function deleteItem(e) {
    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek için emin misiniz?")) {
            e.target.parentElement.parentElement.remove();

            deleteItemFromLS(e.target.parentElement.parentElement.textContent);

            alertEreased.classList.add("show");

    setTimeout(() => {
        alertEreased.classList.remove("show");
    }, 3000);


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
