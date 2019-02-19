const { by, ExpectedConditions } = require("protractor");

class TodoItemComponent {
  constructor(browser, root) {
    this.browser = browser;
    this.root = root;

    this.checkboxElement = root.element(by.qa("item__done-chkbox"));
    this.labelElement = root.element(by.qa("item__label"));
  }

  async isDone() {
    return (await this.checkboxElement.getAttribute("checked")) === "true";
  }

  async setDone(done) {
    const isDone = await this.isDone();
    if (isDone !== done) {
      await this.browser.wait(
        ExpectedConditions.elementToBeClickable(this.checkboxElement)
      );
      await this.checkboxElement.click();
    }
  }

  getLabel() {
    return this.labelElement.getText();
  }

  async getSummary() {
    return {
      isDone: await this.isDone(),
      label: await this.getLabel()
    };
  }
}

module.exports = {
  TodoItemComponent
};
