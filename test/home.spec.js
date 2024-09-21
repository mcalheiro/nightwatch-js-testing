describe('Home page', function() {

    beforeEach(function(browser) {
        browser.navigateTo('/').window.maximize()
    })

    afterEach(function(browser) {
        browser.end()
    })

    it('Should have the correct title', function(browser) {
        browser.assert.textEquals('h1', 'Introducing Nightwatch v3')
    })

    it('Should lead the the installation page when click on Get Started', function(browser) {
        browser.element.findByText('Get Started').click()
        browser.element.findByPlaceholderText('Filter by title').waitUntil('visible')
        browser.element.find('h1').getText().assert.equals('Install Nightwatch')
        browser.assert.titleEquals('Getting Started | Developer Guide | Nightwatch.js')
        browser.assert.urlContains('nightwatchjs.org/guide/quickstarts')
        browser.element.findByPlaceholderText('Filter by title').getAttribute('autocomplete').assert.equals('off')
    })

    it('Should allow search and show correct results', function(browser) {
        browser.element.find('#docsearch').click()
        browser.element.find('.DocSearch-Modal').waitUntil('visible')

        const searchInput = browser.element.findByPlaceholderText('Search docs')

        searchInput.sendKeys('frame')
        browser.element.find('.DocSearch-Dropdown-Container').assert.present()
        searchInput.sendKeys([browser.Keys.ARROW_DOWN, browser.Keys.ENTER])
        browser.element.find('h1').getText().assert.contains('.frameParent')
    })
})