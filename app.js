const API_URL = "http://localhost:8080/products";
const ORDER_URL = "http://localhost:8080/orders";


/* ===============================
   LOAD PRODUCTS
================================ */
async function loadProducts() {
    try {
        const res = await fetch(API_URL);
        const products = await res.json();

        const container = document.getElementById("productContainer");
        container.innerHTML = "";

        products.forEach(p => {

            const card = `
                <div class="card">
                    <img src="${p.imageUrl || 'https://via.placeholder.com/200'}" />
                    <h3>${p.name}</h3>
                    <div class="price">₹ ${p.price}</div>

                    <button class="buy"
                        onclick="buyProduct(${p.pid})">
                        Buy Now
                    </button>
                </div>
            `;

            container.innerHTML += card;
        });

    } catch (err) {
        console.error("Load products error:", err);
        alert("Failed to load products");
    }
}


/* ===============================
   PLACE ORDER
================================ */
async function buyProduct(productId) {

    console.log("Sending productId:", productId); // debug

    try {
        const res = await fetch(ORDER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pId: productId,
                quantity: 1
            })
        });

        const msg = await res.text();

        alert(msg);

        // reload products after order (optional)
        loadProducts();

    } catch (err) {
        console.error(err);
        alert("Order failed");
    }
}


/* ===============================
   SEARCH
================================ */
function searchProduct() {
    const keyword = document.getElementById("searchInput").value;
    alert("Search: " + keyword);
}


/* ===============================
   START APP
================================ */
loadProducts();
