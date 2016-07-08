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

shitList.toggle = function (hostname) {
  return this.isShitListed(hostname).then(function (isShitListed) {
    isShitListed ? this.deShitList(hostname) : this.shitList(hostname);
  }.bind(this));
}.bind(shitList);

shitList.getAll = function (callback) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get(null, function (results) {
      resolve(Object.keys(results));
    });
  });
}.bind(shitList);

module.exports = shitList;
