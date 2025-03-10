import * as elements from "./elements.js";
import * as collections from "./collections.js";

const collectionGrid = document.getElementById("collectionGrid");
const elementList = document.getElementById("elementList");
const elementContainer = document.getElementById("elementContainer");
const backBtn = document.getElementById("back");
const collectionTitle = document.getElementById("collectionTitle");
const confirmNewElement = document.getElementById("confirmNewElement");
const moveElementModalList = document.getElementById("moveElementModalList");
const confirmMoveElement = document.getElementById("confirmMoveElement");
let currentCollection;
let currentCollectionIndex;
let currentElementIndex;

window.onload = function() {
    showCollections();
}

function showCollections() {
    collectionGrid.style.display = "block";
    elementContainer.style.display = "none";
    const collectionArray = collections.getCollections();
    let currentRow;
    collectionGrid.innerHTML = "";
    if(collectionArray.length == 0) {
        currentRow = document.createElement("div");
        currentRow.className = "row";
        collectionGrid.appendChild(currentRow);
    }
    collectionArray.forEach((collection, index) => {
        if(index % 4 == 0) {
            currentRow = document.createElement("div");
            currentRow.className = "row";
            collectionGrid.appendChild(currentRow);
        }
        let currentCollection = document.createElement("div");
        currentCollection.className = "col-3 collection";
        let card = document.createElement("div");
        card.id = index;
        card.className = "card dropdown";
        let cardImage = document.createElement("img");
        cardImage.className = "card-img";
        if (collection.file === "") {
            cardImage.src = "/images/photomissing.png";
        } else {
            cardImage.src = collection.file;
        }
        card.appendChild(cardImage);
        let cardImgOverlay = document.createElement("div");
        cardImgOverlay.className = "card-img-overlay";
        let cardTitle = document.createElement("h3");
        cardTitle.className = "card-title";
        cardTitle.innerText = collection.title;
        cardImgOverlay.appendChild(cardTitle);
        let cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerText = collections.getCollectionTopic(index);
        cardImgOverlay.appendChild(cardText);
        let cardDate = document.createElement("p");
        cardDate.className = "card-text";
        cardDate.innerText = collections.getCollectionDate(index);
        cardImgOverlay.appendChild(cardDate);
        card.appendChild(cardImgOverlay);
        currentCollection.appendChild(card);
        currentRow.appendChild(currentCollection);

        card.onmouseenter = function(e) {
            const target = e.target;            
            if(target && target.classList.contains("card")) {
                if(e.relatedTarget != document.getElementById("gear")){
                    this.lastElementChild.firstElementChild.insertAdjacentHTML("beforeEnd",
                    `<img class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src="images/gear.png" alt="Szerkesztés" id="gear" style="float:right; float:top">
                    <ul id="dropdown" class="dropdown-menu" aria-labelledby="gear">
                        <li><a class="dropdown-item" id="rename" href="#">Átnevezés</a></li>
                        <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#removeModal" id="remove" href="#">Törlés</a></li>
                    </ul>`);
                    document.getElementById("rename").onclick = function() {
                        editCollection(e.target.lastElementChild.firstElementChild, e.target.id);
                    };
                    document.getElementById("confirmRemoval").onclick = function() {
                        collections.removeCollection(target.id);
                        showCollections();
                    }
                }
            }
        }
        card.onmouseleave = function() {
            if(document.getElementById("gear") != undefined) {
                document.getElementById("gear").remove();
                document.getElementById("dropdown").remove();
            }
        }
        card.onclick = function(e) {
            if(e.target.id != "gear" && e.target.id != "dropdown" && e.target.parentElement.parentElement.id != "dropdown" && e.target.id != "newTitle" && !e.target.classList.contains("btn")) {
                showElements(card.id);
            }
        }
    });
    if(collectionArray.length % 4 == 0) {
        currentRow = document.createElement("div");
        currentRow.className = "row";
        collectionGrid.appendChild(currentRow);
    }
    let newCollectionCard = document.createElement("div");
    newCollectionCard.className = "col-3 text-center align-content-center newCollection";
    currentRow.appendChild(newCollectionCard);
    let newCollectionBtn = document.createElement("button");
    newCollectionBtn.className = "btn btn-primary mb-3";
    newCollectionBtn.innerText = "Új gyűjtemény"
    newCollectionBtn.setAttribute("data-bs-toggle", "modal");
    newCollectionBtn.setAttribute("data-bs-target", "#newCollectionModal");
    newCollectionCard.appendChild(newCollectionBtn);
    confirmNewCollection.onclick = function() {
        const titleValue = document.getElementById("title").value;
        const topicValue = document.getElementById("topic").value;
        const dateValue = document.getElementById("date").value;
        const fileValue = document.getElementById("file").value;
        collections.addCollection(titleValue, topicValue, dateValue, fileValue);
        showCollections();
    }
}

