module.exports = {
  command: async function (selector) {
    this.waitForElementPresent(selector, 10000);
    this.pause(100)
    this.click(selector)
    this.pause(100)
  }
}