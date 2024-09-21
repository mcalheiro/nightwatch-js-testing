# Nightwatch.js

To start a project
```
npm init nightwatch PROJECT_NAME
```
Leave PROJECT_NAME empty if already in a folder

## Running tests
```
npx nightwatch test
```
You may also use the vscode plugin. Test is the director you chose in the setup. Output should look like:
```
Running   default: home.spec.js  

DevTools listening on ws://127.0.0.1:49707/devtools/browser/c3f75b31-7470-49a9-b9e3-3c791169f7d1
┌ ────────────────── √  default: home.spec.js  ────────────────────────────────────────┐
│                                                                                      │
│   [Home page] Test Suite                                                             │
│   ────────────────────────────────────────────                                       │
│   Using: chrome (128.0.6613.139) on WINDOWS.                                         │
│   – Should have the correc title                                                     │
│   √ Testing if element's <h1> inner text equals 'Introducing Nightwatch v3' (35ms)   │
│   √ default [Home page] Should have the correc title (851ms)                         │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
 Wrote HTML report file to: D:\Users\Mauricio\Desktop\nightwatch-js-testing\tests_output\nightwatch-html-report\index.html
```