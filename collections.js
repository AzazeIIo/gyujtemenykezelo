import * as elements from "./elements.js";

export function showCollections() {
    const collections = getCollections();
    const collectionList = document.getElementById("collections");
    collectionList.innerHTML = "";

    collections.forEach((collection, index) => {
        collectionList.insertAdjacentHTML("beforeEnd",
            `<li id="${index}" class="list-group-item list-group-item-action dropdown">
                ${collection.title}
                <img class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src="images/gear.png" alt="Szerkesztés" id="${index}edit" style="float:right">
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Átnevezés</a></li>
                    <li><a class="dropdown-item" href="#">Törlés</a></li>
                </ul>
            </li>`);
    });
}

export function addCollection(title, topic, date) {
    newCollection.innerHTML = "";
    let collections = getCollections();
    collections.push({title, topic, date});
    setCollections(collections);
    elements.newElements();
    showCollections();
}

export function editCollectionTitle(index, title) {
    let collections = getCollections();
    collections[index].title = title;
    setCollections(collections);
    showCollections();
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
