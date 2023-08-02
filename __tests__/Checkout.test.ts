import {ProductList, DiscountCouponList, PricingRules} from '../src/Interfaces';
import {Checkout} from '../src/Checkout';

describe('Test Cases', () => {
  
  test('Test Case 1 for Pricing Rule', () => { 
    /**
     *  Test Case 1 for Pricing Rule:  
     *  Coupon Code: "APPLETVBUY2GET1FREE"
     *  Coupon Code Info: If someone buys more than 2 Apple TV give 1 Apple TV Free as per this coupon code scheme
     */
   const productList: ProductList =    {
      "ipd": { 
          name: "Super iPad", 
          price: 549.99, 
      },
      "mbp": { 
          name: "MacBook Pro", 
          price: 1399.99
      },
      "atv": { 
          name: "Apple TV", 
          price: 109.50, 
          discountCode:  "APPLETVBUY2GET1FREE" // 3 for 2 deal on Apple TVs
      },
      "vga": { 
          name: "VGA adapter",
          price: 30.00
      }
    }

    // Coupon Code Rule
    const discountCouponList: DiscountCouponList = {
        "APPLETVBUY2GET1FREE" : {
            discountConditionKey: "quantity",
            discountConditionValue: 3,
            discountValue: "*",
            discountValueType: "flat",
            discountValueMultiplier:  1
        }
    }

    const pricingRules: PricingRules = {"productList": productList, "discountCouponList": discountCouponList}
 
    const cart = new Checkout(pricingRules)

    // Example Scenario 1
    cart.scan("atv");
    cart.scan("atv");
    cart.scan("atv");    
    cart.scan("vga");

    expect(cart.total()).toBe(249.00);
  });

  test('Test Case 2 for Pricing Rule', () => {   
     /**
     *  Test Case 2 for Pricing Rule:  
     *  Coupon Code: "SUPERIPADOFFER"
     *  Coupon Code Info: If someone buys more than 4 Super iPad give flat discount of $50 on each iPad as per this coupon code scheme
     */
   const productList: ProductList =    {
      "ipd": { 
          name: "Super iPad", 
          price: 549.99, 
          discountCode:  "SUPERIPADOFFER" 
      },
      "mbp": { 
          name: "MacBook Pro", 
          price: 1399.99
      },
      "atv": { 
          name: "Apple TV", 
          price: 109.50, 
      },
      "vga": { 
          name: "VGA adapter",
          price: 30.00
      }
    }

    const discountCouponList: DiscountCouponList = {
        "SUPERIPADOFFER" : {
            discountConditionKey: "quantity",
            discountConditionValue: 5,
            discountValue: 50,
            discountValueType:  "flat",
            discountValueMultiplier: "*"
        }
    }
  
    const pricingRules: PricingRules = {"productList": productList, "discountCouponList": discountCouponList}
 
    const cart = new Checkout(pricingRules)

    // Example Scenario 2
    cart.scan("atv"); // Purchase 1
    cart.scan("ipd"); // Purchase 2
    cart.scan("ipd"); // Purchase 3
    cart.scan("atv"); // Purchase 4
    cart.scan("ipd"); // Purchase 5
    cart.scan("ipd"); // Purchase 6
    cart.scan("ipd"); // Purchase 7
    
    expect(cart.total()).toBe(2718.95);
  });

  test('Test Case 3 for Pricing Rule', () => {   

    /**
     *  Test Case 3 for Pricing Rule:  
     *  Coupon Code: "SUPERIPADOFFER"
     *  Coupon Code Info: If someone buys more than 5 Super iPad give 2 iPad free as per this coupon code scheme
     */
   
    const productList: ProductList =    {
      "ipd": { 
          name: "Super iPad", 
          price: 549.99, 
          discountCode:  "SUPERIPADOFFER" // Buy 5 IPads at price of 3
      },
      "mbp": { 
          name: "MacBook Pro", 
          price: 1399.99
      },
      "atv": { 
          name: "Apple TV", 
          price: 109.50,
      },
      "vga": { 
          name: "VGA adapter",
          price: 30.00
      }
    }

    // Coupon Code Rule
    const discountCouponList: DiscountCouponList = {
        "SUPERIPADOFFER" : {
            discountConditionKey: "quantity",
            discountConditionValue: 3,
            discountValue: "*",
            discountValueType:  "flat",
            discountValueMultiplier: 2
        }
    }
  
    const pricingRules: PricingRules = {"productList": productList, "discountCouponList": discountCouponList}
 
    const cart = new Checkout(pricingRules)
    
    cart.scan("ipd"); // Purchase 1
    cart.scan("ipd"); // Purchase 2
    cart.scan("ipd"); // Purchase 3
    cart.scan("ipd"); // Purchase 4
    cart.scan("ipd"); // Purchase 5
    
    expect(cart.total()).toBe(1649.97);
  });

  test('Test Case 4 for Pricing Rule', () => {   

    /**
     *  Test Case 4 for Pricing Rule:  
     *  Coupon Code: "MACBOOKPRO300OFF"
     *  Coupon Code Info: Flat $300 Off on purchase of MacBook Pro as per this coupon code scheme
     */
   

   const productList: ProductList =    {
      "ipd": { 
          name: "Super iPad", 
          price: 549.99, 
      },
      "mbp": { 
          name: "MacBook Pro", 
          price: 1399.99,
          discountCode: "MACBOOKPRO300OFF"
      },
      "atv": { 
          name: "Apple TV", 
          price: 109.50, 
      },
      "vga": { 
          name: "VGA adapter",
          price: 30.00
      }
    }

    const discountCouponList: DiscountCouponList = {
        "MACBOOKPRO300OFF" : {
            discountConditionKey: "quantity",
            discountConditionValue: 1,
            discountValue: 300,
            discountValueType: "flat",
            discountValueMultiplier:  1
        }
    }
  
    const pricingRules: PricingRules = {"productList": productList, "discountCouponList": discountCouponList}
 
    const cart = new Checkout(pricingRules)
    
    cart.scan("mbp"); // Purchase 1
    
    expect(cart.total()).toBe(1099.99);
  });

  test('Test Case 5 for Pricing Rule', () => {   
    /**
     *  Test Case 5 for Pricing Rule:  
     *  Coupon Code: "SUPERIPADOFFER"
     *  Coupon Code Info: 20% off on each Super Ipad purchase if someone buys more than two Ipad
     */
   
   const productList: ProductList =    {
      "ipd": { 
          name: "Super iPad", 
          price: 549.99, 
          discountCode:  "SUPERIPADOFFER" 
      },
      "mbp": { 
          name: "MacBook Pro", 
          price: 1399.99
      },
      "atv": { 
          name: "Apple TV", 
          price: 109.50
      },
      "vga": { 
          name: "VGA adapter",
          price: 30.00
      }
    }

    const discountCouponList: DiscountCouponList = {
        "SUPERIPADOFFER" : {
            discountConditionKey: "quantity",
            discountConditionValue: 2,
            discountValue: 20,
            discountValueType:  "percent",
            discountValueMultiplier: "*"
        }
    }
  
    const pricingRules: PricingRules = {"productList": productList, "discountCouponList": discountCouponList}
 
    const cart = new Checkout(pricingRules)
    
    cart.scan("ipd"); // Purchase 1  
    cart.scan("ipd"); // Purchase 2
    
    expect(cart.total()).toBe(879.98);
  });
  
  test('Test Case 6 for Pricing Rule', () => {   
    /**
     *  Test Case 6 for Pricing Rule:  
     *  Coupon Code: "VGA50"
     *  Coupon Code Info: $50 off on total purchase of VGA adapter if someone buys VGA adapters of worth $300
     */
   
   const productList: ProductList =    {
      "ipd": { 
          name: "Super iPad", 
          price: 549.99, 
          discountCode:  "VGA50" 
      },
      "mbp": { 
          name: "MacBook Pro", 
          price: 1399.99
      },
      "atv": { 
          name: "Apple TV", 
          price: 109.50
      },
      "vga": { 
          name: "VGA adapter",
          price: 30.00,
          discountCode: "VGA50"
      }
    }

    const discountCouponList: DiscountCouponList = {
        "VGA50" : {
            discountConditionKey: "amount",
            discountConditionValue: 300,
            discountValue: 50,
            discountValueType:  "flat",
            discountValueMultiplier: 1
        }
    }
  
    const pricingRules: PricingRules = {"productList": productList, "discountCouponList": discountCouponList}
 
    const cart = new Checkout(pricingRules)
    
    cart.scan("vga");   // Purchase 1
    cart.scan("vga");   // Purchase 2
    cart.scan("vga");   // Purchase 3
    cart.scan("vga");   // Purchase 4
    cart.scan("vga");   // Purchase 5
    cart.scan("vga");   // Purchase 6
    cart.scan("vga");   // Purchase 7
    cart.scan("vga");   // Purchase 8
    cart.scan("vga");   // Purchase 9
    cart.scan("vga");   // Purchase 10
    expect(cart.total()).toBe(250);
  });

  test('Test Case 7 for Pricing Rule', () => {   
    /**
     *  Test Case 7 for Pricing Rule:  
     *  Coupon Code: "VGA50%OFF"
     *  Coupon Code Info: 50% off on each VGA adapter if someone buys VGA adapters of worth more than $600
     */
   
   const productList: ProductList =    {
      "ipd": { 
          name: "Super iPad", 
          price: 549.99, 
          discountCode:  "VGA50" 
      },
      "mbp": { 
          name: "MacBook Pro", 
          price: 1399.99
      },
      "atv": { 
          name: "Apple TV", 
          price: 109.50
      },
      "vga": { 
          name: "VGA adapter",
          price: 30.00,
          discountCode: "VGA50"
      }
    }

    const discountCouponList: DiscountCouponList = {
        "VGA50" : {
            discountConditionKey: "amount",
            discountConditionValue: 600,
            discountValue: 50,
            discountValueType:  "percent",
            discountValueMultiplier: "*"
        }
    }
  
    const pricingRules: PricingRules = {"productList": productList, "discountCouponList": discountCouponList}
 
    const cart = new Checkout(pricingRules)
    
    cart.scan("vga");   // Purchase 1
    cart.scan("vga");   // Purchase 2
    cart.scan("vga");   // Purchase 3
    cart.scan("vga");   // Purchase 4
    cart.scan("vga");   // Purchase 5
    cart.scan("vga");   // Purchase 6
    cart.scan("vga");   // Purchase 7
    cart.scan("vga");   // Purchase 8
    cart.scan("vga");   // Purchase 9
    cart.scan("vga");   // Purchase 10

    cart.scan("vga");   // Purchase 11
    cart.scan("vga");   // Purchase 12
    cart.scan("vga");   // Purchase 13
    cart.scan("vga");   // Purchase 14
    cart.scan("vga");   // Purchase 15
    cart.scan("vga");   // Purchase 16
    cart.scan("vga");   // Purchase 17
    cart.scan("vga");   // Purchase 18
    cart.scan("vga");   // Purchase 19
    cart.scan("vga");   // Purchase 20
    
    cart.scan("vga");   // Purchase 21
    cart.scan("vga");   // Purchase 22
    cart.scan("vga");   // Purchase 23
    cart.scan("vga");   // Purchase 24
    cart.scan("vga");   // Purchase 25
    
    expect(cart.total()).toBe(375);
  });

  test('Test Case 8 for Pricing Rule', () => {   
    /**
     *  Test Case 6 for Pricing Rule: 
     *  
     *  Coupon Code 1: "SUPERIPADOFFER"
     *  Coupon Code 1 Info: 20% off on each Super Ipad purchase if someone buys more than two Ipad
     * 
     *  Coupon Code 2: "MACBOOKPRO300OFF"
     *  Coupon Code 2 Info: Flat $300 Off on purchase of MacBook Pro as per this coupon code scheme
     *
     *  Coupon Code 3: "APPLETVBUY2GET1FREE"
     *  Coupon Code 3 Info: If someone buys more than 2 Apple TV give 1 Apple TV Free as per this coupon code scheme
     * 
     *  Coupon Code 4: "VGA50"
     *  Coupon Code 4 Info: $50 off on total purchase of VGA adapter if someone buys VGA adapters of worth $300
     */
   
   const productList: ProductList =    {
      "ipd": { 
          name: "Super iPad", 
          price: 549.99, 
          discountCode:  "SUPERIPADOFFER" 
      },
      "mbp": { 
          name: "MacBook Pro", 
          price: 1399.99,
          discountCode: "MACBOOKPRO300OFF"
      },
      "atv": { 
          name: "Apple TV", 
          price: 109.50,
          discountCode: "APPLETVBUY2GET1FREE"
      },
      "vga": { 
          name: "VGA adapter",
          price: 30.00,
          discountCode: "VGA50"
      }
    }

    const discountCouponList: DiscountCouponList = {
        "SUPERIPADOFFER" : {
            discountConditionKey: "quantity",
            discountConditionValue: 2,
            discountValue: 10,
            discountValueType:  "percent",
            discountValueMultiplier: "*"
        },
        "MACBOOKPRO300OFF" : {
            discountConditionKey: "quantity",
            discountConditionValue: 1,
            discountValue: 300,
            discountValueType: "flat",
            discountValueMultiplier:  1
        },
        "APPLETVBUY2GET1FREE" : {
            discountConditionKey: "quantity",
            discountConditionValue: 3,
            discountValue: "*",
            discountValueType: "flat",
            discountValueMultiplier:  1
        },
        "VGA50" : {
            discountConditionKey: "amount",
            discountConditionValue: 300,
            discountValue: 50,
            discountValueType:  "flat",
            discountValueMultiplier: 1
        }
    }
  
    const pricingRules: PricingRules = {"productList": productList, "discountCouponList": discountCouponList}
 
    const cart = new Checkout(pricingRules)
    
    cart.scan("vga");   // vga Purchase 1
    cart.scan("vga");   // vga Purchase 2
    cart.scan("vga");   // vga Purchase 3

    cart.scan("ipd");   // ipd Purchase 1
    cart.scan("ipd");   // ipd Purchase 2
    cart.scan("ipd");   // ipd Purchase 3
    cart.scan("ipd");   // ipd Purchase 4
    cart.scan("ipd");   // ipd Purchase 5      (5 * 549.99) - 274.995 = 2474.955 (I Pad Total)
    
    cart.scan("vga");   // vga Purchase 4
    cart.scan("vga");   // vga Purchase 5
    
    cart.scan("mbp");   // mbp Purchase 1
    
    cart.scan("vga");   // vga Purchase 6
    cart.scan("vga");   // vga Purchase 7
    
    cart.scan("mbp");   // mbp Purchase 2      (2 * 1399.99) - 300 = 2499.98 (MacBook Total)

    cart.scan("vga");   // vga Purchase 8
    cart.scan("vga");   // vga Purchase 9
    
    cart.scan("atv");   // atv Purchase 1
    
    cart.scan("vga");   // vga Purchase 10     (10 * 30) - 50 = 250  (VGA Adapter Total)

    cart.scan("atv");   // atv Purchase 2    
    cart.scan("atv");   // atv Purchase 3
    cart.scan("atv");   // atv Purchase 4
    cart.scan("atv");   // atv Purchase 5      (5 * 109.5) - 109.5 = 438  (Apple TV Total)
    
                                     // total: 2474.955 + 2499.98 + 250 + 438 = 5662.934999999

    expect(cart.total()).toBe(5662.93);
  });
});

