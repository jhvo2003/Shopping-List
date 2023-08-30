const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let UI = false;
let editMode = false;
onOpen();


function onOpen(){
    checkUI();
    itemForm.addEventListener("submit", onItemSubmit);
    window.addEventListener("DOMContentLoaded", loadItems);
    clearBtn.addEventListener("click", removeAll);
    itemFilter.addEventListener("input", filterItems);
    itemList.addEventListener("click", onClickItem)
}

function onClickItem(e){
    if (e.target.parentElement.classList.contains("remove-item")){
        e.target.parentElement.parentElement.remove();
        remove(e.target.parentElement.parentElement.textContent);
    }else{
        setEditMode(e.target);
    }
}

function setEditMode(item){
    editMode = true;
    itemList.querySelectorAll("li").forEach(item => item.classList.remove("edit"));
    item.setAttribute("class", "edit");
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i>   Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

function filterItems(e){
    const filter = e.target.value.toLowerCase();
    const items = document.querySelectorAll("li");
    items.forEach(element => {
        const item = element.textContent.toLowerCase();
        if (!item.includes(filter)){
            element.style.display = 'none';
        }else{
            element.style.display = ''
        }
    });
}

function onItemSubmit(e){
    e.preventDefault();
    let item = itemInput.value;
    if (editMode){
        let contains = false;
        itemList.querySelectorAll("li").forEach(element =>{
            if (!element.classList.contains("edit") && element.textContent.toLowerCase() === item.toLowerCase()){
                alert("Item already in list!");
                contains = true;
                return;
            }
        });
        if (contains){
            itemInput.value = '';
            return;
        }
        const itemToEdit = itemList.querySelector(".edit");
        remove(itemToEdit.textContent);
        itemToEdit.classList.remove("edit");
        itemToEdit.remove();
    }
    else if (containsItem(item.toLowerCase())){
        alert("Item already in list!")
        itemInput.value = '';
        return;
    }
    if (item.replace(/\s+/g, '') == ''){
        alert("Please input item");
    }else{
        addItem(item);
        addToStorage(item);
        UI = true;
    }
    checkUI();
    itemInput.value = '';
}

function containsItem(item){
    const json = localStorage.getItem("myArray");
    const itemsArr = JSON.parse(json) || [];
    const newItemArr = itemsArr.map(element => element.toLowerCase());
    return newItemArr.includes(item);

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
    if (myArray.length == 0)
        UI = false;
    else{
        UI = true;
        for (item in myArray){
            addItem(myArray[item]);
        }
    }
    checkUI();
}

function addItem(newItem){
    const li = document.createElement("li");
    const button = document.createElement("button");
    const i = document.createElement("i");

    li.textContent = newItem;
    button.setAttribute("class", "remove-item btn-link text-red");
    i.setAttribute("class", "fa-solid fa-xmark");

    button.appendChild(i);
    li.appendChild(button);
    itemList.appendChild(li);
}

function remove(removeItem){
    const jsonString = localStorage.getItem("myArray");
    const myArray = JSON.parse(jsonString);
    const array = myArray.filter( (item) => item !== removeItem);
    if (array.length == 0)
        UI = false;
    checkUI();
    localStorage.setItem("myArray", JSON.stringify(array));
}

function removeAll(){
    const items = document.querySelectorAll("li");
    const arr = Array.from(items);
    for (const item in arr){
        arr[item].remove()
    }
    UI = false;
    checkUI();
    localStorage.clear();
}

function checkUI(){
    if (UI == false){
        itemFilter.style.display = 'none';
        clearBtn.style.display = 'none';
    }else{
        itemFilter.style.display = '';
        clearBtn.style.display = '';
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = 'black';
    editMode = false;
}
