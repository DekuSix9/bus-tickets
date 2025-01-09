
function ScrollView() {
    const ticketbuy = document.getElementById('ticket-buy');
    ticketbuy.scrollIntoView({ behavior: 'smooth' });
}

const seatContainer = document.querySelector('.grid');
let selectedCount = 0;
let seatsLeft = 40;  
let totalPrice = 0;  

const seatDetails = {
    class: "Economy",  
    price: 550,  
};

seatContainer.addEventListener('click', function (event) {
    const seatLeft = document.getElementById('seat-left');  
    const seatTableBody = document.querySelector('tbody');  
    const totalPriceElement = document.getElementById('total-price');  

    if (event.target.tagName === 'BUTTON') {
        const seatName = event.target.textContent;  

        if (event.target.classList.contains('bg-blue-500')) {
            event.target.classList.remove('bg-blue-500');
            event.target.classList.add('bg-gray-200');
            selectedCount--; 
            seatsLeft++;  

          
            const row = seatTableBody.querySelector(`tr[data-seat="${seatName}"]`);
            if (row) row.remove();

            totalPrice -= seatDetails.price;
        } else if (selectedCount < 4) {
            event.target.classList.add('bg-blue-500');
            event.target.classList.remove('bg-gray-200');
            selectedCount++;  
            seatsLeft--;  

          
            const row = document.createElement('tr');
            row.setAttribute('data-seat', seatName);  
            row.innerHTML = `  
                <td class="py-2 px-4">${seatName}</td>
                <td class="py-2 px-4">${seatDetails.class}</td>
                <td class="py-2 px-4">${seatDetails.price}</td>
            `;
            seatTableBody.appendChild(row);

            totalPrice += seatDetails.price;
        }

        
        seatLeft.textContent = `${seatsLeft} Seats Left`;

       
        totalPriceElement.textContent = `BDT ${totalPrice}`;

        
        if (selectedCount === 4) {
            document.getElementById('coupon-input').disabled = false;
            document.getElementById('apply-coupon-btn').disabled = false;
        } else {
            document.getElementById('coupon-input').disabled = true;
            document.getElementById('apply-coupon-btn').disabled = true;
        }
    }
});


document.getElementById('apply-coupon-btn').addEventListener('click', function () {
    const couponInput = document.getElementById('coupon-input').value.trim();
    const grandTotalElement = document.getElementById('grand-total');

   
    let discountedPrice = totalPrice;
    if (couponInput === 'Couple 20') {
        discountedPrice = totalPrice - (totalPrice * 0.20);  
    } else if (couponInput === 'NEW15') {
        discountedPrice = totalPrice - (totalPrice * 0.15); 
    }

   
    grandTotalElement.textContent = `BDT ${discountedPrice.toFixed(2)}`;
});


document.getElementById('coupon-input').addEventListener('input', function () {
    if (this.value.trim() === '') {
        document.getElementById('grand-total').textContent = `BDT ${totalPrice}`;
    }
});


const nextButton = document.getElementById('next-btn');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');


function checkInputs() {
    if (nameInput.value && phoneInput.value && emailInput.value && selectedCount >= 1) {
        nextButton.disabled = false;
    } else {
        nextButton.disabled = true;
    }
}

nameInput.addEventListener('input', checkInputs);
phoneInput.addEventListener('input', checkInputs);
emailInput.addEventListener('input', checkInputs);


seatContainer.addEventListener('click', checkInputs);


nextButton.addEventListener('click', function () {
    if (!nextButton.disabled) {
        
        localStorage.setItem('bookingSuccess', 'true');
        window.location.href = "success.html";  
    }
});
