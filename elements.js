export function newElements() {
    const elements = getElements();
    elements.push([]);
    setElements(elements);
}

export function addElement(collectionIndex, name) {
    const elements = getElements();
    elements[collectionIndex].push({"name":name});
    setElements(elements);
}

export function removeElements(collectionIndex) {
    const elements = getElements();
    elements.splice(collectionIndex, 1);
    setElements(elements);
}

export function renameElement(collectionIndex, index, name) {
    const elements = getElements();
    elements[collectionIndex][index].name = name;
    setElements(elements);
}

export function getElementName(collectionIndex, index) {
    const elements = getElements();    
    return elements[collectionIndex][index].name;
}

export function removeElement(collectionIndex, index) {
    const elements = getElements();
    elements[collectionIndex].splice(index, 1);
    setElements(elements);
}

export function moveElement(from, index, to) {
    const elements = getElements();
    elements[from].splice(index, 1);
    elements[to].push({"name":getElementName(from, index)});
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

function setElements(elements) {
    const sendJSON = JSON.stringify(elements);
    localStorage.setItem('elements', sendJSON);
}
