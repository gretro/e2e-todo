const { getBrowser } = require("./browser-manager");
const { TodoPage } = require("./pages/todo.page");

const SLOW_DOWN = true;

describe("Todo list", () => {
  it("When creating an item, should be added to the list", async () => {
    const browser = await getBrowser();
    const page = new TodoPage(browser);

    const initialItems = await page.getAllItemsSummary();

    await slowDown();

    await page.addItem("Create Protractor brownbag");

    await slowDown();

    const items = await page.getAllItemsSummary();
    expect(items.length).toBe(
      initialItems.length + 1,
      "should have added the item into the list"
    );

    await slowDown();
  });

  it("When completing an item, should be reported as completed", async () => {
    const browser = await getBrowser();
    const page = new TodoPage(browser);

    const items = await page.getAllItemsSummary();
    const itemIndex = items.length - 1;
    const isLastDone = items[itemIndex].isDone;

    await slowDown();

    await page.setItemDone(itemIndex, !isLastDone);

    const updatedItem = page.getItem(itemIndex);
    expect(await updatedItem.isDone()).toBe(true, "item should be complete");

    await slowDown();
  });
});

// Slow down for the purpose of the demo
function slowDown() {
  if (SLOW_DOWN) {
    return delay(1500);
  }

  return Promise.resolve();
}

function delay(timeout) {
  return new Promise(res => {
    setTimeout(res, timeout);
  });
}
