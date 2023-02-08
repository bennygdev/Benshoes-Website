let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Converse Chuck 70',
        tag: 'conversechuck70',
        color: 'Black colour',
        price: 64,
        inCart: 0
    },
    {
        name: 'Vans Classic Slip On',
        tag: 'vansclassicslipon',
        color: 'Checkerboard style',
        price: 40,
        inCart: 0
    },
    {
        name: 'Vans Fuzzy Lace Style',
        tag: 'vansfuzzylacestyle',
        color: 'Purple colour',
        price: 50,  
        inCart: 0
    },
    {
        name: 'Vans Old Skool',
        tag: 'vansoldskool',
        color: 'Black colour',
        price: 89,
        inCart: 0
    },
    {
        name: 'Warrior Shoes Black',
        tag: 'warriorschoolshoes',
        color: 'Black colour',
        price: 29,
        inCart: 0
    },
    {
        name: 'Adidas Stan Smith',
        tag: 'stansmithadidas',
        color: 'Cloud Green colour',
        price: 150,
        inCart: 0
    },
    {
        name: 'Nike Air Max',
        tag: 'nikeairmax',
        color: 'Black and White colour',
        price: 225,
        inCart: 0
    },
    {
        name: 'Adidas Ultraboost',
        tag: 'adidasultraboost',
        color: 'Black colour',
        price: 109,
        inCart: 0
    },
    {
        name: 'Nike Air Jordan',
        tag: 'nikeairjordan',
        color: 'Black and White colour',
        price: 150,
        inCart: 0
    },
    {
        name: 'Nike Dunk Low',
        tag: 'nikedunklow',
        color: 'Black and White colour',
        price: 99,
        inCart: 0
    },
    {
        name: 'Adidas Ultra 4DFWD',
        tag: 'adidasultra4dfwd',
        color: 'Black colour',
        price: 199,
        inCart: 0
    },
    {
        name: 'Nike Zoom Alphafly',
        tag: 'nikezoomalphafly',
        color: 'Mint Foam',
        price: 199,
        inCart: 0
    },

];

// loop through carts from 0 to length of carts and assign specific values for each btn
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

// Load amount of items in cart on navbar
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.numberofitems').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.numberofitems').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.numberofitems').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// Get totalcost of product
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

// Display the cart in cart page 
function displayCart() {
    let productContainer = document.querySelector('.cartsection');
    let cartItems = localStorage.getItem('productsInCart');
    let cartCost = localStorage.getItem('totalCost')
    cartItems = JSON.parse(cartItems);
  
    let productInCart = '';

    if (cartCost <= 0) {
      cartCost = 0
    }

    if (cartCost <= 0 || !cartItems) {
      productContainer.innerHTML = `<h3 class="text-center">No products here. <a href="products.html">Add something?</a></h3>`;
      return;
    }

    for(let i in cartItems) {
      productInCart += `
      <div class="productcart p-3 my-3">
      <ion-icon class="delete" name="close-circle"></ion-icon>
      <img src="./assets/cart/${cartItems[i].tag}.png" />
        <div class="col-md-3 col-lg-3 col-xl-3 titlecolor">
            <p class="lead fw-normal mb-2"><span>${cartItems[i].name}</span></p>
            <p><span class="text-muted">Color: ${cartItems[i].color}</span></p>
        </div>
        <div class="cartproductprice">
            <span>Original Price: </span>
            <div class="price sm-hide cartproductprice">$${cartItems[i].price}.00</div>
        </div>
        <div class="quantity">
            <span class="lead">Quantity: </span>
            <ion-icon class="decrease " name="remove-circle-outline"></ion-icon>
            <span>${cartItems[i].inCart}</span>
            <ion-icon class="increase" name="add-circle-outline"></ion-icon>   
            <div class="total">Total Price: $${cartItems[i].inCart * cartItems[i].price}.00
          </div>
        </div>
      </div>
      `;
    }
    productContainer.innerHTML = productInCart;

    productContainer.innerHTML += `
        <div class="card">
        <div class="card-body">
            <h2 class="text-center mb-5">Summary</h2>
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="shoesnote"><h5>NOTE</h5></label>
                        <textarea class="form-control" id="shoesnote" rows="5"></textarea>
                    </div>
                </div>
                <div class="col-lg-6 text-right">
                    <h5 class="basketTotalTitle">
                        Basket Total <span class="float-end">$${parseInt(cartCost)}.00</span>
                    </h5>
                    <p class="float-right">Shipping is calculated at checkout. All orders are processed in SGD (Singapore Dollar).</p>
                      <button type="button" class="btn btn-dark btn-block btn-lg w-100 mt-5">Checkout</button>
                </div>
            </div>
        </div>
      </div>`

    // Delete functionality   
    productContainer.addEventListener("click", function(event) {
      if (event.target.classList.contains("delete")) {
        let productName = event.target.parentElement.getElementsByClassName("titlecolor")[0].children[0].textContent.toLowerCase().replace(/ /g, '');
        let products = JSON.parse(localStorage.getItem('productsInCart'));
        let newCost = localStorage.getItem('totalCost');
        let cartNumbers = localStorage.getItem('cartNumbers');
        for (let i in products) {
          if (products[i].name.toLowerCase().replace(/ /g, '') === productName) {
            newCost -= products[i].price * products[i].inCart;
            cartNumbers -= products[i].inCart;
            products.splice(i, 1);
            break;
          }
        }
        localStorage.setItem("productsInCart", JSON.stringify(products));
        localStorage.setItem("totalCost", newCost);
        localStorage.setItem("cartNumbers", cartNumbers);
        onLoadCartNumbers();
        displayCart();
      }
    });
    
}

