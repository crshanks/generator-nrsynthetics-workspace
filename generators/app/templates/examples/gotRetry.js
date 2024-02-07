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


/**
 * Hook called on retry.
 */
async function logRetry() {
  console.error(new Date())
	console.error(`Retrying after error, retry #: ${retryCount++}`);
};


/**
 * Example for retry logic.
 */
async function get429() {
  const url = "https://httpbin.org/status/429";
  const options = {
    retry: {  // the retry delay increases exponentially as ((2 ** (attemptCount - 1)) * 1000) + noise, see (https://github.com/sindresorhus/got/blob/main/documentation/7-retry.md)
      limit: 4,  // defaults to 2 retries. A limit of 5 will result is delays of: 1, 2, 8, 16 seconds between the 4 retries following the original request.
    },
    hooks: {
      beforeRetry: [
        logRetry,
      ],
    },
  };
  const response = await $http.get(url, options);
  console.debug(response);
}


/**
 * The scripts main function and starting point.
 */
async function main() {
  try {
    retryCount = 0;
    await get429();
  } catch (error) {
    console.error(error.response.statusCode);
  }

  console.log("main(): Script execution completed");
}


// Let's get this party started
main();