export function showElements(collection) {
    const elements = getElements();
    const elementGrid = document.getElementById("elements");
    elementGrid.innerHTML = "";
    let currentRow;
    
    if(elements[collection.id].length == 0) {
        currentRow = document.createElement("div");
        currentRow.className = "row";
        elementGrid.appendChild(currentRow);
    }
    elements[collection.id].forEach((element, index) => {
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
        $(card).on({
            'mouseover':function(e) {
                if(e.target && e.target.classList.contains("card")) {
                    if(document.getElementById("gear") != undefined && e.relatedTarget != document.getElementById("gear")) {
                        document.getElementById("gear").remove();
                        document.getElementById("dropdown").remove();
                    }
                    if(e.relatedTarget != document.getElementById("gear")){
                        document.getElementById(`elem${index}`).insertAdjacentHTML("beforeEnd",
                            `<img class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src="images/gear.png" alt="Szerkesztés" id="gear" style="float:right">
                            <ul id="dropdown" class="dropdown-menu" aria-labelledby="gear">
                                <li><a class="dropdown-item" id="rename" href="#">Átnevezés</a></li>
                                <li><a class="dropdown-item" id="move" href="#">Áthelyezés</a></li>
                                <li><a class="dropdown-item" id="remove" href="#">Törlés</a></li>
                            </ul>`);
                        document.getElementById("rename").onclick = function(e) {
                            edit(collection, e.target.parentElement.parentElement.parentElement);
                        };
                        document.getElementById("move").onclick = function() {

                        }
                        document.getElementById("remove").onclick = function() {
                            removeElement(collection, index);
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
                addElement(collection, input.value);
            }
        }
        newElementBtn.innerHTML = "";
        newElementBtn.appendChild(input);
        input.focus();
    }
    newElementBtn.appendChild(newElementImg);

}

export function newElements() {
    let elements = getElements();
    elements.push([]);
    setElements(elements);
}

export function addElement(collection, name) {
    let elements = getElements();
    elements[collection.id].push({"name":name});
    setElements(elements);
    showElements(collection);
}

export function removeElements(collection) {
    let elements = getElements();
    elements.splice(collection, 1);
    setElements(elements);
    clearElements();
}

export function edit(collection, target) {
    if(target) {
        let index = Number(target.id.slice(4));
        
        let original = getElementName(collection, index);
        let input = document.createElement("input");
        input.value = original;
        input.onkeydown = function(ev){
            if(ev.key === 'Enter') {
                renameElement(collection, index, input.value);
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
            renameElement(collection, index, input.value);
            showElements(collection);
        }
        target.appendChild(submit);
    }
}

function renameElement(collection, index, name) {
    let elements = getElements();
    elements[collection.id][index].name = name;
    setElements(elements);
    showElements(collection);
}

function getElementName(collection, index) {
    let elements = getElements();    
    return elements[collection.id][index].name;
}

function removeElement(collection, index) {
    let elements = getElements();
    elements[collection.id].splice(index, 1);
    setElements(elements);
    showElements(collection);
}

function clearElements() {
    const elementGrid = document.getElementById("elements");
    elementGrid.innerHTML = "";
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
