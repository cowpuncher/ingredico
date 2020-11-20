// --------------------- Переменные
var tabs = document.querySelector('.news__tabs'),
    topPanel = document.querySelector('.top-panel'),
    fixedBlock = document.querySelector('.fixed__menu_box'),
    news = document.querySelectorAll('.news__preview_item'),
    city = document.querySelectorAll('.city'),
    phone = document.querySelectorAll('.phone__number span'),  
    menu = document.querySelectorAll('.menu__category li a'),
    menuButton = document.querySelector('.menu__dropdown'),
    overlayMenu = document.querySelector('.overlay__menu'),
    menuDropdown = document.querySelector('.menu__category'),
    popularProduct = document.querySelectorAll('.popular__item'),
    news = document.querySelectorAll('.news__preview_item'),
    newsSlider = document.querySelector('.news__slider'),
    filterDropdown = document.querySelectorAll('.dropdown .small-title'),
    previewText = document.querySelectorAll('.news__preview_text');

//--------------------- Функции начало  ----------------------------
// --------- Обрезать текст 
const textSlice = (node, number) => {
    node.forEach(text => {
        if(text.innerHTML.length > number) {
            text.innerHTML = text.innerHTML.substr(0, number - 1) + ' ...'
        } 
    })
}
// --------- Toggle для класса active
const classToggle = (element) => {
    element.classList.toggle('active');
}
// --------- Выбор телефона по городу
for(let item of city) {
    item.addEventListener('change', () => {
        for(let number of phone) {
            number.innerHTML = item.value;
        }
    });
}
//------------ Функции конец  ----------------------------
// --------- Подключение слайдеров
const activeSlider = (items, slider) => {
    if(items.length > 4) {
        $(slider).slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1
        })
    }
}
activeSlider(news, newsSlider);
activeSlider(popularProduct, '.popular__slider');

