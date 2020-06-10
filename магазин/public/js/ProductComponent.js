Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           imgProduct: 'http://placehold.it/255x320'
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<div class="products b-popularProducts__products">
                <product v-for="item of filtered"
                :key="item.id_product"
                :img="imgProduct"
                :product="item"
                :id="item.id_product"
                @add-product="$parent.$refs.cart.addProduct"></product>
              </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
              <a href="#" class="b-popularProducts__link product-item" id="product.id_product" @click="$emit('add-product', product)">
                <div class="b-popularProducts__product">
                  <img :src="img" alt="Some img" class="b-popularProducts__product-image">
                  <p class="b-popularProducts__product-name">{{product.product_name}}</p>
                  <p class="b-popularProducts__product-price">{{product.price}}</p>
                  <div class="b-popularProducts__favourites"></div>
                </div>
              </a>
          `
})





// Vue.component ('product-details', {
//   data(){
//        return {
//            catalogUrl: '/catalogData.json',
//            products: [],
//            searchProduct:[],
//            imgProduct: 'http://placehold.it/255x320'
//        }
//    },
//     mounted(){
//         this.$parent.getJson(`/api/products`)
//             .then(data => {
//                 for (let item of data){
//                     this.$data.products.push(item);
//                 }
//             });
//     },
//   methods: {
//         click(id){
//           console.log(id);
//           let find = products.find(el => {
//              if(el.id_product === id) this.$data.searchProduct.push(find);
//              console.log(searchProduct);
//             });
//         }
//     },
//   template: `
//      <div>
//        <div class="b-productDetails__img">
//           <img src="http://placehold.it/580x600" alt="img">
//        </div>
//        <div class="b-productDetails__text">
//          <h3 class="b-productDetails__name">{{searchProduct.product_name}}</h3>
//          <p class="b-productDetails__price">{{searchProduct.price}}</p>
//          <p class="b-productDetails__description">
//            But I must explain to you how all this mistaken idea of ouncing and aising pain was born and I will give you a complete count of ut I must explain to you how all this aken idea of enouncing pleasure born and I will give you a complete account of
//          </p>
//          <button class="b-productDetails__buy-btn" @click="$emit('add-product', product)">Add To Cart</button>
//        </div>
//      </div>
//    `
// })