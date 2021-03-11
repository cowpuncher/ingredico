"use strict";

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
    historySlider = document.querySelector('.history__slider'),
    contactSlider = document.querySelectorAll('.contacts__get_slider'),
    filterDropdown = document.querySelectorAll('.dropdown .small-title'),
    previewText = document.querySelectorAll('.news__preview_text'),
    previewNews = document.querySelectorAll('.info-page .flex-card p'),
    accordeon = document.querySelectorAll('.accordeon__item'),
    mediaPreview = document.querySelectorAll('.media__grid_content p'),
    tabsContent = document.querySelector('.tabs-descrition');
faqTabs = document.querySelectorAll('.faq-tabs .tab'); //--------------------------------------------------------------------------
//--------------------- FUNCTION START ----------------------------
// --------- Slice text

var textSlice = function textSlice(node, number) {
  node.forEach(function (text) {
    if (text.innerHTML.length > number) {
      text.innerHTML = text.innerHTML.substr(0, number - 1) + ' ...';
    }
  });
}; // --------- Slice text in preview news on main page 140 words


textSlice(previewText, 130); // --------- Slice text in preview news on news page 245 words

textSlice(previewNews, 245); // --------- Slice text in preview news on news page 245 words

textSlice(mediaPreview, 115); //--------------------------------------------------------------------------
// --------- Toggle class active

var classToggle = function classToggle(element) {
  element.classList.toggle('active');
}; //--------------------------------------------------------------------------
// --------- Close open block


var closeOpenBlock = function closeOpenBlock(button, block, overlay) {
  document.addEventListener('click', function (e) {
    var target = e.target;
    var its_block = target == block || block.contains(target);
    var its_button = target.closest('button') == button;
    var block_is_active = block.classList.contains('active');

    if (!its_block && !its_button && block_is_active) {
      classToggle(block);
      classToggle(button);

      if (overlay !== undefined) {
        classToggle(overlay);
      }
    }
  });
}; //--------------------------------------------------------------------------
// --------- Add sliders


var activeSlider = function activeSlider(items, slider) {
  if (items.length > 4) {
    $(slider).slick({
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 650,
        settings: {
          slidesToShow: 1
        }
      }]
    });
  }
};

activeSlider(news, newsSlider);
activeSlider(popularProduct, '.popular__slider'); //slider on main page

if (mainSlider !== null) {
  // Active main slider
  var mainSlider = new Swiper('.main__slider', {
    // Смена вида крусора при наведении
    grabCursor: true,
    // Количество слайдов для показа 
    slidesPerView: 1,
    // Отключение слайдера если слайдов меньше чем в PreView
    watchOverflow: true,
    // Скорость прокрутки
    speed: 800
  }); // Add slider in main slider

  var mainSliderMount = new Swiper('.slider__mount', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    effect: 'fade'
  }); // Slider to slider

  mainSlider.controller.control = mainSliderMount;
  mainSliderMount.controller.control = mainSlider;
} //slider on history page


if (historySlider !== null) {
  var activeHistorySlider = function activeHistorySlider(direction) {
    var historySlider = new Swiper('.history__slider_images', {
      // Смена вида крусора при наведении
      grabCursor: true,
      slidesPerView: 1,
      direction: direction,
      speed: 800
    });
    var historySliderContent = new Swiper('.history__slider_content', {
      // Смена вида крусора при наведении
      grabCursor: true,
      slidesPerView: 1,
      speed: 800,
      direction: direction,
      mousewheel: {
        sensitivity: 11,
        eventsTarget: ".swiper-pagination"
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function renderBullet(index, className) {
          var bullet = document.querySelectorAll('.history__slider_dates .history__slider_date')[index].innerHTML;
          return '<span class="' + className + '">' + bullet + '</span>';
        },
        dynamicBullets: true
      }
    });
    historySlider.controller.control = historySliderContent;
    historySliderContent.controller.control = historySlider;
  };

  if (document.body.clientWidth > 992) {
    activeHistorySlider('vertical');
  } else {
    activeHistorySlider('horizontal');
  }
}

var startSliderContent = function startSliderContent() {
  var sliderSwiper = new Swiper('.contacts__get_slider', {
    // Смена вида крусора при наведении
    grabCursor: true,
    slidesPerView: 1,
    observer: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    speed: 800
  });
};

