var ContentScript = function () {};

ContentScript.prototype.setAnchors = function (anchors) {
  this._anchors = anchors;
};

ContentScript.prototype.getAnchors = function (anchors) {
  return this._anchors;
};

ContentScript.prototype.handleMessage = function (message) {
  if (message == 'update') {
    this.getAnchors().updateAll();
  }
};

ContentScript.prototype.listen = function () {
  chrome.extension.onMessage.addListener(this.handleMessage.bind(this));
};

module.exports = ContentScript;
