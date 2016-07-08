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

anchors.updateAnchor = function ($a) {
  var hostname = this.getHostname($a);

  return this.getShitList().isShitListed(hostname).then(function (isShitListed) {
    if (isShitListed) {
      $a.addClass('shit-list');
    } else {
      $a.removeClass('shit-list');
    }
  });
}.bind(anchors);

anchors.updateAll = function () {
  var promises = [];

  $('a').each(function (index, element) {
    promises.push(anchors.updateAnchor($(element)));
  });

  return Promise.all(promises);
}.bind(anchors);

module.exports = anchors;