if (contactSlider !== null) {
  startSliderContent();
}

if (document.body.clientWidth < 768) {
  $('.info-page .reviews-grid').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1
  });
  $('.media-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    adaptiveHeight: true,
    asNavFor: '.media-slider-thumbs'
  });
  $('.media-slider-thumbs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.media-slider',
    centerMode: true,
    arrows: false,
    focusOnSelect: true,
    responsive: [{
      breakpoint: 578,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 450,
      settings: {
        slidesToShow: 2
      }
    }]
  });
}

if (document.body.clientWidth < 993) {
  var teamSlider = function teamSlider(slider) {
    $(slider).slick({
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 568,
        settings: {
          slidesToShow: 1
        }
      }]
    });
  };

  teamSlider('.team__flex');
  teamSlider('.team__grid');
} //--------------------------------------------------------------------------
//------------ FUNCTION END ----------------------------------------------
// --------- Смена цвета картинки свг в меню Области применения
// Ищем элемент меню


window.onload = function () {
  menu.forEach(function (link) {
    // Событие наведения на конкретный элемент 
    link.addEventListener('mouseenter', function (e) {
      e.preventDefault(); // Инициализируем SVG внутри нашего Object

      var obj = e.currentTarget.children[0].children[0].children[0]; // Инициализируем fill внутри svg

      var color = obj.getAttribute('fill'); // Изменяем fill на белый

      obj.setAttribute('fill', '#ffffff'); // Изменяем фон пункта меню на изначальный цвет svg

      e.currentTarget.style.backgroundColor = color;
      e.currentTarget.style.color = '#ffffff'; // Событие убранной с элемента мыши

      link.addEventListener('mouseleave', function (e) {
        // Возвращаем изначальный цвет SVG
        obj.setAttribute('fill', color); // Фон делаем прозрачным 

        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--color-1)';
      });
    });
  }); // Смена цвета картинки свг в меню Каталога

  if (document.body.clientWidth > 1200) {
    greyMenu.forEach(function (item) {
      var promiseMenuEl = new Promise(function (resolve, reject) {
        setTimeout(function () {
          var image = item.querySelector('.menu__category_img').children[0].children[0];
          console.log(image);
          var color = image.getAttribute('fill');
          image.setAttribute('fill', '#D2D2D2');
          resolve(color);
        }, 1000);
      });
      promiseMenuEl.then(function (dataColor) {
        item.addEventListener('mouseenter', function (e) {
          currentEl = e.currentTarget;
          var rect = currentEl.children[0].children[0].children[0];
          console.log(rect);
          rect.setAttribute('fill', dataColor);
          currentEl.style.backgroundColor = 'transparent';
          currentEl.style.color = dataColor;
          item.addEventListener('mouseleave', function (e) {
            rect.setAttribute('fill', '#D2D2D2');
            currentEl.style.color = '#000';
          });
        });
      })["catch"](function (err) {
        console.log('Image not loading ... ');
      });
    });
  } else {
    var menuCatalog = document.querySelector('.catalog-body__menu .menu__category');
    var arrItem = menuCatalog.children;
    menuCatalog.addEventListener('click', function (e) {
      var arrItem = e.currentTarget.children; // let newArr = [...arrItem];
      // for (var i = 0; i < arrItem.length; i++) {
      //     if(newArr[i].classList.contains('active')) {
      //         newArr.unshift(newArr[i])
      //     }
      // }

      e.currentTarget.classList.toggle('active'); // for (var i = 0; i < arrItem.length; i++) {
      //     if(!arrItem[i].classList.contains('active')) {
      //         arrItem[i].setAttribute('style', 'top: '+ 60*(i+1)  + 'px;');
      //     }
      //     // if(arrItem[i].classList.contains('active')) {
      //     //     arrItem[i].setAttribute('style', 'top: ' + ((60*(i+1)) - 60) + 'px;');
      //     // } else if(!arrItem[i].classList.contains('active')) {
      //     //     arrItem[i].setAttribute('style', 'top: '+ 60*(i+1)  + 'px;');
      //     // }
      // }
    });
  }
}; //--------------------------------------------------------------------------
// --------- Кастомовые селекты на странице

/* Look for any elements with the class "custom-select": */


