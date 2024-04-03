document.addEventListener('DOMContentLoaded', function() {
    const userDisplay = document.getElementById('userDisplay');
    const addCartButtons = document.querySelectorAll('.card-btn .btn-add a');
    let cartItemCount = 0;

    const storage = JSON.parse(localStorage.getItem('user'));
    if (storage) {
        userDisplay.textContent = storage.username;
    } else {
        userDisplay.textContent = 'Login / Register';
    }

    
    window.addEventListener('load', function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemCount = cart.length; 
        document.getElementById('quantityNumber').textContent = cartItemCount; 
    });

    addCartButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            const product = e.target.closest('.card-product');
            const productNameElement = product.querySelector('.product-if .product-name');
            const productName = productNameElement ? productNameElement.textContent : 'Unknown Product';

            const productInfo = {
                id: 'product' + cartItemCount,
                name: productName,
                price: product.querySelector('.product-price').lastChild.textContent.trim(),
                image: product.querySelector('.product-img img').src
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let exists = false;

            cart.forEach(function(item) {
                if (item.id === productInfo.id) {
                    exists = true;
                    item.quantity++;
                }
            });

            if (!exists) {
                productInfo.quantity = 1;
                cart.push(productInfo);
                cartItemCount++;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            document.getElementById('quantityNumber').textContent = cartItemCount;
            
            alert('Product added to cart!');
        });
    });
});
