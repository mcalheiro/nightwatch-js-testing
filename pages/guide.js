module.exports = {
    url: '/guide',

    sections: {
        sidebar: {
            selector: '#doc-sidebar-nav',
            elements: {
                text_filter: {
                    selector: 'input[placeholder*="Filter by title"]',
                }
            }
        }

    },

    commands: {
        waitLoading() {
            this.section.sidebar.element.find('@text_filter').waitUntil('visible')
            return this
        },
        basicAssertions() {
            this.element.find('h1').getText().assert.equals('Install Nightwatch')
            this.assert.titleEquals('Getting Started | Developer Guide | Nightwatch.js')
            this.assert.urlContains('nightwatchjs.org/guide/quickstarts')
            return this
        }
    }
}