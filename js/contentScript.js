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
  var handleMessage = this.handleMessage.bind(this);
  chrome.extension.onMessage.addListener(handleMessage);
};

module.exports = ContentScript;