// Initalise cartproducts variables for adding and subtracting
let cartProducts = [];
let cartItems = localStorage.getItem('productsInCart');
cartItems = JSON.parse(cartItems);

for (let i in cartItems) {
  cartProducts.push(cartItems[i]);
}

// Event listeners for add and minus quantities for respective items
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("increase")) {
    let productContainer = e.target.parentElement.parentElement;
    let productName = productContainer.querySelector(".titlecolor span").textContent;
    let productQuantity = parseInt(productContainer.querySelector(".quantity span:nth-child(3)").textContent);
    let totalCost = parseFloat(localStorage.getItem("totalCost"));
    let cartNumbers = parseInt(localStorage.getItem("cartNumbers"));
    for (let i in cartProducts) {
      if (cartProducts[i].name === productName) {
      cartProducts[i].inCart += 1;
      productQuantity = cartProducts[i].inCart;
      totalCost += cartProducts[i].price;
      cartNumbers += 1;
      break;
    }
    displayCart();
    onLoadCartNumbers();
  }
  productContainer.querySelector(".quantity span:nth-child(3)").textContent = productQuantity;
  localStorage.setItem("productsInCart", JSON.stringify(cartProducts));
  localStorage.setItem("totalCost", totalCost.toFixed(2));
  localStorage.setItem("cartNumbers", cartNumbers);
  displayCart();
  } 
  else if (e.target.classList.contains("decrease")) {
    let productContainer = e.target.parentElement.parentElement;
    let productName = productContainer.querySelector(".titlecolor span").textContent;
    let productQuantity = parseInt(productContainer.querySelector(".quantity span:nth-child(3)").textContent);
    let totalCost = parseFloat(localStorage.getItem("totalCost"));
    let cartNumbers = parseInt(localStorage.getItem("cartNumbers"));
    for (let i in cartProducts) {
      if (cartProducts[i].name === productName) {
        if (cartProducts[i].inCart > 1) {
          cartProducts[i].inCart -= 1;
          productQuantity = cartProducts[i].inCart;
          totalCost -= cartProducts[i].price;
          cartNumbers -= 1;
        }
        break;
      }
    }
    productContainer.querySelector(".quantity span:nth-child(3)").textContent = productQuantity;
    localStorage.setItem("productsInCart", JSON.stringify(cartProducts));
    localStorage.setItem("totalCost", totalCost.toFixed(2));
    localStorage.setItem("cartNumbers", cartNumbers);
    displayCart();
    onLoadCartNumbers();
  }
});

onLoadCartNumbers();
displayCart();  
