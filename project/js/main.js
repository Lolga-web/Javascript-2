class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProduct();
        this.render();
        this.calcTotalPrice(); // <--
    }
    _fetchProduct(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend',productObj.render());
        }
    }
    //метод, определяющий суммарную стоимость всех товаров
    calcTotalPrice() {
        let totalPrice = 0;
        this.goods.forEach(good => {
            if(good.price !== undefined) {
                totalPrice += good.price;
            }
        });
        document.querySelector('.total_price').insertAdjacentHTML('beforeend',`Итого: ${totalPrice}$`);
    }
}

class ProductItem{
    constructor(product, img="https://placehold.it/200x150"){
        this.title = product.title;
        this.id = product.id;
        this.img = img;
        this.price = product.price;
    }
    render(){
         return `<div class="product-item">
                <img alt="some img" src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}$</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductsList();



//Класс элемента корзины
class BasketItem {
    constructor(title, price, img, link) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.link = link; // ссылка на страницу товара
        //можно добавить артикул, размер, цвет и т.д.
    }
    render() {
        //верстка для элемента корзины
    }
}

//Класс корзины
class Basket {
    constructor() {
        this.addGoods = [];  //массив с добавленными в корзину товарами
    }

    addToBasket() {} //Добавление товара в корзину
    //тут надо учесть возможность покупки нескольких штук одинакового товара

    deleteFromBasket() {} //Удаление товара из корзины

    openBasket() {} //метод, который выводит сообщение с сылкой перехода к
    //корзине, если туда что-то добавлено

    calcBasket() {} //метод, определяющий суммарную стоимость всех товаров

    render() {}

    saveOrder() {} //не знаю пока как происходит оформление заказа, но наверное
    //должен быть какой-то метод, который сохраняет заказ и переводит к оплате
}





