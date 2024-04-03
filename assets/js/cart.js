document.addEventListener('DOMContentLoaded', function() {
    const totalPriceElement = document.getElementById('totalPrice');
    const cartItemsContainer = document.getElementById('cartItems');

    function updateTotalPrice() {
        const totalPrice = calculateTotalPrice();
        totalPriceElement.textContent = totalPrice + '$';
    }

    function calculateTotalPrice() {
        let totalPrice = 0;
        const quantityInputs = document.querySelectorAll('.card-product-quantity');
        const productPrices = document.querySelectorAll('.card-product-price');
        for (let i = 0; i < quantityInputs.length; i++) {
            const quantity = parseInt(quantityInputs[i].value);
            const price = parseFloat(productPrices[i].textContent.replace('$', ''));
            totalPrice += quantity * price;
        }
        return totalPrice.toFixed(2);
    }


    function updateQuantityFromLocalStorage() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(function(item) {
            const tr = document.createElement('tr');
            tr.classList.add('card-product');
    
            tr.innerHTML = `
                <td class="btn-remove"><a href=""><box-icon name='x'></box-icon></a></td>
                <td><img src="${item.image}" alt=""></td>
                <td>${item.name}</td>
                <td class="card-product-price">${item.price}</td>
                <td><input class="card-product-quantity" type="number" value="${item.quantity}"></td>
            `;
    
            cartItemsContainer.appendChild(tr);

            tr.querySelector('.card-product-quantity').addEventListener('input', function() {
                updateTotalPrice();
            });

            tr.querySelector('.btn-remove').addEventListener('click', function(e) {
                e.preventDefault();
                const productName = tr.querySelector('td:nth-child(3)').textContent;
                if (confirm(`Are you sure you want to remove ${productName} from cart?`)) {
                    tr.remove();
                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const index = cart.findIndex(function(item) {
                        return item.id === item.id;
                    });
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateTotalPrice();
                }
            });
        });
        updateTotalPrice();
    }

    window.addEventListener('load', function() {
        updateQuantityFromLocalStorage();
    });
});
