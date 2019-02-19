const { ExpectedConditions } = require("protractor");

class TextInputComponent {
  constructor(browser, root) {
    this.browser = browser;
    this.root = root;
  }

  async setValue(value) {
    await this.browser.wait(ExpectedConditions.presenceOf(this.root));

    await this.root.clear();
    await this.root.sendKeys(value);
  }
}

module.exports = {
  TextInputComponent
};
