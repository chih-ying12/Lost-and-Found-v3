const API = "http://localhost:3000";

// LOGIN
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(API + "/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        window.location.href = "home.html";
    } else {
        alert("Login failed");
    }
}

// NAVIGATION
function goLost() {
    window.location.href = "lost.html";
}

function goFound() {
    window.location.href = "found.html";
}

function logout() {
    window.location.href = "index.html";
}

// POST FOUND ITEM
async function postItem() {
    const item = {
        id: Date.now(),
        type: document.getElementById("type").value,
        color: document.getElementById("color").value,
        model: document.getElementById("model").value,
        location: document.getElementById("location").value,
        verification: document.getElementById("verification").value
    };

    await fetch(API + "/found", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });

    alert("Item posted!");
}

// SEARCH ITEMS
async function searchItems() {
    const query = document.getElementById("search").value.toLowerCase();

    const res = await fetch(API + "/items");
    const items = await res.json();

    const filtered = items.filter(i =>
        i.color.toLowerCase().includes(query) ||
        i.model.toLowerCase().includes(query)
    );

    let html = "";

    filtered.forEach(i => {
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
async function verify(id) {
    const answer = prompt("Enter verification answer:");

    const res = await fetch(API + "/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, answer })
    });

    const data = await res.json();

    if (data.success) {
        alert("Item claimed successfully!");
    } else {
        alert("Wrong verification!");
    }
}
