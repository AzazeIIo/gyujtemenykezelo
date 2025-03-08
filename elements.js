export function newElements() {
    const elements = getElements();
    elements.push([]);
    setElements(elements);
}

export function addElement(collection, name) {
    const elements = getElements();
    elements[collection.id].push({"name":name});
    setElements(elements);
}

export function removeElements(collection) {
    const elements = getElements();
    elements.splice(collection, 1);
    setElements(elements);
    clearElements();
}

export function renameElement(collection, index, name) {
    const elements = getElements();
    elements[collection.id][index].name = name;
    setElements(elements);
}

export function getElementName(collection, index) {
    const elements = getElements();    
    return elements[collection.id][index].name;
}

export function removeElement(collection, index) {
    const elements = getElements();
    elements[collection.id].splice(index, 1);
    setElements(elements);
}

export function getElements() {
    const getJSON = localStorage.getItem('elements');
    if (getJSON){
        const elements = JSON.parse(getJSON);
        if (elements == undefined) {
            return [];
        }
        return elements;
    } else {
        return [];
    }
}

function clearElements() {
    const elementGrid = document.getElementById("elementGrid");
    elementGrid.innerHTML = "";
}

function setElements(elements) {
    const sendJSON = JSON.stringify(elements);
    localStorage.setItem('elements', sendJSON);
}
