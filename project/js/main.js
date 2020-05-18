'use strict';

const products = [
    {id: 1, title: 'Notebook', price: 2000, image: 'src=images/notebook.jpg'},
    {id: 2, title: 'Mouse', price: 20, image: 'src=images/mouse.jpg'},
    {id: 3, title: 'Keyboard', price: 20, image: 'src=images/keyboard.jpg'},
    {id: 4, title: 'Gamepad', price: 50, image: 'src=images/gamepad.jpg'},
    //для проверки значений по умолчанию
    //{id: 5, title: undefined, price: undefined, image: undefined},
];

const renderProduct = (title='Товар отсутствует на складе', price=0, image='src=images/noimage.jpg') =>
    `<div class="product-item">
        <div><img ${image}></div>
        <h3>${title}</h3>
        <p>${price}$</p>
        <button class="buy-btn">Купить</button>
    </div>`;

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price, item.image));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);