
let cart = [];


const products = [
    { id: 1, name: '3.0ML THC-P', price: 60, image: 'img/product-img/product-1.jpg' },
    { id: 2, name: '1.0ML HHC-H', price: 50, image: 'img/product-img/product-2.jpg' },
    { id: 3, name: '3.0 ML HHC-O', price: 50, image: 'img/product-img/product-3.jpg' }
];


function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartList = document.querySelector('.cart-list');
    const totalElementPopup = document.getElementById('cart-total');
    const totalElementPage = document.getElementById('total');

    if (cartList) {
        cartList.innerHTML = '';
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItemHTML = `
            <li>
                <a href="#" class="image"><img src="${item.image}" class="cart-thumb" alt="${item.name}"></a>
                <div class="cart-item-desc">
                    <h6><a href="#">${item.name}</a></h6>
                    <p>${item.quantity}x - <span class="price">$${item.price.toFixed(2)}</span></p>
                </div>
                <span class="dropdown-product-remove" onclick="removeFromCart(${item.id})"><i class="icon-cross"></i></span>
            </li>
        `;

        if (cartList) {
            cartList.innerHTML += cartItemHTML;
        }
    });

    if (totalElementPopup) {
        totalElementPopup.textContent = total.toFixed(2);
    } else {
        console.error('Pop-over cart total element not found');
    }

    if (totalElementPage) {
        totalElementPage.textContent = `Total: $${total.toFixed(2)}`;
    } else {
        console.error('Product page total element not found');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = parseInt(button.getAttribute('data-id'));
        addToCart(productId);
    });
});
