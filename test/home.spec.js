const guide = require("../pages/guide");

describe('Home page', function() {

    before(function (browser) {
        const isMac = process.platform === 'darwin';
        browser.commandKey = isMac ? browser.Keys.COMMAND : browser.Keys.CONTROL;
    })

    beforeEach(function (browser) {
        browser.window.maximize()
        browser.page.home().navigate()
    })

    afterEach(function (browser) {
        browser.end()
    })

    it('Should have the correct title', function (browser) {
        browser.assert.textEquals('h1', 'Introducing Nightwatch v3')
    })

    it('Should lead the the installation page when click on Get Started', function (browser) {
        browser.page.home().getStarted()
        const guidePage = browser.page.guide()
        guidePage.waitLoading()
        guidePage.basicAssertions()
        guidePage.section.sidebar.element.find('@text_filter').getAttribute('autocomplete').assert.equals('off')
    })

    it('Should allow search and show correct results', function (browser) {
        browser.element.find('#docsearch').click()
        browser.element.find('.DocSearch-Modal').waitUntil('visible')

        const searchInput = browser.element.findByPlaceholderText('Search docs')

        searchInput.sendKeys('frame')
        browser.element.find('.DocSearch-Dropdown-Container').assert.present()
        searchInput.sendKeys([browser.Keys.ARROW_DOWN, browser.Keys.ENTER])
        browser.element.find('h1').getText().assert.contains('.frameParent')
    })

    it('Should copy the installation command when click the copy button', function (browser) {
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
        browser.pause(1000)
        browser.element.findByText('{Client Side Execution}').click()  
        browser.assert.titleMatches('Getting Started')      
    })

    it('Should allow for substack subscription', function (browser) {
        const iframeSelector = '.footer__wrapper-inner-social-subscribe iframe'
        browser.perform(function() {
            return this.actions().move({
                origin: browser.element.find(iframeSelector)
            })
        })
        browser.element.find(iframeSelector).setAttribute('id', 'iframe-test-nightwatch')
        browser.frame('iframe-test-nightwatch')
        browser.element.find('input[type=email]').sendKeys('test@nightwatch.org')
        browser.element.find('button[type=submit]').click()
        browser.ensure.alertIsPresent()
        browser.alerts.accept()
        browser.element.findByText('Sign out').assert.present()
    })

    it('Should open github repo when click on github icon', async function (browser) {
        browser.element.find('ul.navigation-list.social li:nth-child(2) a').click()
        browser.waitUntil(async function () {
            const windowHandles = await browser.window.getAllHandles()
            return windowHandles.length === 2
        })
        const allWindows = await browser.window.getAllHandles()
        browser.window.switchTo(allWindows[1])
        browser.assert.urlContains('github.com/nightwatchjs')
    })

    it('Should verify the location in Korea, Netherlands and Portugal', function (browser) {
        const locations = [
            {
                location: { latitude: 41.157965, longitude: -8.629101, accuracy: 100 },
                country: 'Portugal'
            },
            {
                location: { latitude: 52.357080, longitude: 4.881613, accuracy: 100 },
                country: 'Netherlands'
            },
            {
                location: { latitude: 37.551986, longitude: 126.988936, accuracy: 100 },
                country: 'Korea'
            }
        ]

        locations.forEach(loc => {
            browser.setGeolocation(loc.location).navigateTo('https://www.where-am-i.co/')
            browser.waitUntil(async function () {
                const geo_dom_class = await browser.element.find('#geolocation_address').getAttribute('class').value
                return !geo_dom_class.includes('text-muted')
            })
            browser.element.find('#geolocation_address').getText().assert.contains(loc.country)
        })
    })
})