// Выбор телефона по городу

var city = document.getElementById('city'),
    phone = document.querySelector('.phone__number span');

city.addEventListener('change', () => {
    phone.innerHTML = city.value;
});


// Смена цвета картинки свг в меню ОБласти применения
// var menu = document.querySelectorAll('.menu__category li a');
// var obj = document.querySelectorAll('.menu__category li a object');


// obj.forEach( item => {
//     item.addEventListener('load', function() {
//         let doc = this.getSVGDocument();

//         var rect = doc.querySelectorAll("path"); // suppose our image contains a <rect>
//         rect.forEach( fill => {
//             let color = fill.getAttribute("fill");

            
//             console.log(color)
//         })
        
//     })
// } )
