// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          showCart: false,
          counter: 0,
          totalPrice: 0,
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
                this.countCart();
            });
        
        console.log(this.$data.cartItems);
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        };
                        this.countCart()
                    })       
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        };
                        this.countCart()
                    })
            };
            
            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item){
            
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        };
                        this.counter = 0;
                        this.totalPrice = 0;
                        this.countCart()
                    };
                }); 
        },
        countCart() {
            let count = 0;
            let cardPrice = 0;
            this.cartItems.forEach(item => {
                count += item.quantity;
                cardPrice += item.price;
                this.counter = count;
                this.totalPrice = cardPrice;
            });
        }
    },
    template: `<div class="cart">
                    <div class="b-cart btn-cart" @click="showCart = !showCart">
                        <i class="fa fa-shopping-bag fa-lg" aria-hidden="true"></i>
                        <p class="b-cart__quantity">&#160;({{counter}})</p> -
                        <p class="b-cart__count">$ {{totalPrice}}</p>
                    </div>
                    <div class="cart-block" v-show="showCart">
                        <div class="empty-cart" v-show="cartItems.length<1">
                            <span>card is empty</span>
                        </div>
                        <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.image" :cart-item="item" @remove="remove">
                        </cart-item>
                    </div>
                </div>
            `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
})