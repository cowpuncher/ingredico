// Выбор телефона по городу
var city = document.getElementById('city'),
    phone = document.querySelector('.phone__number span');
city.addEventListener('change', () => {
    phone.innerHTML = city.value;
});

// Смена цвета картинки свг в меню ОБласти применения
var menu = document.querySelectorAll('.menu__category li a');
// Ищим элемент меню
menu.forEach( link => {
    // Событие наведения на конкретный элемент 
    link.addEventListener('mouseenter', function(e) {
        e.preventDefault();
        // Инициализируем SVG внутри нашего Object
        let obj = e.currentTarget.children[0].children[0].getSVGDocument();
        // Инициализиурем Path внутри SVG
        let rect = obj.querySelectorAll('path');
        // Пробегаемся по всем Path внутри выбранного пункта меню
        rect.forEach( item => {
            // Инициализируем fill внутри svg
            let color = item.getAttribute('fill');
            // Изменяем fill на белый
            item.setAttribute('fill', '#ffffff');
            // Изменяем фон пункта меню на изначальный цвет svg
            e.currentTarget.style.backgroundColor = color;
            // Событие убранной с элемента мыши
            link.addEventListener('mouseleave', function(e) {
                // Возвращаем изначальный цвет SVG
                item.setAttribute('fill', color);
                // Фон делаем прозрачным 
                e.currentTarget.style.backgroundColor = 'transparent';
            });
        });
    });
});

// Клик по меню Области применения
var menuButton = document.querySelector('.menu__dropdown'),
    overlayMenu = document.querySelector('.overlay__menu'),
    menu__dropdown = document.querySelector('.menu__category');

menuButton.addEventListener('click', function() {
    menuButton.classList.toggle('active');
    overlayMenu.classList.toggle('active');
    menu__dropdown.classList.toggle('active');
});