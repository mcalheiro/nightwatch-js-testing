module.exports = {
    url: '/',

    elements: {
        getStartedButton: {
            selector: '//*[text()="Get Started"]',
            locateStrategy: 'xpath'
        }
    },

    commands: {
        getStarted() {
            return this.element.find('@getStartedButton').click()
        }
    }
}