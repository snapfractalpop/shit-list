var anchors = {};

anchors.setShitList = function (shitList) {
  this._shitList = shitList;
}.bind(anchors);

anchors.getShitList = function (shitList) {
  return this._shitList;
}.bind(anchors);

module.exports = anchors;
