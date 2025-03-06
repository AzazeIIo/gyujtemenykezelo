const newBtn = document.getElementById("newBtn");
const newCollection = document.getElementById("newCollection");

newBtn.onclick = function() {
    const title = '<label for="title">Cím: </label><input type="text" id="title" name="title" required><br>';
    const topic = '<label for="topic">Témakör: </label><input type="text" id="topic" name="topic" required><br>';
    const date = '<label for="date">Dátum: </label><input type="date" id="date" name="date" required><br>';
    const confirm = '<button class="btn btn-default" type="submit" id="submit" name="submit">Létrehozás</button>';
    newCollection.innerHTML = title + topic + date + confirm;
}
