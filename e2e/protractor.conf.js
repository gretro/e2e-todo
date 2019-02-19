const HtmlReporter = require("protractor-beautiful-reporter");

exports.config = {
  directConnect: true,
  specs: ["**/*.spec.js"],
  baseUrl: "http://localhost:3000",
  SELENIUM_PROMISE_MANAGER: false,
  capabilities: {
    browserName: "chrome"
  },
  onPrepare: () => {
    global.jasmine.getEnv().addReporter(
      new HtmlReporter({
        baseDirectory: "reports"
      }).getJasmine2Reporter()
    );

    const { by } = require("protractor");

    by.addLocator("qa", (qaTag, parentElement) => {
      const parent = parentElement || document;
      return parent.querySelector(`[data-qa="${qaTag}"]`);
    });

    by.addLocator("qaPrefix", (prefix, parentElement) => {
      const parent = parentElement || document;
      return parent.querySelectorAll(`[data-qa^="${prefix}"]`);
    });
  }
};
