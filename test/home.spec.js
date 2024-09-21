describe('Home page', function() {

    before(function(browser) {
        const isMac = process.platform === 'darwin';
        browser.commandKey = isMac ? browser.Keys.COMMAND : browser.Keys.CONTROL;
    })

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

    it('Should copy the installation command when click the copy button', function(browser) {
        browser.element.findByText('Copy').click()
        browser.element.find('#docsearch').click()
        const inputElement = browser.element.find('.DocSearch-Modal .DocSearch-Form input')
        inputElement.sendKeys([browser.commandKey, 'v'])
        inputElement.getAttribute('value').assert.contains('npm init nightwatch')
    })

    it('Should change with client script', async function (browser) {
        const changeText = '{Client Side Execution}'
        browser.executeScript(function (new_text) {
            const getStartedButton = document.querySelector('.hero__action-button--get-started')
            getStartedButton.innerHTML = new_text
            getStartedButton.style.background = '#ff7f2b'
            document.querySelector('header .navigation-list').style.display = 'none'
            document.querySelector('header .navigation__logo').style.width = '900px'
        }, [changeText])
        browser.pause(4000)
        browser.element.findByText('{Client Side Execution}').click()  
        browser.assert.titleMatches('Getting Started')      
    })
})