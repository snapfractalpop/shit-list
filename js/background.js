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

background.getActiveTabHostname = function () {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tab) {
      resolve(this.getHostnameFromTab(tab[0]));
    }.bind(this));
  }.bind(this));
}.bind(background);

background.isActiveTabShitListed = function () {
  return this.getActiveTabHostname().then(function (hostname) {
    return this.getShitList().isShitListed(hostname);
  }.bind(this));
}.bind(background);

background.updateIcon = function () {
  return this.isActiveTabShitListed().then(function (isShitListed) {
    chrome.browserAction.setIcon({
      path: isShitListed ? background.ACTIVE_ICON : background.INACTIVE_ICON
    });

    chrome.browserAction.setTitle({
      title: isShitListed ? background.ACTIVE_TOOLTIP : background.INACTIVE_TOOLTIP
    });
  });;
}.bind(background);

background.updateAllAnchors = function () {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({}, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, "update");
      }
      resolve();
    });
  });
}.bind(background);

background.handleBrowserActionClick = function (tab) {
  var hostname = this.getHostnameFromTab(tab);
  return this.getShitList().toggle(hostname).then(function () {
    this.updateIcon();
    this.updateAllAnchors();
  }.bind(this));
}.bind(background);

background.listen = function () {
  chrome.tabs.onActivated.addListener(this.updateIcon);
  chrome.tabs.onUpdated.addListener(this.handleTabUpdated);
  chrome.browserAction.onClicked.addListener(this.handleBrowserActionClick);
}.bind(background);

background.handleTabUpdated = function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    this.updateIcon();
  }
}.bind(background);

module.exports = background;
