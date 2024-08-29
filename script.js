// Script for navigation bar

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}


if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}

document.addEventListener('DOMContentLoaded', () => {
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const product = button.closest('.pro');
            const productId = product.getAttribute('data-id');
            const productName = product.getAttribute('data-name');
            const productPrice = product.getAttribute('data-price');
            const productImage = product.querySelector('img').src;

            addItemToCart({ id: productId, name: productName, price: productPrice, image: productImage });
            window.location.href = 'cart.html';
        });
    });

    // Load cart items
    loadCartItems();

    // Remove from cart functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const productId = e.target.closest('tr').getAttribute('data-id');
            removeItemFromCart(productId);
            e.target.closest('tr').remove();
        }
    });
});

function addItemToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    cart.forEach(item => {
        const cartItem = document.createElement('tr');
        cartItem.setAttribute('data-id', item.id);
        cartItem.innerHTML = `
            <td><i class="far fa-times-circle remove-item"></i></td>
            <td><img src="${item.image}" alt=""></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td><input type="number" value="1"></td>
            <td>$${item.price}</td>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

function removeItemFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}