const { by } = require("protractor");
const { mapAsync } = require("../async.utils");
const { TextInputComponent } = require("../components/text-input.component");
const { ButtonComponent } = require("../components/button.component");
const { TodoItemComponent } = require("../components/todo-item.component");

class TodoPage {
  constructor(browser) {
    this.browser = browser;

    this.addItemInput = new TextInputComponent(
      browser,
      browser.element(by.qa("add-item__input"))
    );
    this.addButton = new ButtonComponent(
      browser,
      browser.element(by.qa("add-item__btn"))
    );
  }

  async addItem(value) {
    await this.addItemInput.setValue(value);
    await this.addButton.click();
  }

  getItem(index) {
    const element = this.browser.element(by.qa(`todo-item__${index}`));
    return new TodoItemComponent(this.browser, element);
  }

  async getAllItems() {
    const elements = await this.browser.element.all(by.qaPrefix("todo-item__"));
    return elements.map(element => {
      return new TodoItemComponent(this.browser, element);
    });
  }

  async getAllItemsSummary() {
    const items = await this.getAllItems();
    return mapAsync(items, item => item.getSummary());
  }

  setItemDone(index, done) {
    const todoItem = new TodoItemComponent(
      this.browser,
      this.browser.element(by.qa(`todo-item__${index}`))
    );

    return todoItem.setDone(done);
  }
}

module.exports = {
  TodoPage
};
