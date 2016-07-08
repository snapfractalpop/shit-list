var contentScript = {};

contentScript.setAnchors = function (anchors) {
  this._anchors = anchors;
}.bind(contentScript);

contentScript.getAnchors = function (anchors) {
  return this._anchors;
}.bind(contentScript);

contentScript.handleMessage = function (message) {
  if (message == 'update') {
    this.getAnchors().updateAll();
  }
}.bind(contentScript);

contentScript.listen = function () {
  chrome.extension.onMessage.addListener(this.handleMessage);
}.bind(contentScript);

module.exports = contentScript;
