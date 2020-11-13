// --------------------- Переменные
var tabs = document.querySelectorAll('.news__tabs-item'),
    news = document.querySelectorAll('.news__preview_item'),
    city = document.querySelectorAll('.city'),
    phone = document.querySelectorAll('.phone__number span'),  
    menu = document.querySelectorAll('.menu__category li a'),
    menuButton = document.querySelector('.menu__dropdown'),
    overlayMenu = document.querySelector('.overlay__menu'),
    menuDropdown = document.querySelector('.menu__category'),
    tabs = document.querySelectorAll('.news__tabs-item'),
    popularProduct = document.querySelectorAll('.popular__item'),
    news = document.querySelectorAll('.news__preview_item'),
    previewText = document.querySelectorAll('.news__preview_text');


//--------------------- Функции начало  ----------------------------
// Обрезать текст 
const textSlice = (node, number) => {
    node.forEach(text => {
        if(text.innerHTML.length > number) {
            text.innerHTML = text.innerHTML.substr(0, number - 1) + ' ...'
        } 
    })
}

// Toggle для класса active
const classToggle = (element) => {
    element.classList.toggle('active');
}

// Выбор телефона по городу
for(let item of city) {
    item.addEventListener('change', () => {
        for(let number of phone) {
            number.innerHTML = item.value;
        }
    });
}

//------------ Функции конец  ----------------------------

// Смена цвета картинки свг в меню Области применения
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
menuButton.addEventListener('click', function() {
    classToggle(menuButton);
    classToggle(overlayMenu);
    classToggle(menuDropdown);
});

// Табы в превью новостей
for(let item of tabs) {
    item.addEventListener('click', function(el) {
        tabs.forEach( tab => tab.classList.remove('active'))
        el.target.classList.add('active')
        let currentData = el.target.dataset.preview
        news.forEach( item => {
            item.classList.remove('active')
            item.classList.add('disable')
            if(item.dataset.preview === currentData || currentData === 'all') {
                item.classList.remove('disable')
                item.classList.add('active')
            }
        })
       
    })
}

// Обрезать строку в превью если больше 140 символов
textSlice(previewText, 130);

// Подключение слайдеров
const activeSlider = (items, slider) => {
    if(items.length > 4) {
        $(slider).slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1
        })
    }
}
activeSlider(news, '.news__slider');
activeSlider(popularProduct, '.popular__slider');

// Колонки сайдбара
// var sidebar = document.querySelectorAll('.sidebar__submenu');

// for(let item of sidebar) {
//     let counter = Math.ceil(item.children.length / 7);
//     item.setAttribute('style', 'columns: ' + counter);
// }