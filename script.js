const newBtn = document.getElementById("newBtn");
const newCollection = document.getElementById("newCollection");
let activeCollection;

window.onload = function() {
    showCollections();
    document.getElementById("collections").onclick = function(e) {
        if(e.target && e.target.nodeName == "LI") {
            if (activeCollection != undefined) {
                activeCollection.classList.toggle("active");
            }
            activeCollection = e.target;
            activeCollection.classList.toggle("active");
        }
    }
    
    document.getElementById("collections").ondblclick = function(e) {
        if(e.target && e.target.nodeName == "LI") {
            let original = e.target.innerHTML;
            let input = document.createElement("input");
            input.value = original;
            input.onkeydown = function(ev){
                if(ev.key === 'Enter') {
                    e.target.innerHTML = input.value;
                    let collections = getCollections();
                    collections[e.target.id] = input.value;                    
                    setCollections(collections);
                }
            }
            /*input.onblur = function(){
                e.target.innerHTML = original;
            }*/
            e.target.innerHTML = "";
            e.target.appendChild(input);
            input.focus();
        }
    }
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
    console.log(collections);

    collections.forEach((collection, index) => {
        collectionList.insertAdjacentHTML("beforeEnd", `<li id="${index}" class="list-group-item list-group-item-action">${collection}</li>`);
    });
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
