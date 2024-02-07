/**
 * This purpose of this script is to ...
 */

const IS_LOCAL_ENV = typeof $env === "undefined" || $env === null;

// Uncomment the following lines to hide console messages
console.log = function() {}
console.debug = function() {}

/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-api-tests
 * for details.
 */

var retryCount = 0;

/**
 * For local development
 */
if (IS_LOCAL_ENV) {
  global._isApiTest = true;
  require("../lib/simulator");
  var $secure = new Object();
  $secure.MY_SECURE_CRED = "Top Secret";
}

var assert = require("assert");


/**
 * The scripts main function and starting point.
 */
async function main() {
  try {
    let response = await $http.post(
      "http://httpbin.org/post",
      // Post data
      {
        json: {
          widgetType: "gear",
          widgetCount: 10
        }
      });

      assert.equal(response.statusCode, 200, "Expected a 200 OK response");
      let body = JSON.parse(response.body);
      let data = JSON.parse(body.data);
      console.log("Response body:", body.data);
      assert.equal(data.widgetType, "gear", "Expected a gear widget type");
      assert.equal(data.widgetCount, 10, "Expected 10 widgets");
  } catch (error) {
    console.error(error.message);
  }

  console.log("main(): Script execution completed");
}


// Let's get this party started
main();
