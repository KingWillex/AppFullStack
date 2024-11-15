let webstore = new Vue({
    el: '#app',
    data: {
      sitename: 'BlackWatch',
      products: [], // Start with an empty array
      cart: [],
      showProduct: true,
      dropdownVisible: false,
      order: [
        {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          city: '',
          state: '',
          zip: '',
        }
      ]
    },
    computed: {
      cartItemCount: function() {
        const uniqueItemIds = new Set(this.cart);
        return uniqueItemIds.size;
      },
      canAddToCart: function(product) {
        return product.inventory > 0;
      },
      totalPrice: function() {
        let total = 0;
        for (let index = 0; index < this.cart.length; index++) {
          const element = this.cart[index];
          total += element;
        }
        return total;
      },
      sortProductPrice() {
          function compare(a, b) {
              if (a.price > b.price) return 1;
              if (a.price < b.price) return -1;
              return 0;
          }
          return this.products.sort(compare);
      }
    },
    methods: {
        fetchProducts() {
            fetch('http://localhost:3000/api/data') // API endpoint to fetch products
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                console.log('Fetched data:', data); // Log for debugging
                if (Array.isArray(data) && data.length > 0) {
                this.products = data; // Assign the fetched data to `products`
                console.log('Fetched products:', this.products);
                } else {
                  console.error('Invalid data received/format:', data);
                }
              })
              .catch(error => console.error('Error fetching products:', error));
          },
          addToCart: function(product) {
            const cartItem = this.cart.find(item => item.id === product.id);
            if (cartItem) {
                // If the product is already in the cart, increase the quantity
                cartItem.quantity++;
            } else {
                // If it's a new product, add it to the cart
                this.cart.push({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    quantity: 1 // Start with a quantity of 1
                });
            }
            product.inventory--; // Decrease inventory
        },
      showCheckout() {
        this.showProduct = false;
      },
      showProductPage() {
        this.showProduct = true;
      },
      toggleDropdown() {
          this.dropdownVisible = !this.dropdownVisible; // Toggle dropdown visibility
      },
      sortProducts(criteria) {
       if (criteria === 'price') {
          this.products.sort((a, b) => a.price - b.price);
       } else if (criteria === 'alpha') {
          this.products.sort((a, b) => a.title.localeCompare(b.title));
       }
       this.dropdownVisible = false; // Hide dropdown after sorting
      },
      purchase() {
        // Prepare the order data
        const orderData = {
            items: this.cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            })),
            totalPrice: this.totalPrice,
            // You can add more fields like user info if needed
        };

        // Send a POST request to the server to save the order
        fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Order successfully created:', data);
            // Optionally clear the cart after successful purchase
            this.cart = [];
        })
        .catch(error => console.error('Error creating order:', error));
    }
},
    created() {
      this.fetchProducts(); // Fetch products when the Vue instance is created
    }
});