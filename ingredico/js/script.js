// --------------------- VARIABLES
var tabs = document.querySelector('.news__tabs'),
    topPanel = document.querySelector('.top-panel'),
    р = document.querySelector('.fixed__menu_box'),
    news = document.querySelectorAll('.news__preview_item'),
    city = document.querySelectorAll('.city'),
    phone = document.querySelectorAll('.phone__number span'),  
    menu = document.querySelectorAll('.menu__category li a'),
    greyMenu = document.querySelectorAll('.catalog-body__menu .menu__category li a'),
    menuButton = document.querySelector('.menu__dropdown-btn'),
    overlayMenu = document.querySelector('.overlay__menu'),
    menuDropdown = document.querySelector('.menu__category'),
    popularProduct = document.querySelectorAll('.popular__item'),
    news = document.querySelectorAll('.news__preview_item'),
    mainSlider = document.querySelector('.main__slider'),
    newsSlider = document.querySelector('.news__slider'),
    filterDropdown = document.querySelectorAll('.dropdown .small-title'),
    previewText = document.querySelectorAll('.news__preview_text'),
    previewNews = document.querySelectorAll('.flex-card p'),
    productContent = document.querySelector('.product-descrition');

//--------------------------------------------------------------------------
//--------------------- FUNCTION START ----------------------------
// --------- Slice text
const textSlice = (node, number) => {
    node.forEach(text => {
        if(text.innerHTML.length > number) {
            text.innerHTML = text.innerHTML.substr(0, number - 1) + ' ...'
        } 
    })
}
// --------- Slice text in preview news on main page 140 words
textSlice(previewText, 130);
// --------- Slice text in preview news on news page 245 words
textSlice(previewNews, 245);
//--------------------------------------------------------------------------
// --------- Toggle class active
const classToggle = (element) => {
    element.classList.toggle('active');
}
//--------------------------------------------------------------------------
// --------- Close open block
const closeOpenBlock = (button, block, overlay) => {
    document.addEventListener('click', e => {
        const target = e.target;
        const its_block = target == block || block.contains(target);
        const its_button = target.closest('button') == button;
        const block_is_active = block.classList.contains('active');
        if (!its_block && !its_button && block_is_active) {
            classToggle(block);
            classToggle(button);
            if(overlay !== undefined) {
                classToggle(overlay);
            }
        }
    })
} 
//--------------------------------------------------------------------------
// --------- Add sliders
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

