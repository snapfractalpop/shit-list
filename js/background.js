var background = {};

background.INACTIVE_ICON = {
  '16': 'images/poop-inactive16.png',
  '19': 'images/poop-inactive19.png',
  '32': 'images/poop-inactive32.png',
  '38': 'images/poop-inactive38.png',
  '48': 'images/poop-inactive48.png',
  '64': 'images/poop-inactive38.png',
  '128': 'images/poop-inactive128.png'
};

background.ACTIVE_ICON = {
  '16': 'images/poop16.png',
  '19': 'images/poop19.png',
  '32': 'images/poop32.png',
  '38': 'images/poop38.png',
  '48': 'images/poop48.png',
  '64': 'images/poop64.png',
  '128': 'images/poop128.png'
};

background.INACTIVE_TOOLTIP = "Add this site to your shit list.";
background.ACTIVE_TOOLTIP = "Remove this site from your shit list.";

background.setShitList = function (shitList) {
  this._shitList = shitList;
}.bind(background);

background.getShitList = function (shitList) {
  return this._shitList;
}.bind(background);

background.getHostnameFromTab = function (tab) {
  return new URL(tab.url).hostname;
}.bind(background);

module.exports = background;
