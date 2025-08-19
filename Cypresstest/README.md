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
git clone https://github.com/\<your-username\>/cypresstest.git  
cd cypresstest

### **2\. Install Dependencies**

npm install

### **3\. Open Cypress Test Runner**

npx cypress open

### **4\. Run Tests in CLI**

npx cypress run \--spec "cypress/e2e/register\_and\_purchase.spec.js"

## **Test File**

Main test script:  
cypress/e2e/register\_and\_purchase.spec.js

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

## **Assumptions**

* The PrestaShop demo site is **public and unstable**, so failures like 502 are expected.  
* Dynamic selectors (like product IDs, cart links) may change between sessions, so generic selectors (like .js-product.product) were used.  
* Only **mandatory flows** (register, login, purchase) were automated as required by the assignment.

## **Deliverables**

1. Cypress test script:  
   * cypress/e2e/register\_and\_purchase.spec.js  
2. README file (this document).  
3. Test Execution Evidence:  
   * Console logs or Cypress runner results.

