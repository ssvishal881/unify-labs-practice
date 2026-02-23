// ==========================
// LOAD DATA (Simulated Database)
// ==========================

let products = JSON.parse(localStorage.getItem("products")) || [];


// ==========================
// INSERT SAMPLE DATA
// ==========================

function insertSampleData() {

    products = [

        {
            name: "Laptop",
            category: "Electronics",
            price: 1000,
            stock: 5,
            featured: false,
            tags: ["tech"]
        },

        {
            name: "Phone",
            category: "Electronics",
            price: 600,
            stock: 0,
            featured: false,
            tags: ["mobile"]
        },

        {
            name: "Shirt",
            category: "Clothing",
            price: 400,
            stock: 10,
            featured: false,
            tags: ["fashion"]
        },

        {
            name: "Sofa",
            category: "Furniture",
            price: 800,
            stock: 2,
            featured: false,
            tags: ["home"]
        }

    ];

    saveData();

    alert("Sample products inserted!");

    showAllProducts();
}


// ==========================
// SAVE DATA
// ==========================

function saveData() {

    localStorage.setItem("products", JSON.stringify(products));
}


// ==========================
// DISPLAY PRODUCTS
// ==========================

function showAllProducts() {

    const list = document.getElementById("productList");

    list.innerHTML = "";

    products.forEach(product => {

        const div = document.createElement("div");

        div.className = "product";

        if(product.featured)
            div.classList.add("featured");

        div.innerHTML = `
            <strong>${product.name}</strong><br>
            Category: ${product.category}<br>
            Price: ${product.price}<br>
            Stock: ${product.stock}<br>
            Featured: ${product.featured}
        `;

        list.appendChild(div);
    });
}


// ==========================
// MASS UPDATE ($inc)
// Increase Electronics Price +10
// ==========================

function increaseElectronicsPrice() {

    products.forEach(product => {

        if(product.category === "Electronics") {

            product.price += 10; // simulate $inc
        }
    });

    saveData();

    alert("Electronics price increased!");

    showAllProducts();
}


// ==========================
// MASS UPDATE ($set)
// Set featured true if price > 500
// ==========================

function setFeaturedProducts() {

    products.forEach(product => {

        if(product.price > 500) {

            product.featured = true; // simulate $set
        }
    });

    saveData();

    alert("Featured products updated!");

    showAllProducts();
}


// ==========================
// DELETE DOCUMENTS
// Delete stock = 0
// ==========================

function deleteZeroStock() {

    products = products.filter(product =>
        product.stock !== 0
    );

    saveData();

    alert("Zero stock products deleted!");

    showAllProducts();
}


// ==========================
// COUNT DOCUMENTS
// ==========================

function showCount() {

    const count = products.length;

    document.getElementById("countDisplay")
        .innerText = "Total Products: " + count;
}


// ==========================
// AUTO LOAD ON START
// ==========================

showAllProducts();
showCount();