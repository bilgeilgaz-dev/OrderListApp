// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {

  'Header is visible': browser => {
    browser
    .url('http://localhost:8080/')
    .waitForElementVisible('#settings')
    .assert.elementPresent('#settings')
    .assert.containsText('h4', 'Users')
    .end()
  },

  'User-list, user details and todos details are visible': browser => {
    browser
    .url('http://localhost:8080/')
    .waitForElementVisible('.user-list-row')
    .assert.elementPresent('.user-list-row')
    .waitAndClick('.user-list-row:nth-of-type(1)')
    .waitForElementVisible('.name')
    .waitForElementVisible('.todo-row')
    .waitAndClick('.todo-row')
    .waitForElementVisible('.todos-list-row')
    .waitAndClick('.todos-list-row:nth-of-type(1)')
    .waitForElementVisible('.status')
    .end()
  },

  'Setting changes work': browser => {
    browser
    .url('http://localhost:8080/')
    .waitForElementVisible('#settings')
    .assert.elementPresent('#settings')
    .waitAndClick('#settings')
    .waitForElementVisible('.color')
    .waitForElementVisible('#red')
    .selectRadioButton('red')
    .waitForElementVisible('#monospace', 15000)
    .selectRadioButton('monospace')
    .waitForElementVisible('.btn')
    .waitAndClick('.btn')
    .waitAndClick('#settings')
    .end()
  },
}
