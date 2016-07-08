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

shitList.isShitListed = function (hostname) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get(hostname, function (results) {
      if (results[hostname]) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}.bind(shitList);

module.exports = shitList;
