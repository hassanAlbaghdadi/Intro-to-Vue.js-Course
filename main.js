Vue.component("product",{
    template: `
            <div class="product">
                <div class="product-img">
                    <img :src="image">
                </div>
                <div class="product-info">
                    <h1>{{title}}</h1>
                    <p v-if="inStock">In Stock</p>
                    <p v-else>Out of Stock</p>
                    <ul>
                        <li v-for="detail in details">{{detail}}</li>
                    </ul>
                    <div  v-for=" (variant, index) in variants" 
                    :key="variant.variantId"
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColor } "
                    @mouseover="updateImage(index)">
                    </div>
                    <button 
                        v-on:click="addToCart"
                        :disabled="!inStock"
                        :class="{disabledButton: !inStock}">Add to Cart</button><br>
                    <button @click="removeFromCart">Remove from Cart</button> 
                </div>
            </div>
    `,
    data(){
        return {
            brand: 'Vue',
            product: 'socks',
            selectedVariant:0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId:1,
                    variantColor : 'green',
                    variantImage: '/vue/img/greenSocks.jpg',
                    variantQuantity:10
                },
                {
                    variantId:2,
                    variantColor : 'blue',
                    variantImage: '/vue/img/blueSocks.jpg',
                    variantQuantity:0
                }
            ]
        }
    },

    methods:{
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateImage(index){
            this.selectedVariant=index
        },
        removeFromCart(){
            this.$emit("remove-from-cart", this.variants[this.selectedVariant].variantId)
        }
    },

    computed: {
        title(){
            return this.brand + " " + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
    
})


var app = new Vue({
    el: '#app',
    
    data:{
        cart: []
    },

    methods:{
        updateCartAdd(id){
            this.cart.push(id)
        },
        updateCartRemove(id){
            this.cart.pop(id)
        }
    }
    
})