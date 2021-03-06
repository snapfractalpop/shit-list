var ContentScript = require('../js/contentScript.js');
var contentScript;

function setup() {
  var anchors = {
    updateAll: sinon.stub()
  };
  contentScript.setAnchors(anchors);
};

describe('contentScript', function () {
  beforeEach(function () {
    contentScript = new ContentScript();
  });

  describe('#setAnchors', function () {
    it('sets anchors', function () {
      var anchors = {};
      contentScript.setAnchors(anchors);
      expect(contentScript._anchors).to.equal(anchors);
    });
  });

  describe('#getAnchors', function () {
    it('sets anchors', function () {
      var anchors = {};
      contentScript.setAnchors(anchors);
      contentScript._anchors = anchors;
      expect(contentScript.getAnchors()).to.equal(anchors);
    });
  });

  describe('#handleMessage', function () {
    beforeEach(setup);

    it('does not call updateAll for non-updated messages', function () {
      var spy = contentScript.getAnchors().updateAll;
      var message = {};
      contentScript.handleMessage(message);
      expect(spy).to.not.have.been.called;
    });

    it('calls updateAll for update messages', function () {
      var spy = contentScript.getAnchors().updateAll;
      var message = 'update';
      contentScript.handleMessage(message);
      expect(spy).to.have.been.called;
    });
  });

  describe('#listen', function () {
    beforeEach(function () {
      contentScript.handleMessage = sinon.stub();
    });

    it('calls bound handleMessage', function () {
      var spy = chrome.extension.onMessage.addListener;
      spy.reset();
      contentScript.listen();

      var callback = spy.args[0][0];
      callback();

      expect(contentScript.handleMessage).to.have.been.calledOn(contentScript);
    });
  });
});
