// LOAD DATA
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function getItems() {
    return JSON.parse(localStorage.getItem("items")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function saveItems(items) {
    localStorage.setItem("items", JSON.stringify(items));
}

// LOGIN / SIGNUP
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = getUsers();
    let user = users.find(u => u.username === username);

    if (!user) {
        users.push({ username, password });
        saveUsers(users);
        alert("Account created!");
    } else if (user.password !== password) {
        alert("Wrong password!");
        return;
    }

    localStorage.setItem("currentUser", username);
    window.location.href = "home.html";
}

// NAVIGATION
function goLost() {
    window.location.href = "lost.html";
}

function goFound() {
    window.location.href = "found.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// POST FOUND ITEM
function postItem() {
    let items = getItems();

    let item = {
        id: Date.now(),
        type: document.getElementById("type").value,
        color: document.getElementById("color").value,
        model: document.getElementById("model").value,
        location: document.getElementById("location").value,
        verification: document.getElementById("verification").value
    };

    items.push(item);
    saveItems(items);

    alert("Item posted!");
}

// SEARCH
function searchItems() {
    let query = document.getElementById("search").value.toLowerCase();
    let items = getItems();

    let results = items.filter(i =>
        i.color.toLowerCase().includes(query) ||
        i.model.toLowerCase().includes(query)
    );

    let html = "";

    results.forEach(i => {
        html += `
        <div class="card">
            <p>${i.type} - ${i.color} - ${i.model}</p>
            <button onclick="verify(${i.id})">Verify</button>
        </div>
        `;
    });

    document.getElementById("results").innerHTML = html;
}

// VERIFY
function verify(id) {
    let answer = prompt("Enter verification answer:");
    let items = getItems();

    let item = items.find(i => i.id === id);

    if (item && item.verification === answer) {
        alert("Item claimed successfully!");
    } else {
        alert("Wrong answer!");
    }
}
