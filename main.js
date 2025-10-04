const openmenu = document.querySelector(".humbarger");
const mobile_menu = document.querySelector(".mobile-menu");
const opencart = document.querySelector(".cart-icon");
const closecart = document.querySelector(".close-btn");
const cartitem = document.querySelector(".cart-tab");
const cardlist = document.querySelector(".card-list");
const cartlist = document.querySelector(".hazem");
const carttotal = document.querySelector(".cart-total");
const cartvalue = document.querySelector(".cart-value");
const closebtn = document.querySelector(".close-btn");

 // القائمة الجانبية للموبايل
openmenu.addEventListener("click", function () {
  mobile_menu.classList.add("active"); 
});
document.addEventListener("click", function (e) {
  if (mobile_menu.classList.contains("active")) {
    if (!mobile_menu.contains(e.target) && !openmenu.contains(e.target)) {
      mobile_menu.classList.remove("active");
    }
  }
});

var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#prev",
    prevEl: "#next",
  },
});
opencart.addEventListener("click", function (a) {
  a.preventDefault();
  cartitem.classList.add("cart-page-active");
});
closebtn.addEventListener("click", function (a) {
  a.preventDefault();
  cartitem.classList.remove("cart-page-active");
});

const showproduct = () => {
  productslist.forEach((product) => {
    const ordercard = document.createElement("div");
    ordercard.classList.add("order-card");
    ordercard.innerHTML = `
        <div class="card-image">
                <img src="${product.image}" alt="">
              </div>
              <h4>'${product.name}'</h4>
              <h4 class="price">${product.price}</h4>
              <a href="#" class="btn ">Add to cart</a>
        `;
    const cardbtn = ordercard.querySelector(".btn");
    cardbtn.addEventListener("click", function (a) {
      a.preventDefault();
      addtocart(product);
    });
    cardlist.appendChild(ordercard);
    uptotals();
  });
};
let cartproduct = [];

const addtocart = (product) => {
  let quantity = 1;
  const existing = cartproduct.find((m) => m.id === product.id);

  if (existing) {
    alert("هذا المنتج موجود بالفعل في السلة!");
    return;
  }

  cartproduct.push(product);
  let price = parseFloat(product.price.replace("$", ""));
  const carditem = document.createElement("div");
  carditem.classList.add("item");
  carditem.innerHTML = `
     <div class="item-image">
                    <img src="${product.image}" alt="">
                </div>
                <div>
                  <h4>${product.name}</h4>
                  <h4 class="item-total">${product.price}</h4>
                </div>
                <div class="flex deat">
                  <a href="#" class="quantity-btn min">-</a>
                  <h4 class="quantity-value">${quantity}</h4>
                  <a href="#" class="quantity-btn plus">+</a>
                </div>
                
    `;
  const plus = carditem.querySelector(".plus");

  const min = carditem.querySelector(".min");
  const itemtotal = carditem.querySelector(".item-total");
  const quantityvalue = carditem.querySelector(".quantity-value");

  plus.addEventListener("click", function (a) {
    a.preventDefault();
    quantity++;
    quantityvalue.textContent = quantity;
    itemtotal.textContent = `$${(price * quantity).toFixed(2)}`;
    uptotals();
  });
  min.addEventListener("click", function (a) {
    if (quantity > 1) {
      a.preventDefault();
      quantity--;
      quantityvalue.textContent = quantity;
      itemtotal.textContent = `$${(price * quantity).toFixed(2)}`;
      uptotals();
    } else {
        carditem.remove();
        cartproduct = cartproduct.filter((item) => item.id !== product .id);
      a.preventDefault();
      uptotals();
    }
  });
  cartlist.appendChild(carditem);
  uptotals();
};

const uptotals = () => {
  let totalquantity = 0;
  let totalprice = 0;

  document.querySelectorAll(".item").forEach((item) => {
    const quantity = parseInt(
      item.querySelector(".quantity-value").textContent
    );
    const pricetext = item
      .querySelector(".item-total")
      .textContent.replace("$", "");
    const price = parseFloat(pricetext);
    totalprice += price;
    totalquantity += quantity;
  });
  carttotal.textContent = `$${totalprice.toFixed(2)}`;
  cartvalue.textContent = totalquantity;
};

let productslist = [];
const initapp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productslist = data;
      showproduct();
    });
};
initapp();


document.addEventListener("click", function (e) {
  const target = e.target;

  // إذا كان العنصر <a> و href="#"
  if (target.tagName === "A" && target.getAttribute("href") === "#") {
    e.preventDefault();
  }
});