var ShitList = function () {};

ShitList.prototype.shitList = function (hostname) {
  var values = {};
  values[hostname] = true;

  return new Promise(function (resolve, reject) {
    chrome.storage.sync.set(values, function (results) {
      resolve();
    });
  });
};

ShitList.prototype.deShitList = function (hostname) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.remove(hostname, function (results) {
      resolve();
    });
  });
};

ShitList.prototype.isShitListed = function (hostname) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get(hostname, function (results) {
      if (results[hostname]) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

ShitList.prototype.toggle = function (hostname) {
  return this.isShitListed(hostname).then(function (isShitListed) {
    isShitListed ? this.deShitList(hostname) : this.shitList(hostname);
  }.bind(this));
};

ShitList.prototype.getAll = function () {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get(null, function (results) {
      resolve(Object.keys(results));
    });
  });
};

module.exports = ShitList;
