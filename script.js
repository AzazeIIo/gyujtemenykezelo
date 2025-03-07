import * as elements from "./elements.js";
import * as collections from "./collections.js";

const newBtn = document.getElementById("newBtn");
const newCollection = document.getElementById("newCollection");
let activeCollection;

window.onload = function() {
    collections.showCollections();
    document.getElementById("collections").onclick = function(e) {
        if(e.target && e.target.nodeName == "LI") {
            if (activeCollection != undefined) {
                activeCollection.classList.toggle("active");
            }
            activeCollection = e.target;
            activeCollection.classList.toggle("active");
            elements.showElements(activeCollection);
        }
    }
    
    document.getElementById("collections").ondblclick = function(e) {
        collections.edit(e.target);
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
        const topicValue = document.getElementById("topic").value;
        const dateValue = document.getElementById("date").value;
        collections.addCollection(titleValue, topicValue, dateValue);
    }
}



