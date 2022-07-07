//  ELEMENTS ANGREIFEN
const input = document.querySelector('input[name="myText"]');
const right = document.querySelector('.right');
const topinput = document.querySelector('.topinput');

//selectContinent = document.querySelector('select[name="continents"]');
//selectContinent.addEventListener('change', handleSelect);


const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".summe");
const itemsInCartEl = document.querySelector(".items-in-cart");

const porductsListEl = document.querySelector(".products-list");
const plusBtn = document.querySelector(".plus-btn");

plusBtn.addEventListener("click", () => {
porductsListEl.scrollIntoView({ behavior: "smooth" });
});

// INPUT
//const handleSelect = evt => {
 // right.innerHTML = evt.target.value
//}
const handleInput = evt => {
  right.innerHTML = evt.target.value
};
input.addEventListener('change', handleInput);

// RENDERING DES PRODUCTES
function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                   <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                   </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h4>€${product. preis}</h4>
                    </div>
                  <div class="plus" onclick="addToCart(${product.id})">
                      <img src="./icons/bag-plus.svg" alt="plus">
                  </div>
                </div>
            </div>
        `;
  });
}
renderProdcuts();


 // CART ARRAY
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
  // CHEK OB PRODUCTE IN DER KARET EXISTIERT
  if (cart.some((item) => item.id == id)) {
    changeNumber("plus", id);
  } else {
    const item = products.find((product) => product.id == id);

    cart.push({...item, numberOfUnits: 1});
  }

  updateCart();
}

// UPDATE CARTE
function updateCart() {
  renderCartItems();
  renderSumme();

  // SPEICHERN IN LOCAL-STORAGE
  localStorage.setItem("CART", JSON.stringify(cart));
}

// RECHNEN UND RENDER DES GESAMMTSUMME
function renderSumme() {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((el) => {
    totalPrice += el.preis * el.numberOfUnits;
    totalItems += el.numberOfUnits;
  });
  totalPrice = totalPrice.toFixed(2);
  subtotalEl.innerHTML = `Gesamtsumme (${totalItems} Items): €${totalPrice}`;
  itemsInCartEl.innerHTML = totalItems;
}

// RENDER DES CART-ITEMS
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // delet cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="remove(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>€</small>${item.preis}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumber('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumber('plus', ${item.id})">+</div>           
            </div>
        </div>
      `;
  });
}

//REMOVE ITEM VON DER KARTE
function remove(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// ÄNDERUNG DES ANZAHL DES ITEMS 
function changeNumber(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id == id) {
      if (action == "minus" && numberOfUnits > 1) {
         numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.aufLager) {
        numberOfUnits++;
      }
    }
    return {...item, numberOfUnits:numberOfUnits};
  });

  updateCart();
}
//handleSelect()
handleInput();
