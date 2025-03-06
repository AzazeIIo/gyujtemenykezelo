const newBtn = document.getElementById("newBtn");
const newCollection = document.getElementById("newCollection");
let activeCollection;

window.onload = function() {
    showCollections();
    document.getElementById("collections").onclick = function(e) {
        if(e.target && e.target.nodeName == "LI") {
            if (activeCollection != undefined) {
                activeCollection.classList.toggle("active");
            }
            activeCollection = e.target;
            activeCollection.classList.toggle("active");
            showElements();
        }
    }
    
    document.getElementById("collections").ondblclick = function(e) {
        if(e.target && e.target.nodeName == "LI") {
            let original = e.target.innerText;            
            let input = document.createElement("input");
            input.value = original;
            input.onkeydown = function(ev){
                if(ev.key === 'Enter') {
                    let collections = getCollections();
                    collections[e.target.id] = input.value;                    
                    setCollections(collections);
                    showCollections();
                }
            }
            /*input.onblur = function(){
                e.target.innerText = original;
            }*/
            e.target.innerText = "";
            e.target.appendChild(input);
            input.focus();
        }
    }
}

newBtn.onclick = function() {
    const title = '<label for="title">Cím: </label><input type="text" id="title" name="title" required><br>';
    const topic = '<label for="topic">Témakör: </label><input type="text" id="topic" name="topic" required><br>';
    const date = '<label for="date">Dátum: </label><input type="date" id="date" name="date" required><br>';
    const confirm = '<button class="btn btn-default" type="submit" id="confirm" name="confirm">Létrehozás</button>';
    newCollection.innerHTML = title + topic + date + confirm;
    const submitBtn = document.getElementById("confirm");
    submitBtn.onclick = function() {
        const titleValue = document.getElementById("title").value;
        const topicValue = document.getElementById("topic").value;
        const dateValue = document.getElementById("date").value;
        let collections = getCollections();
        let elements = getElements();
        newCollection.innerHTML = "";
        collections.push({titleValue, topicValue, dateValue});
        elements.push([]);
        setCollections(collections);
        setElements(elements);
        showCollections();
    }
}

function showCollections() {
    const collections = getCollections();
    const collectionList = document.getElementById("collections");
    collectionList.innerHTML = "";

    collections.forEach((collection, index) => {
        collectionList.insertAdjacentHTML("beforeEnd",
            `<li id="${index}" class="list-group-item list-group-item-action dropdown">
                ${collection.titleValue}
                <img class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src="images/gear.png" alt="Szerkesztés" id="${index}edit" style="float:right">
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Átnevezés</a></li>
                    <li><a class="dropdown-item" href="#">Törlés</a></li>
                </ul>
            </li>`);
    });
}

function getCollections() {
    const getJSON = localStorage.getItem('collections');
    if (getJSON){
        let collections = JSON.parse(getJSON);
        if (collections == undefined) {
            return [];
        }
        return collections;
    } else {
        return [];
    }
}

function setCollections(collections) {
    const sendJSON = JSON.stringify(collections);
    localStorage.setItem('collections', sendJSON);
}

function showElements() {
    const elements = getElements();
    const elementGrid = document.getElementById("elements");
    elementGrid.innerHTML = "";
    let currentRow;
console.log(activeCollection.id);

    elements[activeCollection.id].forEach((element, index) => {
        if(index % 4 == 0) {
            currentRow = document.createElement("div");
            currentRow.className = "row";
            elementGrid.appendChild(currentRow);
        }
        let currentElem = document.createElement("div");
        currentElem.className = "col-3";
        currentElem.innerText = element.name;
        currentRow.appendChild(currentElem);
    });
}

function getElements() {
    const getJSON = localStorage.getItem('elements');
    if (getJSON){
        let elements = JSON.parse(getJSON);
        if (elements == undefined) {
            return [];
        }
        return elements;
    } else {
        return [];
    }
}

function setElements(elements) {
    const sendJSON = JSON.stringify(elements);
    localStorage.setItem('elements', sendJSON);
}
