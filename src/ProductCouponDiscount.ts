import {DiscountCouponList, CartProduct} from './Interfaces'

export class ProductCouponDiscount {
    
    private discountCouponList: DiscountCouponList

    public constructor (discountCouponList: DiscountCouponList) {
        this.discountCouponList = discountCouponList
    }

    public calculate(cartProduct: CartProduct) : number {

        const couponCode: string|null = cartProduct.discountCouponCode            
        
        let discountAmount: number = 0
        
        if (couponCode) {
            
            if (couponCode in this.discountCouponList === false) {
                throw new Error(`"${couponCode}" is an invalid discount coupon code`)
            }

            const couponData = this.discountCouponList[couponCode]
            
            // apply coupon code rule
            // if value of discountConditionKey in rule is 'quantity' then consider total quantity of a product in the cart to satisfy the discount is applicable condition
            // if value of discountConditionKey in rule is 'amount' then consider total amount of purchase for a products in the cart to satisfy the discount is applicable condition

            if (cartProduct[couponData.discountConditionKey] >= couponData.discountConditionValue) { // if true discount is applicable on the product
                
                switch(couponData.discountValueType) {
                    case "flat":
                        // if discountValue in rule is '*' then consider product price as discounted amount, otherwise consider number value provided in discountValue as discounted amount
                        discountAmount = (couponData.discountValue === "*") ? cartProduct.productPrice : couponData.discountValue;
                        break;
                    case "percent":
                        // if discountValue in rule is '*' then consider discountValue as 100% percent discount, otherwise consider number value provided in discountValue as discount percentage
                        discountAmount = (couponData.discountValue === "*") ? cartProduct.productPrice : cartProduct.productPrice * (couponData.discountValue / 100); 
                        break;
                    default:
                        throw new Error(`"${couponData.discountValueType}" is not supported for discount type`)
                    }

                // apply discount multiplier rule
                // if value of discountValueMultiplier in rule is '*' then apply discount on each ouccurence of a product, otherwise apply discount number of times the value provided in discountValueMultiplier
                discountAmount = (couponData.discountValueMultiplier === "*") ? cartProduct.quantity * discountAmount : discountAmount * couponData.discountValueMultiplier;        
            }
        } 

        return discountAmount
    }
}