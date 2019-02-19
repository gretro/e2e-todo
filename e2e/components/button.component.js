const { ExpectedConditions } = require("protractor");

class ButtonComponent {
  constructor(browser, root) {
    this.browser = browser;
    this.root = root;
  }

  async click() {
    await this.browser.wait(ExpectedConditions.elementToBeClickable(this.root));
    await this.root.click();
  }
}

module.exports = {
  ButtonComponent
};
