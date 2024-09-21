describe('Home page', function() {
    it('Should have the correc title', function(browser) {
        browser.navigateTo('/').assert.textEquals('h1', 'Introducing Nightwatch v3')
    })
})