function showElements(collectionId) {
    currentCollectionIndex = collectionId;
    elementContainer.style.display = "block";
    collectionGrid.style.display = "none";
    collectionTitle.innerText = collections.getCollectionTitle(collectionId);
    const elementArray = elements.getElements();
    elementList.innerHTML = "";
    elementArray[collectionId].forEach((element, index) => {
        const item = document.createElement("li");
        item.id = `elem${index}`;
        item.className = "list-group-item list-group-item-action dropdown";
        item.innerHTML = element.name;
        elementList.appendChild(item);
    });
    moveElementModalList.innerHTML = "Elem áthelyezése az alábbi gyűjteménybe:<br>";
    const collectionArray = collections.getCollections();
    collectionArray.forEach((collection, index) => {
        moveElementModalList.insertAdjacentHTML("beforeend",
        `<div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="col${index}">
            <label class="form-check-label" for="col${index}">${collection.title}</label>
        </div>`);
    });
}

confirmNewElement.onclick = function() {
    elements.addElement(currentCollectionIndex, document.getElementById("name").value);
    showElements(currentCollectionIndex);
}

confirmMoveElement.onclick = function(e) {
    const radio = document.getElementsByName("flexRadioDefault");
    radio.forEach(radioelement => {
        if(radioelement.checked) {
            elements.moveElement(currentCollectionIndex, currentElementIndex, radioelement.id.slice(3));
        }
    });
    showElements(currentCollectionIndex);
}

function editElement(target) {
    if(target) {
        let index = Number(target.id.slice(4));
        
        let original = elements.getElementName(currentCollectionIndex, index);
        let input = document.createElement("input");
        input.value = original;
        input.onkeydown = function(ev){
            if(ev.key === 'Enter') {
                elements.renameElement(currentCollectionIndex, index, input.value);
                showElements(currentCollectionIndex);
            }
        }
        input.onblur = function(e){
            if(e.relatedTarget == null || e.relatedTarget.id != "renameInput") {
                showElements(currentCollectionIndex);
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
            elements.renameElement(currentCollectionIndex, index, input.value);
            showElements(currentCollectionIndex);
        }
        target.appendChild(submit);
    }
}

function editCollection(target, index) {
    let original = collections.getCollectionTitle(index);
    let input = document.createElement("input");
    input.value = original;
    input.id = "newTitle";
    input.onkeydown = function(e){
        if(e.key === 'Enter') {
            collections.renameCollection(index, input.value);
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
        collections.renameCollection(index, input.value);
        showCollections();
    }
    target.appendChild(submit);
}

$(elementList).on({
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
                    <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#moveElementModal" id="move" href="#">Áthelyezés</a></li>
                    <li><a class="dropdown-item" id="remove" href="#">Törlés</a></li>
                </ul>`);
                document.getElementById("rename").onclick = function() {
                    editElement(e.target);
                };
                document.getElementById("move").onclick = function() {
                    currentElementIndex = e.target.id.slice(4);
                }
                document.getElementById("remove").onclick = function() {
                    elements.removeElement(currentCollectionIndex, e.target.id.slice(4));
                    showElements(currentCollectionIndex);
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

backBtn.onclick = function() {
    showCollections();
}
