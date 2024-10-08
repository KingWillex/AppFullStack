<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <script src="https://unpkg.com/vue@2.7.8/dist/vue.js"></script>
        <link rel="stylesheet" href="../style.css">
        <link
        rel="stylesheet” href="https://cdnjs.cloudflare.com/ajax/libs/fontawesome/5.15.1/css/all.min.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BlackWtch</title>
    </head>
    
    <body>

        <div id="app">
                <div class="productsStyle" v-for="product in products" :key="products.id">
                        <img :src="'images/' + product.image" alt="product image">
                        <h3>{{ product.title }}</h3>
                        <p>Price: ${{ product.price }}</p>
                        <p>Description: {{ product.description }}</p>
                        <button v-if="canAddToCart" @click="addToCart(product)">Add to Cart</button>
                        <span v-else>Out of stock</span>
                    </div>
                </div>
            </div>

            <script type="text/javascript">
        let webstore =  new Vue({ // The Vue instance
        el: '#app', // The 'option object': DOM mounting point
        data: { // the 'data' option
// the key 'sitename' matches the value of 'v-text' earlier
sitename: 'BlackWatch',
products:
[
   { id: 100,
    title: 'BlackWatch',
    price: 199.99,
    description: 'A stylish and comfortable watch',
    image: '124.png',
    inventory:10
},
{
    id: 101,
    title:" Fish Sticks",//MAKE A BABY OIL ONE diddy 
    price: 99.99,
    description: "A <em>delicious<em>'" + "treat for you and all your lovely pets",
    image: '12.png',
    inventory:5
 }

],
 cart:[]
},
computed:{
    cartItemCount: function() {
        return this.cart.length;
    },
    canAddToCart: function() {
        return this.products.inventory > this.cartItemCount;
 },
},
        methods: { // the 'methods' option
            addToCart: function() {
                this.cart.push(this.products.id);
            },
            showCheckout() {
            this.showproducts = this.showproducts ? false : true;
 },

        }
     });
        </script>
        </body>
    </html>