if(mainSlider !== null) {
    // Active main slider
    var mainSlider = new Swiper('.main__slider', {
        // Смена вида крусора при наведении
        grabCursor: true,
        // Количество слайдов для показа 
        slidesPerView: 1,
        // Отключение слайдера если слайдов меньше чем в PreView
        watchOverflow: true,
        // Скорость прокрутки
        speed: 800,
    });
    // Add slider in main slider
    var mainSliderMount = new Swiper('.slider__mount', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        effect: 'fade'
    });
    // Slider to slider
    mainSlider.controller.control = mainSliderMount;
    mainSliderMount.controller.control = mainSlider;
}
//--------------------------------------------------------------------------
//------------ FUNCTION END ----------------------------------------------
// --------- Смена цвета картинки свг в меню Области применения
// Ищем элемент меню
window.onload = () => {
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
                e.currentTarget.style.color = '#ffffff';
                // Событие убранной с элемента мыши
                link.addEventListener('mouseleave', function(e) {
                    // Возвращаем изначальный цвет SVG
                    item.setAttribute('fill', color);
                    // Фон делаем прозрачным 
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-1)';
                });
            });
        });
    });
    // Смена цвета картинки свг в меню Каталога
    greyMenu.forEach( item => {
        const promiseMenuEl = new Promise( (resolve, reject) => {
            setTimeout( () => {
                const image = item.querySelector('.menu__category_img').children[0].contentDocument.querySelectorAll('path');
                image.forEach( fill => {
                    const color = fill.getAttribute('fill');
                    fill.setAttribute('fill', '#D2D2D2');
                    resolve(color)
                })
            }, 1000)
        });
        promiseMenuEl.then( dataColor => {
            item.addEventListener ( 'mouseenter', function(e) {
                currentEl = e.currentTarget;
                let rect = currentEl.children[0].children[0].contentDocument.querySelectorAll('path');
                rect.forEach( fill => {
                    fill.setAttribute('fill', dataColor);
                    currentEl.style.backgroundColor = ('transparent');
                    currentEl.style.color = dataColor;
                    item.addEventListener('mouseleave', function(e) {
                        fill.setAttribute('fill', '#D2D2D2');
                        currentEl.style.color = '#000';
                    });
                })
            });
        }).catch( err => {
            console.log('Image not loading ... ');
        } )
    });
}
//--------------------------------------------------------------------------
// --------- Кастомовые селекты на странице
/* Look for any elements with the class "custom-select": */
const customSelect = (select, count) => {
    x = document.getElementsByClassName(select);
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("div");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        a.setAttribute("value", selElmnt.options[selElmnt.selectedIndex].value);
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("div");
        b.setAttribute("class", "select-items select-hide");
        for (j = count; j < ll; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("div");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                    y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
            arrNo.push(i)
            } else {
            y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
            }
        }
    }
    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
}
customSelect("select-sort", 0);
customSelect("quantity-to-cart", 1);
customSelect("city", 0);
// ---------- Количество добавленное в корзину в карточке товара
var selItems = document.querySelectorAll('.card .select-items');
for(let item of selItems) {
    item.onclick = function(e) {
        let quantity = e.target.parentNode.parentNode;
        let div = quantity.previousElementSibling.children;
        let myEl = e.target.innerHTML;
        let arrI = myEl.split(' - ');
        for(var i = 0; i < arrI.length; i++) {
            div[i].innerHTML = arrI[i];
        }
        quantity.nextElementSibling.value = arrI[0];
        quantity.setAttribute('style', 'display: none;');
        quantity.nextElementSibling.classList.add('active');
    }
}
//--------------------------------------------------------------------------
// --------- Клик по меню Области применения
menuButton.addEventListener('click', function() {
    classToggle(menuButton);
    classToggle(overlayMenu);
    classToggle(menuDropdown);
});
closeOpenBlock(menuButton, menuDropdown, overlayMenu)
//--------------------------------------------------------------------------
// --------- Tabs in preview news
if(tabs !== null) {
    tabs.addEventListener('click' , e => {
        let currentData = e.target.dataset.preview;
        console.log(currentData);
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
//--------------------------------------------------------------------------
// --------- Tabs on page product
if(productContent !== null) {
    productContent.children[0].onclick = e => {
        const current = e.target; 
        const arrayTabs = productContent.children[0].children;
        const arrayContent = productContent.children[1].children;
        for( var i = 0; i < arrayTabs.length; i++ ) {
            arrayTabs[i].classList.remove('active');
            arrayTabs[i].setAttribute('data-tabs', [i])
            arrayContent[i].classList.remove('active');
        }
        const n = current.dataset.tabs;
        arrayContent[n].classList.add('active')
        current.classList.add('active');
    }
}
//--------------------------------------------------------------------------
// --------- Fixed top menu 
const fixedMenu = () => {
        let header = document.querySelector('header'); 
        if(pageYOffset > header.offsetHeight) {
            topPanel.classList.add('active');
            topPanel.setAttribute('style', 'transform: translate(0px, 0px);' );  
            // Remove active drop menu category
            overlayMenu.classList.remove('active');
            menuDropdown.classList.remove('active');
            menuButton.classList.remove('active'); 
        } else if(pageYOffset < header.offsetHeight) {
            topPanel.classList.remove('active');
            topPanel.removeAttribute('style', 'transform: translate(0px, 0px);' );
        }
}
fixedMenu();
window.addEventListener('scroll', function() {
    fixedMenu();
});
//--------------------------------------------------------------------------
// --------- Выпадающее меню в фильтрах
filterDropdown.forEach( item => {
    item.addEventListener('click', el => {
        el.currentTarget.classList.toggle('active');
    })
})
//--------------------------------------------------------------------------
// --------- Range для цены на сайте
if(document.querySelector('.price__slider') !== null) {
    // Инициализация трэка и бегунков
    var rangeRail = document.querySelector('.price__range_rail'),
    rangeTrack = document.querySelector('.price__range_track'),
    rangeHandleLeft = document.querySelector('.price__range_handle-1'),
    rangeHandleRight = document.querySelector('.price__range_handle-2');
    // Инициализация инпутов
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

        el.addEventListener('touchstart', function (el) {   
            // Переменная в которой лежит нажатая кнопка
            let button = el.currentTarget;
            // Переменная в которой лежит длинна всего пути трека
            let rail = Math.floor(rangeRail.getBoundingClientRect().width);

            function motionRange(e) { 
                // Распололжение клика
                e = (e.changedTouches[0].clientX - rangeRail.getBoundingClientRect().x);
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
                    if(value < (secondInput.value / valueMax * 100) + 8) {
                        button.style.left = ((secondInput.value / valueMax * 100) + 8) + '%';
                        input.setAttribute('value', secondInput.value);
                    }
                }
            }
            // Отключения прослушки движения мыши, после завершения нажатия
            document.addEventListener('touchmove', motionRange)
            document.addEventListener('touchend', () => {
                document.removeEventListener('touchmove', motionRange, false);
            })
        })
    }
    // Инициализация функций нажатия бегунков
    activeButton(rangeHandleLeft, rangeHandleLeft, inputMin, inputMax);
    activeButton(rangeHandleRight, rangeHandleRight, inputMax, inputMin);
}
//--------------------------------------------------------------------------
// --------- Выбор телефона по городу
for(let item of city) {
    for(var i = 0; i < item.children[0].children.length; i++) {
        const value = item.children[0].children[i].value;
        item.children[2].children[i].setAttribute('value', value);
    }
    item.addEventListener('click', (e) => {
        console.log(e.target.getAttribute('value'));
        for(var number of phone) {
            number.innerHTML = e.target.getAttribute('value');
        }
    })
}
//--------------------------------------------------------------------------
// --------- Toggle drop phone 
var btnPhone = document.querySelector('.phone-btn'),
    phoneMobile = document.querySelector('.phones-mobile');
btnPhone.addEventListener('click', (e) => {
    classToggle(phoneMobile);
    classToggle(btnPhone);
})
closeOpenBlock(btnPhone, phoneMobile);
//--------------------------------------------------------------------------
// --------- Toggle drop mobile menu 
var btnMobileMenu = document.querySelector('.menu__burger'),
    mobileMenu = document.querySelector('.menu');
btnMobileMenu.addEventListener('click', (e) => {
    classToggle(mobileMenu)
})
closeOpenBlock(btnMobileMenu, mobileMenu);
//--------------------------------------------------------------------------
//---------- Clones Elements 
const comProp = document.querySelector('.com-prop');
const btnModalTop = document.querySelector('.btn__modal');
const auth = document.querySelector('.auth');

const cloneElement = (divGet, divInsert) => {
    const newDiv = divGet.cloneNode( true );
    divInsert.children[divInsert.children.length - 1].appendChild( newDiv );
    divGet.remove();
}
if(document.body.clientWidth < 768) {
    cloneElement(comProp, phoneMobile);
    cloneElement(btnModalTop, mobileMenu);
    cloneElement(auth, mobileMenu);
}
//--------------------------------------------------------------------------
//---------- Grids 
/* Media video */
var grid = new Isotope( '.grid-container', {
    /// options
    itemSelector: '.grid-card',
    masonry: {
        columnWidth: 1,
        gutter: 26
      }
  });

//--------------------------------------------------------------------------
//---------- Popups 
var modal = document.querySelector('.popup'),
    overlay = document.getElementById('overlay'),
    btnClose = document.getElementById('popup-close'),
    bodyPopup = document.querySelector('.popup-body'),
    btnPopupOpen = document.querySelectorAll('.grid-card.video-block');

    
function openPopup(btn) {
    for(btnOpen of btn) {
        btnOpen.addEventListener('click', function() {
            modal.classList.add('active');
            window.document.body.setAttribute('style', 'overflow: hidden');
            addBody = bodyPopup;
            modal.append(addBody);
        });
    }
}
function closeModal() {
    modal.classList.remove('active');
    removeBody = bodyPopup;
    removeBody.parentNode.removeChild(removeBody);
    window.document.body.removeAttribute ('style');
}
overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);


openPopup(btnPopupOpen);
//--------------------------------------------------------------------------
/* Lightbox with slider */
var mediaGallery = document.querySelectorAll('.media__gallery');
for(item of mediaGallery) {
    lightGallery(item);
}


