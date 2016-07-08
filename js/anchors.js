var anchors = {};

anchors.setShitList = function (shitList) {
  this._shitList = shitList;
}.bind(anchors);

anchors.getShitList = function (shitList) {
  return this._shitList;
}.bind(anchors);

anchors.getHostname = function ($a) {
  try {
    var url = new URL($a.prop('href'));
  } catch (e) {
    return '';
  }
  return url.hostname;
}.bind(anchors);

module.exports = anchors;
