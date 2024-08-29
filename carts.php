<?php
session_start();

// Initialize cart if it doesn't exist
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = array();
}

// Function to calculate subtotal
function calculateSubtotal($cart) {
    $subtotal = 0;
    foreach ($cart as $item) {
        $subtotal += $item['price'] * $item['quantity'];
    }
    return $subtotal;
}

// Example of adding an item to the cart
if (isset($_POST['add_to_cart'])) {
    $product_id = $_POST['product_id'];
    $quantity = intval($_POST['quantity']); // Ensure quantity is an integer

    // Simulate product details for demonstration
    $product = array(
        'id' => $product_id,
        'name' => 'Cartoon Astronaut T-Shirts', // Replace with actual product name
        'price' => 118.19, // Replace with actual product price
        'image' => 'img/products/f1.jpg' // Replace with actual product image URL
    );

    // Add item to cart
    if (isset($_SESSION['cart'][$product_id])) {
        // Update quantity if item already exists in cart
        $_SESSION['cart'][$product_id]['quantity'] += $quantity;
    } else {
        // Add new item to cart
        $_SESSION['cart'][$product_id] = array(
            'id' => $product['id'],
            'name' => $product['name'],
            'price' => $product['price'],
            'quantity' => $quantity,
            'image' => $product['image']
        );
    }

    // Redirect back to the cart page
    header('Location: cart.html');
    exit;
}

// Example of removing an item from the cart
if (isset($_GET['remove_item'])) {
    $product_id = $_GET['remove_item'];
    if (isset($_SESSION['cart'][$product_id])) {
        unset($_SESSION['cart'][$product_id]);
    }

    // Redirect back to the cart page
    header('Location: cart.html');
    exit;
}

// Calculate subtotal for the current cart
$subtotal = calculateSubtotal($_SESSION['cart']);
?>
