export function newElements() {
    let elements = getElements();
    elements.push([]);
    setElements(elements);
}

export function addElement(collection, name) {
    let elements = getElements();
    elements[collection.id].push({"name":name});
    setElements(elements);
}

export function removeElements(collection) {
    let elements = getElements();
    elements.splice(collection, 1);
    setElements(elements);
    clearElements();
}

export function renameElement(collection, index, name) {
    let elements = getElements();
    elements[collection.id][index].name = name;
    setElements(elements);
}

export function getElementName(collection, index) {
    let elements = getElements();    
    return elements[collection.id][index].name;
}

export function removeElement(collection, index) {
    let elements = getElements();
    elements[collection.id].splice(index, 1);
    setElements(elements);
}

export function getElements() {
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

function clearElements() {
    const elementGrid = document.getElementById("elements");
    elementGrid.innerHTML = "";
}

function setElements(elements) {
    const sendJSON = JSON.stringify(elements);
    localStorage.setItem('elements', sendJSON);
}
