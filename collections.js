import * as elements from "./elements.js";

export function addCollection(title, topic, date) {
    let collections = getCollections();
    collections.push({title, topic, date});
    setCollections(collections);
    elements.newElements();
}

export function removeCollection(index) {
    let collections = getCollections();
    collections.splice(index, 1);
    setCollections(collections);
    elements.removeElements(index);
}

export function renameCollection(index, title) {
    let collections = getCollections();
    collections[index].title = title;
    setCollections(collections);
}

export function getCollectionTitle(index) {
    let collections = getCollections();
    return collections[index].title;
}

export function getCollections() {
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
