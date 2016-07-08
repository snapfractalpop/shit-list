var contentScript = {};

contentScript.setAnchors = function (anchors) {
  this._anchors = anchors;
}.bind(contentScript);

contentScript.getAnchors = function (anchors) {
  return this._anchors;
}.bind(contentScript);

module.exports = contentScript;
