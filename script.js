const newBtn = document.getElementById("newBtn");
const newCollection = document.getElementById("newCollection");

window.onload = function() {
    showCollections();
}

newBtn.onclick = function() {
    const title = '<label for="title">Cím: </label><input type="text" id="title" name="title" required><br>';
    const topic = '<label for="topic">Témakör: </label><input type="text" id="topic" name="topic" required><br>';
    const date = '<label for="date">Dátum: </label><input type="date" id="date" name="date" required><br>';
    const confirm = '<button class="btn btn-default" type="submit" id="confirm" name="confirm">Létrehozás</button>';
    newCollection.innerHTML = title + topic + date + confirm;
    const submitBtn = document.getElementById("confirm");
    submitBtn.onclick = function() {
        const titleValue = document.getElementById("title").value;
        const collections = getCollections();
        newCollection.innerHTML = "";
        collections.push(titleValue);
        setCollections(collections);
        showCollections();
    }
}

function showCollections() {
    const collections = getCollections();
    const collectionList = document.getElementById("collections");
    collectionList.innerHTML = "";
    collections.forEach(collection => {
        collectionList.insertAdjacentHTML("beforeEnd", `<li class="list-group-item">${collection}</li>`);
    });
}

function getCollections() {
    const getJSON = localStorage.getItem('collections');
    if (getJSON){
        let collections = JSON.parse(getJSON);
        if (collections == undefined) {
            collections = [];
        }
        return collections;
    }
}

function setCollections(collections) {
    const sendJSON = JSON.stringify(collections);
    localStorage.setItem('collections', sendJSON);    
}
