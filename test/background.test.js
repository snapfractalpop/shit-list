var background = require('../js/background.js');

function setup() {
  var shitList = {
    isShitListed: sinon.stub().resolves(false),
    toggle: sinon.stub().resolves()
  };
  background.setShitList(shitList);
};


describe('background', function () {
  it('has an inactive icon', function () {
    expect(background.INACTIVE_ICON).to.exist;
  });

  it('has an active icon', function () {
    expect(background.ACTIVE_ICON).to.exist;
  });

  it('has an inactive tooltip', function () {
    expect(background.INACTIVE_TOOLTIP).to.exist;
  });

  it('has an active tooltip', function () {
    expect(background.ACTIVE_TOOLTIP).to.exist;
  });

  describe('#setShitList', function () {
    it('sets the shitList', function () {
      var shitList = {};
      background.setShitList(shitList);
      expect(background._shitList).to.equal(shitList);
    });
  });

  describe('#getShitList', function () {
    it('gets the shitList', function () {
      var shitList = {};
      background._shitList = shitList;
      expect(background.getShitList()).to.equal(shitList);
    });
  });

  describe('#getHostnameFromTab', function () {
    it('returns the hostname of the tab', function () {
      var tab = {url: 'http://example.com'};
      var hostname = background.getHostnameFromTab(tab);
      expect(hostname).to.equal('example.com');
    });
  });

  describe('#getActiveTabHostname', function () {
    it('returns a promise', function () {
      var promise = background.getActiveTabHostname();
      expect(promise).to.be.a('Promise');
    });

    it('queries for the active tab', function () {
      background.getActiveTabHostname();
      expect(chrome.tabs.query).to.have.been.calledWith({
        active: true,
        lastFocusedWindow: true
      });
    });

    it('calls getHostnameFromTab with active tab', function () {
      var tab = {url: 'http://example.com'};
      chrome.tabs.query.yields([tab]);
      background.getHostnameFromTab = sinon.stub();
      background.getActiveTabHostname();
      expect(background.getHostnameFromTab).to.have.been.calledWith(tab);
    });

    it('resolves the hostname of the active tab', function () {
      background.getHostnameFromTab.returns('example.com');
      var promise = background.getActiveTabHostname();
      return expect(promise).to.eventually.equal('example.com');
    });
  });

  describe('#isActiveTabShitListed', function () {
    beforeEach(function () {
      setup();
      background.getActiveTabHostname = sinon.stub().resolves('example.com');
    });

    it('returns a promise', function () {
      var promise = background.isActiveTabShitListed();
      expect(promise).to.be.a('Promise');
    });

    it('calls getActiveTabHostname', function () {
      background.isActiveTabShitListed();
      expect(background.getActiveTabHostname).to.have.been.called;
    });

    it('calls shitList.isShitListed with hostname', function () {
      var shitList = background.getShitList();
      return background.isActiveTabShitListed().then(function () {
        expect(shitList.isShitListed).to.have.been.calledWith('example.com');
      });
    });

    it('resolves false when not shitListed', function () {
      var promise = background.isActiveTabShitListed();
      return expect(promise).to.eventually.equal(false);
    });

    it('resolves true when shitListed', function () {
      background.getShitList().isShitListed.resolves(true);
      var promise = background.isActiveTabShitListed();
      return expect(promise).to.eventually.equal(true);
    });
  });

  describe('#updateIcon', function () {
    beforeEach(function () {
      background.isActiveTabShitListed = sinon.stub().resolves(false);
    });

    it('returns a promise', function () {
      var promise = background.updateIcon();
      expect(promise).to.be.a('Promise');
    });

    it('calls isActiveTabShitListed', function () {
      background.updateIcon();
      expect(background.isActiveTabShitListed).to.have.been.called;
    });

    it('sets inactive icon when not shitListed', function () {
      return background.updateIcon().then(function () {
        expect(chrome.browserAction.setIcon).to.have.been.calledWith({
          path: background.INACTIVE_ICON
        });
      });
    });

    it('sets active icon when shitListed', function () {
      background.isActiveTabShitListed.resolves(true);

      return background.updateIcon().then(function () {
        expect(chrome.browserAction.setIcon).to.have.been.calledWith({
          path: background.ACTIVE_ICON
        });
      });
    });

    it('sets inactive tooltip when not shitListed', function () {
      return background.updateIcon().then(function () {
        expect(chrome.browserAction.setTitle).to.have.been.calledWith({
          title: background.INACTIVE_TOOLTIP
        });
      });
    });

    it('sets active tooltip when shitListed', function () {
      background.isActiveTabShitListed.resolves(true);

      return background.updateIcon().then(function () {
        expect(chrome.browserAction.setTitle).to.have.been.calledWith({
          title: background.ACTIVE_TOOLTIP
        });
      });
    });

  });

  describe('#updateAllAnchors', function () {
    it('returns a promise', function () {
      var promise = background.updateAllAnchors();
      expect(promise).to.be.a('Promise');
    });

    it('queries all tabs', function () {
      background.updateAllAnchors();
      expect(chrome.tabs.query).to.have.been.calledWith({});
    });

    it('sends update message to all tabs', function () {
      chrome.tabs.sendMessage.reset();

      chrome.tabs.query.yields([
          {id: '0'},
          {id: '1'},
          {id: '2'},
      ]);

      return background.updateAllAnchors().then(function () {
        expect(chrome.tabs.sendMessage.callCount).to.equal(3);
        expect(chrome.tabs.sendMessage).to.have.been.calledWith('0', 'update');
        expect(chrome.tabs.sendMessage).to.have.been.calledWith('1', 'update');
        expect(chrome.tabs.sendMessage).to.have.been.calledWith('2', 'update');
      });
    });
  });

  describe('#handleBrowserActionClick', function () {
    var tab;

    beforeEach(function () {
      tab = {};
      background.updateIcon = sinon.stub().resolves();
      background.updateAllAnchors = sinon.stub().resolves();
    });

    it('returns a promise', function () {
      var promise = background.handleBrowserActionClick(tab);
      expect(promise).to.be.a('Promise');
    });

    it('calls getHostnameFromTab with active tab', function () {
      background.handleBrowserActionClick(tab);
      expect(background.getHostnameFromTab).to.have.been.calledWith(tab);
    });

    it('toggles the hostname on the shitList', function () {
      var shitList = background.getShitList();
      background.getHostnameFromTab.returns('example.com');
      background.handleBrowserActionClick(tab);
      expect(shitList.toggle).to.have.been.calledWith('example.com');
    });

    it('calls updateIcon', function () {
      return background.handleBrowserActionClick(tab).then(function () {
        expect(background.updateIcon).to.have.been.called;
      });
    });

    it('calls updateAllAnchors', function () {
      return background.handleBrowserActionClick(tab).then(function () {
        expect(background.updateAllAnchors).to.have.been.called;
      });
    });
  });

  describe('#handleTabUpdated', function () {
    var tabId, changeInfo, tab;

    beforeEach(function () {
      background.updateIcon = sinon.stub();
    });

    it('does not update icon if url has not changed', function () {
      var changeInfo = {};
      background.handleTabUpdated(tabId, changeInfo, tab);
      expect(background.updateIcon).to.not.have.been.called;
    });

    it('updates icon if url has changed', function () {
      var changeInfo = {url: 'example.com'};
      background.handleTabUpdated(tabId, changeInfo, tab);
      expect(background.updateIcon).to.have.been.called;
    });
  });

  describe('#listen', function () {
    beforeEach(function () {
      background.updateIcon = {};
      background.handleTabUpdated = {};
      background.handleBrowserActionClick = {};
    });

    it('calls update icon tab activation', function () {
      var spy = chrome.tabs.onActivated.addListener;
      background.listen();
      expect(spy).to.have.been.calledWith(background.updateIcon);
    });

    it('handles tab updates', function () {
      var spy = chrome.tabs.onUpdated.addListener;
      background.listen();
      expect(spy).to.have.been.calledWith(background.handleTabUpdated);
    });

    it('handles browser action clicks', function () {
      var spy = chrome.browserAction.onClicked.addListener;
      background.listen();
      expect(spy).to.have.been.calledWith(background.handleBrowserActionClick);
    });
  });
});