var customSelect = function customSelect(select, count) {
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
      c.addEventListener("click", function (e) {
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
    a.addEventListener("click", function (e) {
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
    var x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;

    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
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
};

customSelect("select-sort", 0);
customSelect("quantity-to-cart", 1);
customSelect("city", 0);
customSelect("table-select", 0); // ---------- Количество добавленное в корзину в карточке товара

var selItems = document.querySelectorAll('.card .select-items');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = selItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _item = _step.value;

    _item.onclick = function (e) {
      var quantity = e.target.parentNode.parentNode;
      var div = quantity.previousElementSibling.children;
      var myEl = e.target.innerHTML;
      var arrI = myEl.split(' - ');

      for (var i = 0; i < arrI.length; i++) {
        div[i].innerHTML = arrI[i];
      }

      quantity.nextElementSibling.value = arrI[0];
      quantity.setAttribute('style', 'display: none;');
      quantity.nextElementSibling.classList.add('active');
    };
  } //--------------------------------------------------------------------------
  // --------- Клик по меню Области применения

} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

menuButton.addEventListener('click', function () {
  classToggle(menuButton);
  classToggle(overlayMenu);
  classToggle(menuDropdown);
});
closeOpenBlock(menuButton, menuDropdown, overlayMenu); //--------------------------------------------------------------------------
// --------- Tabs in preview news

if (tabs !== null) {
  tabs.addEventListener('click', function (e) {
    var currentData = e.target.dataset.preview;
    console.log(currentData);

    for (var _i = 0; _i < tabs.children.length; _i++) {
      tabs.children[_i].classList.remove('active');

      e.target.classList.add('active');
    }

    news.forEach(function (item) {
      item.classList.remove('active');
      item.classList.add('disable');

      if (item.dataset.preview === currentData || currentData === 'all') {
        item.classList.remove('disable');
        item.classList.add('active');
      }
    });
  });
} //--------------------------------------------------------------------------
// --------- Accordion


if (accordeon !== null) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = accordeon[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      item = _step2.value;
      item.addEventListener('click', function (e) {
        for (var i = 0; i < accordeon.length; i++) {
          accordeon[i].classList.remove('active');
        }

        e.currentTarget.classList.add('active');
      });
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
} //--------------------------------------------------------------------------
// --------- Tabs on page product


if (tabsContent !== null) {
  tabsContent.children[0].onclick = function (e) {
    if (contactSlider !== null) {
      startSliderContent();
    }

    var current = e.target;
    var arrayTabs = tabsContent.children[0].children;
    var arrayContent = tabsContent.children[1].children;

    for (var i = 0; i < arrayTabs.length; i++) {
      arrayTabs[i].classList.remove('active');
      arrayTabs[i].setAttribute('data-tabs', [i]);
      arrayContent[i].classList.remove('active');
    }

    var n = current.dataset.tabs;
    arrayContent[n].classList.add('active');
    current.classList.add('active');
  };
} //--------------------------------------------------------------------------
// --------- Tabs on page faq


if (faqTabs !== null) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = faqTabs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var tab = _step3.value;
      tab.addEventListener('click', function (e) {
        var current = e.currentTarget;
        var faqContent = document.querySelectorAll('.faq-tabs .content');

        for (var _i2 = 0; _i2 < faqTabs.length; _i2++) {
          faqTabs[_i2].classList.remove('active');

          faqContent[_i2].classList.remove('active');
        }

        current.classList.add('active');
        current.nextElementSibling.classList.add('active');
      });
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
} //--------------------------------------------------------------------------
// --------- Fixed top menu 


var fixedMenu = function fixedMenu() {
  var header = document.querySelector('header');

  if (pageYOffset > header.offsetHeight) {
    topPanel.classList.add('active');
    topPanel.setAttribute('style', 'transform: translate(0px, 0px);'); // Remove active drop menu category

    overlayMenu.classList.remove('active');
    menuDropdown.classList.remove('active');
    menuButton.classList.remove('active');
  } else if (pageYOffset < header.offsetHeight) {
    topPanel.classList.remove('active');
    topPanel.removeAttribute('style', 'transform: translate(0px, 0px);');
  }
};

fixedMenu();
window.addEventListener('scroll', function () {
  fixedMenu();
}); //--------------------------------------------------------------------------
// --------- Выпадающее меню в фильтрах

filterDropdown.forEach(function (item) {
  item.addEventListener('click', function (el) {
    el.currentTarget.classList.toggle('active');
  });
}); //--------------------------------------------------------------------------
// --------- Range для цены на сайте

if (document.querySelector('.price__slider') !== null) {
  // Инициализация трэка и бегунков
  var rangeRail = document.querySelector('.price__range_rail'),
      rangeTrack = document.querySelector('.price__range_track'),
      rangeHandleLeft = document.querySelector('.price__range_handle-1'),
      rangeHandleRight = document.querySelector('.price__range_handle-2'); // Инициализация инпутов

  var inputMin = document.querySelector('.price__input_min'),
      inputMax = document.querySelector('.price__input_max'),
      valueMax = inputMax.getAttribute('aria-valuemax'); // Стартовые положение для бегунков и их значений

  rangeHandleLeft.setAttribute('style', 'left: ' + inputMin.value / valueMax * 100 + '%;');
  rangeHandleRight.setAttribute('style', 'left: ' + inputMax.value / valueMax * 100 + '%;');
  rangeHandleLeft.setAttribute('aria-valuenow', inputMin.value);
  rangeHandleRight.setAttribute('aria-valuenow', inputMax.value); // Функция активации бегунков

  var activeButton = function activeButton(el, handle, input, secondInput) {
    // Прослушка нажатия на бегунок
    el.onmousedown = function (el) {
      // Переменная в которой лежит нажатая кнопка
      var button = el.currentTarget; // Переменная в которой лежит длинна всего пути трека

      var rail = Math.floor(rangeRail.getBoundingClientRect().width); // Прослушка движения мыши по экрану

      document.onmousemove = function (e) {
        // Распололжение клика
        e = e.pageX - Math.floor(rangeRail.getBoundingClientRect().x); // Движение бегунка в %

        button.style.left = e / (rail / 100) + '%'; // Запись значения в value

        Math.floor(button.setAttribute("aria-valuenow", e / (rail / 100))); // Проверка, чтобы бегунок не убегал за пределы трека

        if (e > rail) {
          button.style.left = '100%';
          Math.floor(button.setAttribute("aria-valuenow", 100));
        } else if (e <= 0) {
          button.style.left = '0%';
          Math.floor(button.setAttribute("aria-valuenow", 0));
        } // Проверка значения бегунка после движения


        var value = handle.getAttribute("aria-valuenow"); // Запись значения в input

        input.setAttribute('value', Math.floor(inputMax.getAttribute("aria-valuemax") / 100 * value));

        if (secondInput == inputMax) {
          if (value > secondInput.value / valueMax * 100 - 8) {
            button.style.left = secondInput.value / valueMax * 100 - 8 + '%';
            input.setAttribute('value', secondInput.value);
          }
        } else if (secondInput == inputMin) {
          if (value < secondInput.value / valueMax * 100 + 8) {
            button.style.left = secondInput.value / valueMax * 100 + 8 + '%';
            input.setAttribute('value', secondInput.value);
          }
        }
      }; // Отключения прослушки движения мыши, после завершения нажатия


      document.onmouseup = function () {
        document.onmousemove = null;
      };
    };

    el.addEventListener('touchstart', function (el) {
      // Переменная в которой лежит нажатая кнопка
      var button = el.currentTarget; // Переменная в которой лежит длинна всего пути трека

      var rail = Math.floor(rangeRail.getBoundingClientRect().width);

      function motionRange(e) {
        // Распололжение клика
        e = e.changedTouches[0].clientX - rangeRail.getBoundingClientRect().x; // Движение бегунка в %

        button.style.left = e / (rail / 100) + '%'; // Запись значения в value

        Math.floor(button.setAttribute("aria-valuenow", e / (rail / 100))); // Проверка, чтобы бегунок не убегал за пределы трека

        if (e > rail) {
          button.style.left = '100%';
          Math.floor(button.setAttribute("aria-valuenow", 100));
        } else if (e <= 0) {
          button.style.left = '0%';
          Math.floor(button.setAttribute("aria-valuenow", 0));
        } // Проверка значения бегунка после движения


        var value = handle.getAttribute("aria-valuenow"); // Запись значения в input

        input.setAttribute('value', Math.floor(inputMax.getAttribute("aria-valuemax") / 100 * value));

        if (secondInput == inputMax) {
          if (value > secondInput.value / valueMax * 100 - 8) {
            button.style.left = secondInput.value / valueMax * 100 - 8 + '%';
            input.setAttribute('value', secondInput.value);
          }
        } else if (secondInput == inputMin) {
          if (value < secondInput.value / valueMax * 100 + 8) {
            button.style.left = secondInput.value / valueMax * 100 + 8 + '%';
            input.setAttribute('value', secondInput.value);
          }
        }
      } // Отключения прослушки движения мыши, после завершения нажатия


      document.addEventListener('touchmove', motionRange);
      document.addEventListener('touchend', function () {
        document.removeEventListener('touchmove', motionRange, false);
      });
    });
  }; // Инициализация функций нажатия бегунков


  activeButton(rangeHandleLeft, rangeHandleLeft, inputMin, inputMax);
  activeButton(rangeHandleRight, rangeHandleRight, inputMax, inputMin);
} //--------------------------------------------------------------------------
// --------- Выбор телефона по городу


var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
  for (var _iterator4 = city[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
    var _item2 = _step4.value;

    for (var i = 0; i < _item2.children[0].children.length; i++) {
      var value = _item2.children[0].children[i].value;

      _item2.children[2].children[i].setAttribute('value', value);
    }

    _item2.addEventListener('click', function (e) {
      console.log(e.target.getAttribute('value'));
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = phone[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var number = _step10.value;
          number.innerHTML = e.target.getAttribute('value');
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    });
  } //--------------------------------------------------------------------------
  // --------- Toggle drop phone 

} catch (err) {
  _didIteratorError4 = true;
  _iteratorError4 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
      _iterator4["return"]();
    }
  } finally {
    if (_didIteratorError4) {
      throw _iteratorError4;
    }
  }
}

