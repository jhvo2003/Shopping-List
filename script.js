const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');

onOpen();



function onOpen(){
    itemForm.addEventListener("submit", onItemSubmit);
    window.addEventListener("DOMContentLoaded", loadItems);
    clearBtn.addEventListener("click", removeAll);
    itemFilter.addEventListener("input", filterItems);
}

function filterItems(e){
    const filter = e.target.value;
    const items = document.querySelectorAll("li");
    console.log(items);
    
}

function onItemSubmit(e){
    e.preventDefault();
    addItem(itemInput.value);
    addToStorage(itemInput.value);
}

function addToStorage(newItem){
    const jsonString = localStorage.getItem("myArray");
    const myArray = JSON.parse(jsonString) || [];
    myArray.push(newItem)
    const newJson = JSON.stringify(myArray);
    localStorage.setItem("myArray", newJson);
}

function loadItems(){
    const jsonString = localStorage.getItem("myArray")
    const myArray = JSON.parse(jsonString) || [];
    for (item in myArray){
        addItem(myArray[item]);
    }
}

function addItem(newItem){
    const li = document.createElement("li");
    const button = document.createElement("button");
    const i = document.createElement("i");

    li.textContent = newItem;
    button.setAttribute("class", "remove-item btn-link text-red");
    button.addEventListener("click", (e) => {
        button.parentElement.remove();
        remove(button.parentElement.textContent);
    });
    i.setAttribute("class", "fa-solid fa-xmark");

    button.appendChild(i);
    li.appendChild(button);
    itemList.appendChild(li);
}

function remove(removeItem){
    const jsonString = localStorage.getItem("myArray");
    const myArray = JSON.parse(jsonString);
    const array = myArray.filter( (item) => item !== removeItem);
    localStorage.setItem("myArray", JSON.stringify(array));
}

function removeAll(){
    const items = document.querySelectorAll("li");
    const arr = Array.from(items);
    for (const item in arr){
        arr[item].remove()
    }
    localStorage.clear();
}
