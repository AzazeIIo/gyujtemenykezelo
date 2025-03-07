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
        currentElem.innerText = element.name;
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

export function editElementName(index, name) {

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
