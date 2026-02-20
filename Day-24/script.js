// ==========================
// PRODUCT DATABASE (localStorage simulation)
// ==========================

let products = JSON.parse(localStorage.getItem("products")) || [];


// ==========================
// BULK INSERT PRODUCTS
// ==========================
function insertProducts() {

    products = [

        {
            name: "Laptop",
            category: "Electronics",
            price: 75000,
            stock: 10
        },

        {
            name: "Mobile Phone",
            category: "Electronics",
            price: 30000,
            stock: 25
        },

        {
            name: "Headphones",
            category: "Electronics",
            price: 5000,
            stock: 50
        },

        {
            name: "T-Shirt",
            category: "Clothing",
            price: 800,
            stock: 100
        },

        {
            name: "Jeans",
            category: "Clothing",
            price: 2000,
            stock: 60
        },

        {
            name: "Sofa",
            category: "Furniture",
            price: 25000,
            stock: 5
        },

        {
            name: "Chair",
            category: "Furniture",
            price: 4000,
            stock: 20
        }

    ];

    localStorage.setItem("products", JSON.stringify(products));

    alert("Products inserted successfully!");

}


// ==========================
// QUERY: FIND ELECTRONICS
// ==========================
function showElectronics() {

    const electronics = products.filter(product =>
        product.category === "Electronics"
    );

    displayProducts(electronics);

}


// ==========================
// QUERY: SORT BY PRICE DESC LIMIT 2
// ==========================
function showTop2Expensive() {

    const sorted = [...products]
        .sort((a, b) => b.price - a.price)
        .slice(0, 2);

    displayProducts(sorted);

}


// ==========================
// DISPLAY PRODUCTS
// ==========================
function displayProducts(list) {

    const output = document.getElementById("output");

    output.innerHTML = "";

    list.forEach(product => {

        const div = document.createElement("div");

        div.className = "product";

        div.innerHTML = `
            <strong>Name:</strong> ${product.name}<br>
            <strong>Category:</strong> ${product.category}<br>
            <strong>Price:</strong> ₹${product.price}<br>
            <strong>Stock:</strong> ${product.stock}
        `;

        output.appendChild(div);

    });

}