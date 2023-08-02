export interface ProductList {
  [key: string]: {
    name: string;
    price: number;
    discountCode?: string;
  }
}

type DISCOUNT_CONDITION_KEY = 'quantity' | 'amount'
type DISCOUNT_TYPE = 'flat' | 'percent';
type DISCOUNT_VALUE = '*' | number;
type DISCOUNT_VALUE_MULTIPLIER = '*' | number;

export interface DiscountCouponList {
  [key: string]: {
    discountConditionKey: DISCOUNT_CONDITION_KEY;
    discountConditionValue: number;
    discountValue: DISCOUNT_VALUE;
    discountValueType: DISCOUNT_TYPE;
    discountValueMultiplier: DISCOUNT_VALUE_MULTIPLIER;
  }
}

export interface PricingRules {
     productList : ProductList;
     discountCouponList: DiscountCouponList;
}

export interface CartProduct {
    [key: string]: any;
    productName: string;
    productPrice: number;
    quantity: number;
    amount: number;
    discountAmount: number;
    discountCouponCode: string | null;
}