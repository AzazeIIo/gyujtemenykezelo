import * as elements from "./elements.js";

export function addCollection(title, topic, date, file) {
    const collections = getCollections();
    collections.push({title, topic, date, file});
    setCollections(collections);
    elements.newElements();
}

export function removeCollection(index) {
    const collections = getCollections();
    collections.splice(index, 1);
    setCollections(collections);
    elements.removeElements(index);
}

export function renameCollection(index, title) {
    const collections = getCollections();
    collections[index].title = title;
    setCollections(collections);
}

export function getCollectionTitle(index) {
    const collections = getCollections();
    return collections[index].title;
}

export function getCollectionTopic(index) {
    const collections = getCollections();
    return collections[index].topic;
}

export function getCollectionDate(index) {
    const collections = getCollections();
    return collections[index].date;
}

export function getCollections() {
    const getJSON = localStorage.getItem('collections');
    if (getJSON){
        const collections = JSON.parse(getJSON);
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
