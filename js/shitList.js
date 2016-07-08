var shitList = {};

shitList.shitList = function (hostname) {
  var values = {};
  values[hostname] = true;

  return new Promise(function (resolve, reject) {
    chrome.storage.sync.set(values, function (results) {
      resolve();
    });
  });
}.bind(shitList);

shitList.deShitList = function (hostname) {

  return new Promise(function (resolve, reject) {
    chrome.storage.sync.remove(hostname, function (results) {
      resolve();
    });
  });
}.bind(shitList);

module.exports = shitList;