var btnPhone = document.querySelector('.phone-btn'),
    phoneMobile = document.querySelector('.phones-mobile');
btnPhone.addEventListener('click', function (e) {
  classToggle(phoneMobile);
  classToggle(btnPhone);
});
closeOpenBlock(btnPhone, phoneMobile); //--------------------------------------------------------------------------
// --------- Toggle drop mobile menu 

var btnMobileMenu = document.querySelector('.menu__burger'),
    mobileMenu = document.querySelector('.menu');
btnMobileMenu.addEventListener('click', function (e) {
  classToggle(mobileMenu);
});
closeOpenBlock(btnMobileMenu, mobileMenu); //--------------------------------------------------------------------------
//---------- Clones Elements 

var comProp = document.querySelector('.com-prop');
var btnModalTop = document.querySelector('.btn__modal');
var auth = document.querySelector('.auth');
var socialLink = document.querySelector('.footer__top');
var supportBtn = document.getElementById('support-btn');

var cloneElement = function cloneElement(divGet, divInsert) {
  var newDiv = divGet.cloneNode(true);
  divInsert.children[divInsert.children.length - 1].appendChild(newDiv);
  divGet.remove();
};

if (document.body.clientWidth < 768) {
  cloneElement(comProp, phoneMobile);
  cloneElement(btnModalTop, mobileMenu);
  cloneElement(auth, mobileMenu);
  cloneElement(supportBtn, socialLink);
} //--------------------------------------------------------------------------
//---------- Grids 

