import * as elements from "./elements.js";

export function showCollections() {
    const collections = getCollections();
    const collectionList = document.getElementById("collections");
    collectionList.innerHTML = "";

    collections.forEach((collection, index) => {
        collectionList.insertAdjacentHTML("beforeEnd",
            `<li id="${index}" class="list-group-item list-group-item-action dropdown">
                ${collection.title}
            </li>`);
    });
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
                            <li><a class="dropdown-item" href="#">Átnevezés</a></li>
                            <li><a class="dropdown-item" href="#">Törlés</a></li>
                        </ul>`);
                }
            }
        },
        'mouseleave':function(e) {
            if(e.target && e.target.nodeName == "LI") {
                document.getElementById("gear").remove();
                document.getElementById("dropdown").remove();
            }
        }
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
