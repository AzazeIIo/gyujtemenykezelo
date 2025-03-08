import * as elements from "./elements.js";
import * as collections from "./collections.js";

const newBtn = document.getElementById("newBtn");
const newCollection = document.getElementById("newCollection");
const confirmBtn = document.getElementById("confirmBtn");
const closeBtn = document.getElementById("closeBtn");
const collectionList = document.getElementById("collectionList");
const elementGrid = document.getElementById("elementGrid");

let activeCollection;

window.onload = function() {
    showCollections();
}

$(collectionList).on({
    'mouseover':function(e) {
        if(e.target && e.target.nodeName == "LI") {                
            if(document.getElementById("gear") != undefined && e.relatedTarget != document.getElementById("gear")) {
                document.getElementById("gear").remove();
                document.getElementById("dropdown").remove();
            }
            if(e.relatedTarget != document.getElementById("gear")){
                document.getElementById(e.target.id).insertAdjacentHTML("beforeEnd",
                    `<img class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src="images/gear.png" alt="Szerkesztés" id="gear" style="float:right">
                    <ul id="dropdown" class="dropdown-menu">
                        <li><a class="dropdown-item" id="rename" href="#">Átnevezés</a></li>
                        <li><a class="dropdown-item" id="remove" href="#">Törlés</a></li>
                    </ul>`);
                document.getElementById("rename").onclick = function() {
                    editCollection(e.target);
                };
                document.getElementById("remove").onclick = function() {
                    collections.removeCollection(e.target.id);
                    showCollections();
                }
            }
        }
    },
    'mouseleave':function(e) {
        if(e.target && e.target.nodeName == "LI" && document.getElementById("gear") != undefined) {
           document.getElementById("gear").remove();
            document.getElementById("dropdown").remove();
        }
    }
});

collectionList.onclick = function(e) {
    if(e.target && e.target.nodeName == "LI") {
        if (activeCollection != undefined) {
            activeCollection.classList.toggle("active");
        }
        activeCollection = e.target;
        activeCollection.classList.toggle("active");
        showElements(activeCollection);
    }
}

collectionList.ondblclick = function(e) {
    if(e.target && e.target.nodeName == "LI") {
        editCollection(e.target);
    }
}

newBtn.onclick = function() {
    newCollection.style.display = "block";
}

confirmBtn.onclick = function() {
    const titleValue = document.getElementById("title").value;
    const topicValue = document.getElementById("topic").value;
    const dateValue = document.getElementById("date").value;
    collections.addCollection(titleValue, topicValue, dateValue);
    showCollections();
    newCollection.style.display = "none";
}

closeBtn.onclick = function() {
    newCollection.style.display = "none";
}

function showCollections() {
    const collectionArray = collections.getCollections();
    collectionList.innerHTML = "";
    collectionArray.forEach((collection, index) => {
        const item = document.createElement("li");
        item.id = index;
        item.className = "list-group-item list-group-item-action dropdown";
        item.innerHTML = collection.title;
        collectionList.appendChild(item);
    });
}

