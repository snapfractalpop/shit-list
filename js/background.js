var Background = function () {};

Background.INACTIVE_ICON = {
  '16': 'images/poop-inactive16.png',
  '19': 'images/poop-inactive19.png',
  '32': 'images/poop-inactive32.png',
  '38': 'images/poop-inactive38.png',
  '48': 'images/poop-inactive48.png',
  '64': 'images/poop-inactive38.png',
  '128': 'images/poop-inactive128.png'
};

Background.ACTIVE_ICON = {
  '16': 'images/poop16.png',
  '19': 'images/poop19.png',
  '32': 'images/poop32.png',
  '38': 'images/poop38.png',
  '48': 'images/poop48.png',
  '64': 'images/poop64.png',
  '128': 'images/poop128.png'
};

Background.INACTIVE_TOOLTIP = "Add this site to your shit list.";
Background.ACTIVE_TOOLTIP = "Remove this site from your shit list.";

Background.prototype.setShitList = function (shitList) {
  this._shitList = shitList;
};

Background.prototype.getShitList = function (shitList) {
  return this._shitList;
};

Background.prototype.getHostnameFromTab = function (tab) {
  return new URL(tab.url).hostname;
};

Background.prototype.getActiveTabHostname = function () {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tab) {
      resolve(this.getHostnameFromTab(tab[0]));
    }.bind(this));
  }.bind(this));
};

Background.prototype.isActiveTabShitListed = function () {
  return this.getActiveTabHostname().then(function (hostname) {
    return this.getShitList().isShitListed(hostname);
  }.bind(this));
};

Background.prototype.updateIcon = function () {
  return this.isActiveTabShitListed().then(function (isShitListed) {
    chrome.browserAction.setIcon({
      path: isShitListed ?
        Background.ACTIVE_ICON : Background.INACTIVE_ICON
    });

    chrome.browserAction.setTitle({
      title: isShitListed ?
        Background.ACTIVE_TOOLTIP : Background.INACTIVE_TOOLTIP
    });
  });;
};

Background.prototype.updateAllAnchors = function () {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({}, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, "update");
      }
      resolve();
    });
  });
};

Background.prototype.handleBrowserActionClick = function (tab) {
  var hostname = this.getHostnameFromTab(tab);
  return this.getShitList().toggle(hostname).then(function () {
    this.updateIcon();
    this.updateAllAnchors();
  }.bind(this));
};

Background.prototype.handleTabUpdated = function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    this.updateIcon();
  }
};

Background.prototype.listen = function () {
  var updateIcon = this.updateIcon.bind(this);
  var handleTabUpdated = this.handleTabUpdated.bind(this);
  var handleBrowserActionClick = this.handleBrowserActionClick.bind(this);

  chrome.tabs.onActivated.addListener(updateIcon);
  chrome.tabs.onUpdated.addListener(handleTabUpdated);
  chrome.browserAction.onClicked.addListener(handleBrowserActionClick);
};

module.exports = Background;
