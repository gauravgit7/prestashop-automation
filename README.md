\# PrestaShop Automation Assignment  
\#\# Overview  
This project automates the \*\*mandatory flows\*\* defined in the QA automation assignment:  
1\. \*\*User Registration\*\*    
2\. \*\*Sign-in (auto login after registration)\*\*    
3\. \*\*Purchase Flow\*\*    
\#\#\# Flow Implemented:  
\- Visit the PrestaShop demo site    
\- Register a new user    
\- Auto login after successful registration    
\- Select a product and add it to the cart    
\- Attempt checkout flow (address, delivery, payment)    
\- \*\*Note:\*\* The purchase flow was stopped by an \*\*unexpected 502 error\*\* when triggering the "Add to Cart" AJAX request.    
  \- This issue was observed \*\*only in Cypress automation\*\*.    
  \- Manual testing worked fine.    
\---  
\#\# Setup Instructions  
\#\#\# 1\. Clone the Repository  
\`\`\`bash  
git clone https://github.com/gauravgit7/prestashop-automation.git  

### **2\. Install Dependencies**

npm install

### **3\. Open Cypress Test Runner**

npx cypress open

### **4\. Run Tests in CLI**

npx cypress run \--spec "cypress/e2e/login.cy.js"

## **Test File**

Main test script:  
cypress/e2e/login.cy.js

The test covers:

* Registration flow (with dynamic email to avoid conflicts)  
* Assertion of successful login (Sign out button visible)  
* Product selection and Add to Cart flow  
* Checkout steps including address, delivery, and payment

## **Assertions Implemented**

The script validates:

* Page load (\#loadingMessage disappears)  
* Registration page contains **"Create an account"**  
* User logged in (Sign out link visible)  
* Add to Cart button is visible  
* Cart modal appears after adding a product  
* Checkout button is visible  
* Order confirmation page contains **"Your order on"**

## **Challenges Faced**

1. **Highly Dynamic Demo Site**  
   * The PrestaShop demo loads inside an iframe and changes origin dynamically, requiring use of cy.origin.  
   * Dynamic DOM updates and animations made selectors brittle.  
   * Timing issues required explicit waits for elements and AJAX-driven components.  
2. **502 Error During Purchase Flow**  
   * The **Add to Cart POST request** intermittently failed with a 502 error when executed via Cypress.  
   * This prevented completing the checkout end-to-end in automation.  
   * Manually, the flow works fine, but Cypress sometimes triggers the request differently, causing backend failure.  
3. **Modal Handling**  
   * The Add to Cart confirmation modal is dynamically injected and sometimes hidden by default (display: none).  
   * Cypress needed careful waiting for visibility before proceeding.
  
## ** HTTP Errors **

** Impact Summary **
* The test failed to complete the checkout flow due to a critical server-side error (502 Bad Gateway) on the POST /en/cart request.

** Explanation **
During the automated test, some HTTP requests failed:
POST /en/cart (502 Bad Gateway)
Triggered when the “Add to Cart” button is clicked.
Responsible for adding the product to the cart and opening the cart modal.
Failure blocked the checkout flow, preventing the test from completing successfully.
GET /2-small_default/hummingbird-printed-t-shirt.jpg (502 Bad Gateway, intermittent)
Requests the product image for the item being added.
Sometimes works, sometimes fails due to server instability.
While it doesn’t block the test, it’s captured as evidence of server instability.
Captured HTTP Errors:
Method	URL	Status	Response Time (ms)
GET	/2-small_default/hummingbird-printed-t-shirt.jpg	502	67513.960
POST	/en/cart	502	67593.124

** Notes **

* All logs were captured directly from the Cypress terminal.
* The POST /en/cart failure is the critical error causing test failure.
* The GET request failures are intermittent and expected on the demo server.
* Due to the unusual behavior of the demo site, there were several failed requests, but most did not affect the test flow.
* Only the POST /en/cart requests had a direct impact on the test outcome.

## **Assumptions**

* The PrestaShop demo site is **public and unstable**, so failures like 502 are expected.  
* Dynamic selectors (like product IDs, cart links) may change between sessions, so generic selectors (like .js-product.product) were used.  
* Only **mandatory flows** (register, login, purchase) were automated as required by the assignment.

## **Deliverables**

1. Cypress test script:  
   * ccypress/e2e/login.cy.js
2. README file  
