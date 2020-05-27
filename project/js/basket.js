class Basket {
    constructor(container = '#basket'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.basketSum = 0;
        this.basketQuantity = 0;
        this._getBasket()
            .then(data => {
                this.goods = [...data['contents']];
                this.render()
            });
    }
    _getBasket(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => console.log(error))
    }
    calcSum(){
        return this.goods.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        block.innerHTML = '';   //очищает модальное окно от предыдущего вызова
        this.basketSum = this.calcSum();
        this.basketQuantity = this.goods.length;
        for (let product of this.goods){
            const productObj = new BasketItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
            document.querySelector(`#id-d${product.id_product}`).addEventListener("click", () => this.deleteFromBasket(product.id_product));
            document.querySelector(`#id-b${product.id_product}`).addEventListener("click", () => this.addToBasket(product));
            //здесь ошибка, обработчик срабатывает несколько раз
        }
        block.insertAdjacentHTML('beforeend',
            `<p class='total__price'>Количество товаров: ${this.basketQuantity}шт.<br>
                                    Сумма товаров: ${this.basketSum}$</p>`);
    }
    addToBasket(product) {
        let addGood;
        if (this.goods.length == 0) {
            addGood = {
                id_product: product.id_product,
                product_name: product.product_name,
                price: product.price,
                quantity: product.quantity
            }
        } else {
            this.goods.forEach(item => {
                if(product.id_product !== item.id) {
                    addGood = {
                        id_product: product.id_product,
                        product_name: product.product_name,
                        price: product.price,
                        quantity: product.quantity
                    }
                }
            });
        };
        this.goods.push(addGood);
        this.render();
    }
    deleteFromBasket(id) {
        let deleteGood;
        this.goods.forEach((item, i) => {
            let thisId = item.id_product;
            if(id == thisId) {
                deleteGood = i;
            }
        });
        this.goods.splice(deleteGood, 1);
        console.log(this.goods);
        this.render();
    }
}

class BasketItem {
    constructor(product, img = 'https://placehold.it/200x150', quantity=1){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity = quantity;
    }
    render() {
        return `<div class="basket-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price}$</p>
                        <p>${this.quantity}шт.</p>
                        <button class="delete-btn" id="id-d${this.id}">Удалить</button>
                    </div>
                </div>`
    }
}

let basket = openBtn.addEventListener("click", new Basket());

