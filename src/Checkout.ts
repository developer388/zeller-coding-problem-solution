import {ProductList, PricingRules, CartProduct} from './Interfaces'
import {ProductCouponDiscount} from './ProductCouponDiscount'

export class Checkout {
    
    private productList: ProductList;
    private productCouponDiscount: ProductCouponDiscount
    private cart: {products: {[key:string]: CartProduct}, total: number} =  {products: {}, total: 0}
   
    public constructor(pricingRules: PricingRules) {
        this.productList = pricingRules.productList;
        this.productCouponDiscount = new ProductCouponDiscount(pricingRules.discountCouponList);
    }
    
    public scan(productSKUCode: string): CartProduct {
        
        if (productSKUCode in this.productList === false) {
            throw new Error(`There is no matching product with SKU code "${productSKUCode}" `)
        }

        const cartProduct: CartProduct = {
                productName: '',
                productPrice: 0,
                quantity: 0,
                amount: 0,
                discountAmount: 0,
                discountCouponCode: null
        };

        if (productSKUCode in this.cart.products === false) {
            // add product to cart
            cartProduct.productName = this.productList[productSKUCode].name;
            cartProduct.productPrice = this.productList[productSKUCode].price;            
            cartProduct.quantity = 1;
            cartProduct.amount = this.productList[productSKUCode].price;
            cartProduct.discountCouponCode = (this.productList[productSKUCode].discountCode) ? String(this.productList[productSKUCode].discountCode) : null;
            this.cart.products[productSKUCode] = cartProduct;

        } else {
            // if same product is added again, increment the quantity and amount values for that product in the cart
            this.cart.products[productSKUCode].quantity++;
            this.cart.products[productSKUCode].amount +=  this.productList[productSKUCode].price;
        }
        return cartProduct       
    }

    public total(): number {        
        // apply discount function and calculate total of all products
        for (let productSKUCode in this.cart.products) {                    
            this.cart.products[productSKUCode].discountAmount = this.productCouponDiscount.calculate(this.cart.products[productSKUCode])
            this.cart.total += (this.cart.products[productSKUCode].amount - this.cart.products[productSKUCode].discountAmount)
        }

        return Number(this.cart.total.toFixed(2))
    }
}