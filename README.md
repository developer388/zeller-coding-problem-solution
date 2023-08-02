# Zeller Coding Problem Solution
## Installation
Install dev dependencies mentioned in package.json file
```
$ npm install
```
## Execute test cases using jest
In root directory run jest cli command
```
$ jest
```

## Project Directory Structure
```
Root                            // Root Directory
   - package.json
   - jest.config.json
   - README.md
  src                           // Source Code Directory
   - Interfaces.ts
   - Checkout.ts
   - ProductDiscountCoupon.ts
  __test__                      // Test Cases Directory
    - Checkout.test.ts
```
## Help
1. If jest cli is not present installed. It can be installed using:
    ```
    $ npm install jest --g
   ```

2. To execute a sepecific source file
   
    First transpile the typescript code using **tsc**

    ```
    $ tsc filename.ts
    ```
    
    Then execute the .js file using **node**
    ```
    $ node filename.js
    ```
    
    
    
3. If typescript is not installed. It can be installed using:
    
    ```
    $ npm install -g typescript
    ```

