var anchors = require('../js/anchors.js');
var $a;

function setup() {
  var shitList = {
    isShitListed: sinon.stub().resolves(false)
  };
  anchors.setShitList(shitList);

  $a = $('<a>');
};

describe('Anchors', function () {
  describe('#setShitList', function () {
    it('sets the shitList', function () {
      var shitList = {};
      anchors.setShitList(shitList);
      expect(anchors._shitList).to.equal(shitList);
    });
  });

  describe('#getShitList', function () {
    it('gets the shitList', function () {
      var shitList = {};
      anchors._shitList = shitList;
      expect(anchors.getShitList()).to.equal(shitList);
    });
  });

  describe('#getHostname', function () {
    before(setup);

    it('gets the hostname from anchor', function () {
      $a.prop('href','http://example.com/example');
      var hostname = anchors.getHostname($a);
      expect(hostname).to.equal('example.com');
    });
  });

  describe('#updateAnchor', function () {
    before(setup);

    it('returns a promise', function () {
      var promise = anchors.updateAnchor($a);
      expect(promise).to.be.a('Promise');
    });

    it('calls getHostname', function () {
      anchors.getHostname = sinon.spy();
      anchors.updateAnchor($a);
      expect(anchors.getHostname).to.have.been.called;
    });

    it('calls isShitListed with hostname', function () {
      anchors.getHostname = sinon.stub().returns('example.com');
      anchors.updateAnchor($a);
      expect(anchors._shitList.isShitListed).to.have.been.calledWith('example.com');
    });

    it('adds shit-list class to shitListed anchors', function () {
      anchors._shitList.isShitListed.resolves(true);

      return anchors.updateAnchor($a).then(function () {
        expect($a).to.have.$class('shit-list');
      });
    });

    it('removes shit-list class from deShitListed anchors', function () {
      anchors._shitList.isShitListed.resolves(false);
      $a.addClass('shit-list');

      return anchors.updateAnchor($a).then(function () {
        expect($a).to.not.have.$class('shit-list');
      });
    });
  });

  describe('#updateAll', function () {
    beforeEach(function () {
      anchors.updateAnchor = sinon.stub();
    });

    afterEach(function () {
      $('body').empty();
    });

    it('returns a promise', function () {
      var promise = anchors.updateAll();
      expect(promise).to.be.a('Promise');
    });

    it('calls updateAnchor on all anchor elements', function () {
      for (var i = 0; i < 10; i++) {
        $a = $('<a>');
        $('body').append($a);
      }

      anchors.updateAll();
      expect(anchors.updateAnchor.callCount).to.equal(10);
    });

    it('rejects if one update rejects', function () {
      anchors.updateAnchor.onCall(0).resolves();
      anchors.updateAnchor.onCall(1).rejects();
      anchors.updateAnchor.resolves();

      for (var i = 0; i < 3; i++) {
        $a = $('<a>');
        $('body').append($a);
      }

      return expect(anchors.updateAll()).to.be.rejected;
    });

    it('resolves when anchors have been updated', function () {
      anchors.updateAnchor.resolves();

      for (var i = 0; i < 3; i++) {
        $a = $('<a>');
        $('body').append($a);
      }

      return expect(anchors.updateAll()).to.be.fulfilled;
    });
  });

});
