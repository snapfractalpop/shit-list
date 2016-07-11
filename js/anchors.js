var Anchors = function () {};

Anchors.prototype.setShitList = function (shitList) {
  this._shitList = shitList;
};

Anchors.prototype.getShitList = function (shitList) {
  return this._shitList;
};

Anchors.prototype.getHostname = function ($a) {
  try {
    var url = new URL($a.prop('href'));
  } catch (e) {
    return '';
  }
  return url.hostname;
};

Anchors.prototype.updateAnchor = function ($a) {
  var hostname = this.getHostname($a);

  return this.getShitList().isShitListed(hostname).then(function (isShitListed) {
    if (isShitListed) {
      $a.addClass('shit-list');
    } else {
      $a.removeClass('shit-list');
    }
  });
};

Anchors.prototype.updateAll = function () {
  var promises = [];

  $('a').each(function (index, element) {
    promises.push(this.updateAnchor($(element)));
  }.bind(this));

  return Promise.all(promises);
};

module.exports = Anchors;
