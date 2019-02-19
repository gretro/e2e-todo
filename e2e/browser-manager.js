const { browser } = require("protractor");

let preparedBrowser = null;

async function getBrowser() {
  if (!preparedBrowser) {
    preparedBrowser = await prepareBrowser();
  }

  return preparedBrowser;
}

async function prepareBrowser() {
  await browser.waitForAngularEnabled(false);
  await browser.get("/");

  return browser;
}

module.exports = {
  getBrowser
};
