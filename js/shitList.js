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

module.exports = shitList;
