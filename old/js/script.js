var city = document.getElementById('city'),
    phone = document.querySelector('.phone__number span');

city.addEventListener('change', () => {
    phone.innerHTML = city.value;
});