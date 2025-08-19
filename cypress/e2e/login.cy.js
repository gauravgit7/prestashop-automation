describe('PrestaShop User Registration and Purchase Flow', () => {
  it('should register a new user and complete a purchase', () => {
    cy.visit('https://demo.prestashop.com/#/en/front', { timeout: 60000 });
    cy.get('#loadingMessage', { timeout: 30000 }).should('not.be.visible');

    cy.get('iframe[title="Frame of demo shop"]')
      .should('be.visible')
      .invoke('attr', 'src')
      .then((iframeSrc) => {
        expect(iframeSrc).to.not.be.undefined;
        const iframeOrigin = new URL(iframeSrc).origin;

        cy.origin(iframeOrigin, { args: { iframeSrc } }, ({ iframeSrc }) => {
          cy.visit(iframeSrc, { timeout: 60000 });
          // cypress/e2e/register_and_purchase.spec.js
describe('PrestaShop User Registration and Purchase Flow', () => {
  const user = {
    firstname: 'Gaurav',
    lastname: 'Subedi',
    password: 'Test$$$1234!',
    birthday: '05/31/1999',
  };

  beforeEach(() => {
    cy.visit('https://demo.prestashop.com/#/en/front', { timeout: 60000 });
    cy.get('#loadingMessage', { timeout: 30000 }).should('not.be.visible');
  });

  it('should register a new user and complete a purchase', () => {
    cy.get('iframe[title="Frame of demo shop"]')
      .should('be.visible')
      .invoke('attr', 'src')
      .then((iframeSrc) => {
        const iframeOrigin = new URL(iframeSrc).origin;

        cy.origin(
          iframeOrigin,
          { args: { iframeSrc, user } },
          ({ iframeSrc, user }) => {
            cy.visit(iframeSrc, { timeout: 60000 });

            // --- 1️⃣ Registration ---
            cy.contains('.user-info a', 'Sign in').should('be.visible').click();
            cy.contains('.no-account a', 'No account? Create one here').click();
            cy.get('h1').should('contain.text', 'Create an account');

            const email = `test${Date.now()}@example.com`;

            cy.get('#customer-form').within(() => {
              cy.get('input[name="id_gender"][value="1"]').check();
              cy.get('#field-firstname').type(user.firstname);
              cy.get('#field-lastname').type(user.lastname);
              cy.get('#field-email').type(email);
              cy.get('#field-password').type(user.password);
              cy.get('#field-birthday').type(user.birthday);

              cy.get('input[name="optin"]').check();
              cy.get('input[name="psgdpr"]').check();
              cy.get('input[name="newsletter"]').check();
              cy.get('input[name="customer_privacy"]').check();

              cy.get('button[data-link-action="save-customer"]').click();
            });

            cy.contains('.user-info a', 'Sign out', { timeout: 20000 }).should(
              'be.visible'
            );

            // --- 2️⃣ Product Selection ---
            cy.get('.js-product.product')
              .first()
              .find('a.product-thumbnail')
              .click();
            cy.get('button[data-button-action="add-to-cart"]').should(
              'be.visible'
            );

            // --- 3️⃣ Add to Cart ---
            cy.get('button[data-button-action="add-to-cart"]')
              .scrollIntoView()
              .should('be.visible')
              .trigger('mouseover')
              .trigger('mousedown')
              .trigger('mouseup')
              .click();

            // wait for modal & proceed
            cy.get('.modal-content', { timeout: 20000 }).should('be.visible');
            cy.get('.modal-content .cart-content-btn a.btn-primary').click();

            // --- 4️⃣ Checkout Page ---
            cy.get('a.btn-primary[href*="/order"]').should('be.visible').click();

            // --- 5️⃣ Address ---
            const randomAddress = `Street ${Math.floor(Math.random() * 1000)}`;
            cy.get('#checkout-addresses-step').within(() => {
              cy.get('#field-firstname').clear().type(user.firstname);
              cy.get('#field-lastname').clear().type(user.lastname);
              cy.get('#field-address1').type(randomAddress);
              cy.get('#field-city').type('Kathmandu');
              cy.get('#field-id_state').select(3);
              cy.get('#field-postcode').type('44600');

              cy.get('button.continue[name="confirm-addresses"]').click();
            });

            // --- 6️⃣ Delivery ---
            cy.get('button.continue[name="confirmDeliveryOption"]').click();

            // --- 7️⃣ Payment ---
            cy.get('#conditions_to_approve\\[terms-and-conditions\\]').check();
            cy.get('button.btn-primary:contains("Place order")').then(($btn) => {
              if (!$btn.is(':disabled')) {
                cy.wrap($btn).click();
              }
            });

            // --- 8️⃣ Assertion ---
            cy.contains('h3', 'Your order on').should('be.visible');
          }
        );
      });
  });
});

          cy.contains('.user-info a', 'Sign in')
            .should('be.visible')
            .click({ force: true });

          cy.contains('.no-account a', 'No account? Create one here', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

          cy.get('h1', { timeout: 20000 }).should('contain.text', 'Create an account');

          const timestamp = Date.now();
          cy.get('#customer-form').within(() => {
            cy.get('input[name="id_gender"][value="1"]').check({ force: true }); 
           cy.get('#field-firstname').type('Gaurav', { force: true });
            cy.get('#field-lastname').type('Subedi', { force: true });
            cy.get('#field-email').type(`test${timestamp}@example.com`, { force: true });
            cy.get('#field-password').type('Test$$$1234!', { force: true });
            cy.get('#field-birthday').type('05/31/1999', { force: true });

            cy.get('input[name="optin"]').check({ force: true });
            cy.get('input[name="psgdpr"]').check({ force: true });
            cy.get('input[name="newsletter"]').check({ force: true });
            cy.get('input[name="customer_privacy"]').check({ force: true });

            cy.get('button[data-link-action="save-customer"]').click({ force: true });
          });

          cy.contains('.user-info a', 'Sign out', { timeout: 20000 }).should('be.visible');

          cy.get('.js-product.product').first().find('a.product-thumbnail').click({ force: true });
           cy.wait(10000);

// --- 5️⃣ Add to Cart ---
cy.get('button[data-button-action="add-to-cart"]')
  .scrollIntoView()
  .should('be.visible')
  .trigger('mouseover')
  .trigger('mousedown')
  .trigger('mouseup')
  .click();

// wait for the modal to appear (or fallback with a timeout)
cy.get('.modal-content', { timeout: 20000 })
  .should('be.visible');

// --- 6️⃣ Proceed to Checkout ---
cy.get('.modal-content .cart-content-btn a.btn-primary')
  .should('be.visible')
  .click();





          cy.get('a.btn-primary[href*="/order"]', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

          const randomAddress = `Street ${Math.floor(Math.random() * 1000)}`;
          cy.get('#checkout-addresses-step').within(() => {
            cy.get('#field-firstname').clear().type('Gaurav', { force: true });
            cy.get('#field-lastname').clear().type('Subedi', { force: true });
            cy.get('#field-address1').type(randomAddress, { force: true });
            cy.get('#field-city').type('Kathmandu', { force: true });
            cy.get('#field-id_state').select(3, { force: true }); 
            cy.get('#field-postcode').type('44600', { force: true });

            cy.get('button.continue[name="confirm-addresses"]').click({ force: true });
          });

          cy.get('button.continue[name="confirmDeliveryOption"]', { timeout: 20000 }).click({ force: true });

          cy.get('#conditions_to_approve\\[terms-and-conditions\\]').check({ force: true });

          cy.get('button.btn-primary:contains("Place order")').then(($btn) => {
            if (!$btn.is(':disabled')) {
              cy.wrap($btn).click({ force: true });
            }
          });

          cy.contains('h3', 'Your order on').should('be.visible');
        });
      });
  });
});