function showElements(collection) {
    const elementArray = elements.getElements();
    let currentRow;

    elementGrid.innerHTML = "";
    if(elementArray[collection.id].length == 0) {
        currentRow = document.createElement("div");
        currentRow.className = "row";
        elementGrid.appendChild(currentRow);
    }
    elementArray[collection.id].forEach((element, index) => {
        if(index % 4 == 0) {
            currentRow = document.createElement("div");
            currentRow.className = "row";
            elementGrid.appendChild(currentRow);
        }
        let currentElem = document.createElement("div");
        currentElem.className = "col-3";
        let card = document.createElement("div");
        card.id = `elem${index}`;
        card.className = "card dropdown";
        let cardImage = document.createElement("img");
        cardImage.className = "card-img-top";
        cardImage.src = "/images/photomissing.png";
        card.appendChild(cardImage);
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        let cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerText = element.name;
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        currentElem.appendChild(card);
        
        currentRow.appendChild(currentElem);
    });
    let newElementBtn = document.createElement("div");
    newElementBtn.className = "col-3";
    currentRow.appendChild(newElementBtn);
    let newElementImg = document.createElement("img");
    newElementImg.src = "images/plus.png";
    newElementBtn.onclick = function(e) {
        let input = document.createElement("input");
        input.id = "elementName";
        input.onkeydown = function(ev){
            if(ev.key === 'Enter') {                
                elements.addElement(collection, input.value);
                showElements(collection);
            }
        }
        newElementBtn.innerHTML = "";
        newElementBtn.appendChild(input);
        input.focus();
    }
    newElementBtn.appendChild(newElementImg);

    $(".card").on({
        'mouseover':function(e) {
            console.log("tesztelek");
            
            if(e.target && e.target.classList.contains("card")) {
                if(document.getElementById("gear") != undefined && e.relatedTarget != document.getElementById("gear")) {
                    document.getElementById("gear").remove();
                    document.getElementById("dropdown").remove();
                }
                if(e.relatedTarget != document.getElementById("gear")){
                    this.insertAdjacentHTML("beforeEnd",
                        `<img class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src="images/gear.png" alt="Szerkesztés" id="gear" style="float:right">
                        <ul id="dropdown" class="dropdown-menu" aria-labelledby="gear">
                            <li><a class="dropdown-item" id="rename" href="#">Átnevezés</a></li>
                            <li><a class="dropdown-item" id="move" href="#">Áthelyezés</a></li>
                            <li><a class="dropdown-item" id="remove" href="#">Törlés</a></li>
                        </ul>`);
                    document.getElementById("rename").onclick = function(e) {
                        editElement(collection, e.target.parentElement.parentElement.parentElement);
                    };
                    document.getElementById("move").onclick = function() {
    
                    }
                    document.getElementById("remove").onclick = function() {
                        let index = Number(e.target.id.slice(4));
                        elements.removeElement(collection, index);
                        showElements(collection);
                    }
                }
            }
        },
        'mouseleave':function(e) {
            /*if(document.getElementById("gear") != undefined) {
                document.getElementById("gear").remove();
                document.getElementById("dropdown").remove();
            }*/
        }
    });
}

function editElement(collection, target) {
    if(target) {
        let index = Number(target.id.slice(4));
        
        let original = elements.getElementName(collection, index);
        let input = document.createElement("input");
        input.value = original;
        input.onkeydown = function(ev){
            if(ev.key === 'Enter') {
                elements.renameElement(collection, index, input.value);
                showElements(collection);
            }
        }
        input.onblur = function(e){
            if(e.relatedTarget == null || e.relatedTarget.id != "renameInput") {
                showElements(collection);
            }
        }
        target.innerText = "";
        target.appendChild(input);
        input.focus();
        let submit = document.createElement("button");
        submit.type = "button";
        submit.className = "btn btn-secondary";
        submit.innerText = "Mentés";
        submit.id = "renameInput";
        submit.onclick = function() {
            elements.renameElement(collection, index, input.value);
            showElements(collection);
        }
        target.appendChild(submit);
    }
}

function editCollection(target) {
    let original = collections.getCollectionTitle(target.id);
    let input = document.createElement("input");
    input.value = original;
    input.onkeydown = function(ev){
        if(ev.key === 'Enter') {
            collections.renameCollection(target.id, input.value);
            showCollections();
        }
    }
    input.onblur = function(e){
        if(e.relatedTarget == null || e.relatedTarget.id != "renameInput") {
            showCollections();
        }
    }
    target.innerText = "";
    target.appendChild(input);
    input.focus();
    let submit = document.createElement("button");
    submit.type = "button";
    submit.className = "btn btn-secondary";
    submit.innerText = "Mentés";
    submit.id = "renameInput";
    submit.onclick = function() {
        collections.renameCollection(target.id, input.value);
        showCollections();
    }
    target.appendChild(submit);
}
