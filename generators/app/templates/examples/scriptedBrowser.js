const IS_LOCAL_ENV = typeof $env === "undefined" || $env === null;

// Uncomment the following lines to hide console messages
// console.log = function() {}
// console.debug = function() {}

/**
 * For local development
 */
if (IS_LOCAL_ENV) {
  require("../lib/simulator");
  var $secure = new Object();
  $secure.MY_SECURE_CRED = "Top Secret";
}

/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-scripted-browsers
 * for details.
 */

/** Config **/
var colors = require('colors');
const ELEMENT_WAIT_TIMER = 10000;
/** Config **/

var assert = require("assert");

async function doStuff() {
  await $webDriver.get("http://example.com");

  let headerElementCss = "h1";
  console.log('Getting header element'.green);
  await $webDriver.wait($selenium.until.elementLocated($selenium.By.css(headerElementCss)), ELEMENT_WAIT_TIMER, colors.red('Failed to locate element: ' + headerElementCss));  //wait for element to be located on page (instead of using sleep)
  let text = await $webDriver.findElement($selenium.By.css(headerElementCss)).getText(); //find element on page
  console.log('Checking H1 title'.green);
  assert.equal("Example Domain", text, "Page H1 title did not match");
  console.log('H1 title correct'.green);
  
  let hrefCss = "div > p > a";
  console.log('Getting header element'.green);
  await $webDriver.wait($selenium.until.elementLocated($selenium.By.css(hrefCss)), ELEMENT_WAIT_TIMER, colors.red('Failed to locate element: ' + hrefCss))  //wait for element to be located on page (instead of using sleep)
  let link = await $webDriver.findElement($selenium.By.css(hrefCss)).getAttribute("href"); //find element on page
  console.log('Checking href'.green);
  assert.equal("https://www.iana.org/domains/example", link, "More information link did not match");  
  console.log('href correct'.green);
}

/**
 * The scripts main function and starting point.
 */
async function main() {
  let response = await doStuff();

  console.log('main(): Script execution completed');
}


// Let's get this party started
main();