/* Media video */


if (document.querySelector('.grid-container') !== null) {
  if (document.body.clientWidth > 768) {
    var grid = new Isotope('.grid-container', {
      /// options
      itemSelector: '.grid-card',
      masonry: {
        columnWidth: 1,
        gutter: 26
      }
    });
  }
} //--------------------------------------------------------------------------
//---------- Popups 


var modal = document.querySelector('.popup'),
    overlay = document.getElementById('overlay'),
    btnClose = document.getElementById('popup-close'),
    bodyPopup = document.querySelector('.popup-body'),
    btnPopupOpen = document.querySelectorAll('.grid-card.video-block');

function openPopup(btn) {
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = btn[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      btnOpen = _step5.value;
      btnOpen.addEventListener('click', function () {
        modal.classList.add('active');
        window.document.body.setAttribute('style', 'overflow: hidden');
        addBody = bodyPopup;
        modal.append(addBody);
      });
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
}

function closeModal() {
  modal.classList.remove('active');
  removeBody = bodyPopup;
  removeBody.parentNode.removeChild(removeBody);
  window.document.body.removeAttribute('style');
}

overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);
openPopup(btnPopupOpen); //--------------------------------------------------------------------------

/* Lightbox with slider */

var mediaGallery = document.querySelectorAll('.media__gallery');
var mediaGalleryMob = document.querySelectorAll('.media__gallery .slick-track .slick-slide');

