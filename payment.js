// Payment page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializePaymentPage();
});

function initializePaymentPage() {
    displayInvoice();
    updateCartCount();
}

function displayInvoice() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const invoiceDisplay = document.getElementById('invoiceDisplay');
    
    if (cart.length === 0) {
        invoiceDisplay.innerHTML = '<p class="no-items">No items in cart. Please add items to your cart first.</p>';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const invoiceNumber = generateInvoiceNumber();
    const currentDate = new Date().toLocaleDateString('en-NG');
    
    const invoiceHTML = `
        <div class="invoice">
            <div class="invoice-header">
                <div class="store-logo">5k Store</div>
                <div class="invoice-title">INVOICE</div>
                <div class="invoice-date">Date: ${currentDate}</div>
                <div class="invoice-number">Invoice #: ${invoiceNumber}</div>
            </div>
            
            <table class="items-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map(item => {
                        const itemTotal = item.price * item.quantity;
                        return `
                            <tr>
                                <td class="item-name">${item.name}</td>
                                <td class="item-price">₦${item.price.toLocaleString()}</td>
                                <td>${item.quantity}</td>
                                <td class="item-total">₦${itemTotal.toLocaleString()}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
            
            <div class="total-section">
                <div class="total-row">
                    <strong>Subtotal:</strong> ₦${total.toLocaleString()}
                </div>
                <div class="total-row">
                    <strong>Tax (0%):</strong> ₦0.00
                </div>
                <div class="total-row">
                    <strong>Shipping:</strong> ₦0.00
                </div>
                <div class="grand-total">
                    <strong>Total:</strong> ₦${total.toLocaleString()}
                </div>
            </div>
            
            <div class="footer">
                <p>Thank you for shopping with 5k Store!</p>
                <p>Please use invoice number <strong>${invoiceNumber}</strong> as payment reference.</p>
                <p>This is a computer-generated invoice. No signature required.</p>
            </div>
        </div>
    `;
    
    invoiceDisplay.innerHTML = invoiceHTML;
    localStorage.setItem('currentInvoiceNumber', invoiceNumber);
}

function generateInvoiceNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `INV-${timestamp}-${random}`;
}

function copyAccountNumber() {
    const accountNumber = document.querySelector('.account-number').textContent;
    navigator.clipboard.writeText(accountNumber).then(() => {
        showToast('Account number copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy account number', 'error');
    });
}

function downloadInvoice() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showToast('No items to generate invoice for', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const invoiceNumber = localStorage.getItem('currentInvoiceNumber') || generateInvoiceNumber();
    const currentDate = new Date().toLocaleDateString('en-NG');
    
    const invoiceHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>5k Store - Invoice</title>
            <style>
                body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
                .invoice-container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                .invoice-header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #8b5cf6; padding-bottom: 20px; }
                .store-logo { font-size: 2rem; font-weight: bold; color: #8b5cf6; margin-bottom: 10px; }
                .invoice-title { font-size: 1.5rem; color: #333; margin-bottom: 5px; }
                .invoice-date { color: #666; font-size: 0.9rem; }
                .invoice-number { color: #8b5cf6; font-weight: bold; }
                .items-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
                .items-table th { background: #8b5cf6; color: white; padding: 15px; text-align: left; font-weight: 600; }
                .items-table td { padding: 15px; border-bottom: 1px solid #eee; }
                .items-table tr:nth-child(even) { background: #f8f9fa; }
                .item-name { font-weight: 600; color: #333; }
                .item-price { color: #8b5cf6; font-weight: 600; }
                .item-total { color: #22c55e; font-weight: bold; }
                .total-section { margin-top: 30px; text-align: right; }
                .total-row { font-size: 1.1rem; margin: 10px 0; }
                .grand-total { font-size: 1.5rem; font-weight: bold; color: #8b5cf6; border-top: 2px solid #8b5cf6; padding-top: 10px; }
                .footer { margin-top: 40px; text-align: center; color: #666; font-size: 0.9rem; border-top: 1px solid #eee; padding-top: 20px; }
                @media print { body { background: white; } .invoice-container { box-shadow: none; } }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <div class="invoice-header">
                    <div class="store-logo">5k Store</div>
                    <div class="invoice-title">INVOICE</div>
                    <div class="invoice-date">Date: ${currentDate}</div>
                    <div class="invoice-number">Invoice #: ${invoiceNumber}</div>
                </div>
                
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cart.map(item => {
                            const itemTotal = item.price * item.quantity;
                            return `
                                <tr>
                                    <td class="item-name">${item.name}</td>
                                    <td class="item-price">₦${item.price.toLocaleString()}</td>
                                    <td>${item.quantity}</td>
                                    <td class="item-total">₦${itemTotal.toLocaleString()}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
                
                <div class="total-section">
                    <div class="total-row">
                        <strong>Subtotal:</strong> ₦${total.toLocaleString()}
                    </div>
                    <div class="total-row">
                        <strong>Tax (0%):</strong> ₦0.00
                    </div>
                    <div class="total-row">
                        <strong>Shipping:</strong> ₦0.00
                    </div>
                    <div class="grand-total">
                        <strong>Total:</strong> ₦${total.toLocaleString()}
                    </div>
                </div>
                
                <div class="footer">
                    <p>Thank you for shopping with 5k Store!</p>
                    <p>Please use invoice number <strong>${invoiceNumber}</strong> as payment reference.</p>
                    <p>Bank: First Bank of Nigeria | Account: 1234567890 | Name: 5K STORE ENTERPRISES</p>
                    <p>This is a computer-generated invoice. No signature required.</p>
                </div>
            </div>
        </body>
        </html>
    `;
    
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Invoice downloaded successfully!', 'success');
}

function confirmPayment() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const invoiceNumber = localStorage.getItem('currentInvoiceNumber') || 'N/A';
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cart.length === 0) {
        showToast('No items in cart to confirm payment for', 'error');
        return;
    }
    
    const message = `Hello! I have successfully made payment for my order.

📋 Invoice Number: ${invoiceNumber}
💰 Total Amount: ₦${total.toLocaleString()}

📦 Order Items:
${cart.map(item => `• ${item.name} (Qty: ${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}`).join('\n')}

✅ Payment Status: COMPLETED
🏦 Bank: First Bank of Nigeria

📄 INVOICE INSTRUCTIONS:
• I have downloaded/printed the invoice for my records
• Used the invoice number as payment reference
• Keeping the invoice as proof of order
• Please confirm receipt and process my order

Thank you! 🙏`;

    const whatsappNumber = '2347075167930';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    showToast('Redirecting to WhatsApp for payment confirmation...', 'success');
    
    setTimeout(() => {
        localStorage.removeItem('cart');
        updateCartCount();
    }, 2000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        if (cart.length > 0) {
            element.textContent = cart.length;
            element.style.display = 'inline';
        } else {
            element.style.display = 'none';
        }
    });
} 