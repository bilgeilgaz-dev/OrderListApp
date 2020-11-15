module.exports = {
  command: async function (id) {
    this.waitForElementPresent(`#${id}`)
    this.click(`#${id}`)
  }
}