// --------- Смена цвета картинки свг в меню Области применения
// Ищем элемент меню
menu.forEach( link => {
    // Событие наведения на конкретный элемент 
    link.addEventListener('mouseenter', function(e) {
        e.preventDefault();
        // Инициализируем SVG внутри нашего Object
        let obj = e.currentTarget.children[0].children[0].contentDocument;
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



var greyMenu = document.querySelectorAll('.catalog-body__menu .menu__category li a');

greyMenu.forEach( item => {
        let color;
        function getColorSvg() {
            let image = item.querySelector('.menu__category_img').children[0].contentDocument.querySelectorAll('path');
            image.forEach( fill => {
                color = fill.getAttribute('fill');
                fill.setAttribute('fill', '#D2D2D2');
            })
          }
          setTimeout(getColorSvg, 1000);

          item.addEventListener('mouseenter', function(e) {
            e.preventDefault();
            // Инициализируем SVG внутри нашего Object
            let obj = e.currentTarget.children[0].children[0].contentDocument;
            // Инициализиурем Path внутри SVG
            let rect = obj.querySelectorAll('path');
            // Пробегаемся по всем Path внутри выбранного пункта меню
            rect.forEach( item => {
                // Инициализируем fill внутри svg
                let color = item.getAttribute('fill');
                // Изменяем fill на белый
                item.setAttribute('fill', color);
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


// --------- Клик по меню Области применения
menuButton.addEventListener('click', function() {
    classToggle(menuButton);
    classToggle(overlayMenu);
    classToggle(menuDropdown);
});

// --------- Табы в превью новостей
if(window.location.pathname == '/') {
    tabs.addEventListener('click' , e => {
        let currentData = e.target.dataset.preview;
        for(let i = 0; i < tabs.children.length; i++) {
            tabs.children[i].classList.remove('active');
            e.target.classList.add('active');
        }
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
// --------- Обрезать строку в превью если больше 140 символов
textSlice(previewText, 130);
// --------- Фиксированная шапка   
const fixedMenu = () => {
    if(pageYOffset + 100 > fixedBlock.offsetHeight ) {
        topPanel.classList.add('active');
        topPanel.setAttribute('style', 'transform: translate(0px, 0px);' );
    } else if(pageYOffset < 200) {
        topPanel.setAttribute('style', 'transform: translate(0px, 0px);' );
    } else if(pageYOffset + 100 < fixedBlock.offsetHeight) {
        topPanel.classList.remove('active');
        topPanel.setAttribute('style', 'transform: translate(0px, -200px); transition: all .3s linear;' );
    }
}
fixedMenu();
window.addEventListener('scroll', function() {
    fixedMenu();
})

// --------- Выпадающее меню в фильтрах
filterDropdown.forEach( item => {
    item.addEventListener('click', el => {
        el.currentTarget.classList.toggle('active');
    })
})
// --------- Range для цены на сайте
// Иничиализация трэка и бегунков
var rangeRail = document.querySelector('.price__range_rail'),
    rangeTrack = document.querySelector('.price__range_track'),
    rangeHandleLeft = document.querySelector('.price__range_handle-1'),
    rangeHandleRight = document.querySelector('.price__range_handle-2');
// Иничиализация инпутов
var inputMin = document.querySelector('.price__input_min'),
    inputMax = document.querySelector('.price__input_max'),
    valueMax = inputMax.getAttribute('aria-valuemax');
// Стартовые положение для бегунков и их значений
    rangeHandleLeft.setAttribute('style', 'left: ' + ((inputMin.value / valueMax*100))  + '%;' );
    rangeHandleRight.setAttribute('style', 'left: ' + ((inputMax.value / valueMax*100)) + '%;' );

    rangeHandleLeft.setAttribute('aria-valuenow',  inputMin.value );
    rangeHandleRight.setAttribute('aria-valuenow', inputMax.value );
// Функция активации бегунков
const activeButton = (el, handle, input, secondInput ) => { 
    // Прослушка нажатия на бегунок
    el.onmousedown = function (el) { 
        // Переменная в которой лежит нажатая кнопка
        let button = el.currentTarget;
        // Переменная в которой лежит длинна всего пути трека
        let rail = Math.floor(rangeRail.getBoundingClientRect().width);
        // Прослушка движения мыши по экрану
        document.onmousemove = function (e) {
            // Распололжение клика
            e = (e.pageX - Math.floor(rangeRail.getBoundingClientRect().x)) ;
            // Движение бегунка в %
            button.style.left = e / (rail / 100) + '%';
            // Запись значения в value
            Math.floor(button.setAttribute("aria-valuenow", e / (rail / 100)));
            // Проверка, чтобы бегунок не убегал за пределы трека
            if(e > rail) {
                button.style.left = '100%';
                Math.floor(button.setAttribute("aria-valuenow", 100));
            } else if(e <= 0) {
                button.style.left = '0%';
                Math.floor(button.setAttribute("aria-valuenow", 0));
            }
            // Проверка значения бегунка после движения
            let value = handle.getAttribute("aria-valuenow");
            // Запись значения в input
            input.setAttribute ('value', Math.floor(( inputMax.getAttribute("aria-valuemax") / 100) * value ));
            if(secondInput == inputMax) {
                if(value > (secondInput.value / valueMax * 100) - 8) {  
                    button.style.left = ((secondInput.value / valueMax * 100) - 8) + '%';
                    input.setAttribute('value', secondInput.value);
                } 
            } else if(secondInput == inputMin) {
                console.log('1');
                if(value < (secondInput.value / valueMax * 100) + 8) {
                    button.style.left = ((secondInput.value / valueMax * 100) + 8) + '%';
                    input.setAttribute('value', secondInput.value);
                }
            }
        }
        // Отключения прослушки движения мыши, после завершения нажатия
        document.onmouseup = function() {
            document.onmousemove = null;
        }
    }
}
// Инициализация функций нажатия бегунков
activeButton(rangeHandleLeft, rangeHandleLeft, inputMin, inputMax);
activeButton(rangeHandleRight, rangeHandleRight, inputMax, inputMin);




// Колонки сайдбара
// var sidebar = document.querySelectorAll('.sidebar__submenu');

// for(let item of sidebar) {
//     let counter = Math.ceil(item.children.length / 7);
//     item.setAttribute('style', 'columns: ' + counter);
// }