if (document.body.clientWidth > 768) {
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = mediaGallery[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      item = _step6.value;
      lightGallery(item);
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
        _iterator6["return"]();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }
} else {
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = mediaGalleryMob[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      item = _step7.value;
      item.classList.remove('video-block');
      item.removeAttribute('href');
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
        _iterator7["return"]();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }
} //--------------------------------------------------------------------------
// Table counter


var tableCounter = document.querySelectorAll(".table-counter");
var _iteratorNormalCompletion8 = true;
var _didIteratorError8 = false;
var _iteratorError8 = undefined;

try {
  for (var _iterator8 = tableCounter[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
    var item = _step8.value;
    item.children[0].addEventListener("click", function (e) {
      var numb = Number(e.target.parentNode.children[1].value);

      if (numb <= 2) {
        e.target.parentNode.children[1].value = numb - 1;
        e.target.classList.add('disable');
      } else {
        e.target.parentNode.children[1].value = numb - 1;
      }
    });
    item.children[2].addEventListener("click", function (e) {
      var numb = Number(e.target.parentNode.children[1].value);

      if (numb >= 1) {
        e.target.parentNode.children[1].value = numb + 1;
        e.target.parentNode.children[0].classList.remove('disable');
      }

      e.target.parentNode.children[1].value = numb + 1;
    });
  } //--------------------------------------------------------------------------
  // Personal date item

} catch (err) {
  _didIteratorError8 = true;
  _iteratorError8 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
      _iterator8["return"]();
    }
  } finally {
    if (_didIteratorError8) {
      throw _iteratorError8;
    }
  }
}

var personalItem = document.querySelectorAll(".personal__item");
var _iteratorNormalCompletion9 = true;
var _didIteratorError9 = false;
var _iteratorError9 = undefined;

try {
  for (var _iterator9 = personalItem[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
    var item = _step9.value;
    item.addEventListener('click', function (e) {
      var arrEl = e.currentTarget.parentElement.children;

      if (e.currentTarget.classList.contains('active')) {
        return false;
      } else {
        for (var i = 0; i < arrEl.length; i++) {
          arrEl[i].classList.remove('active');
        }

        e.currentTarget.classList.add('active');
      }
    });
  } //--------------------------------------------------------------------------
  // Order State Line

} catch (err) {
  _didIteratorError9 = true;
  _iteratorError9 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
      _iterator9["return"]();
    }
  } finally {
    if (_didIteratorError9) {
      throw _iteratorError9;
    }
  }
}

var orderState = document.getElementById('order__state');
var orderDelivery = document.querySelector('.order__delivery');
var orderPay = document.querySelector('.order__pay');
var orderConfirm = document.querySelector('.order__confirm');

if (orderState !== null) {
  var addStyleLineState = function addStyleLineState(amount, block) {
    orderState.children[3].setAttribute('style', 'width: ' + amount + '%');
    block.setAttribute('style', 'display: block;');
  };

  if (orderState.children[0].classList.contains('active')) {
    addStyleLineState(25, orderDelivery);
  } else if (orderState.children[1].classList.contains('active')) {
    addStyleLineState(60, orderPay);
  } else if (orderState.children[2].classList.contains('active')) {
    addStyleLineState(70, orderConfirm);
    orderState.children[1].querySelector("svg").setAttribute("style", "fill: #FFA11B;");
  }
}

var contactTabs = document.querySelector('.tabs');
contactTabs.addEventListener('click', function (e) {
  console.log(e.currentTarget.children);
  var arr = e.currentTarget.children;

  for (var _i3 = 0; _i3 < arr.length; _i3++) {// arr[i].classList.remove('active')
  }

  console.log(arr);
});