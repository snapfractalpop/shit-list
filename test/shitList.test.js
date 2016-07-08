var shitList = require('../js/shitList.js');

describe('ShitList', function () {
  beforeEach(function (done) {
    chrome.storage.sync.clear(done);
  });

  describe('#shitList', function () {
    it('returns a promise', function () {
      var promise = shitList.shitList('example.com');
      expect(promise).to.be.a('Promise');
    });

    it('uses chrome storage sync', function () {
      chrome.storage.sync.set.reset();
      shitList.shitList('example.com');
      expect(chrome.storage.sync.set).to.have.been.called;
    });

    it('adds a hostname to the shitlist', function () {
      expect(chrome.storage.sync._store).to.not.have.property('example.com');

      return shitList.shitList('example.com').then(function () {
        expect(chrome.storage.sync._store).to.have.property('example.com');
      });
    });
  });

  describe('#deShitList', function () {
    beforeEach(function () {
      chrome.storage.sync._store['example.com'] = true;
    });

    it('returns a promise', function () {
      var promise = shitList.deShitList('example.com');
      expect(promise).to.be.a('Promise');
    });

    it('uses chrome storage sync', function () {
      chrome.storage.sync.remove.reset();
      shitList.deShitList('example.com');
      expect(chrome.storage.sync.remove).to.have.been.called;
    });

    it('removes a hostname from the shitlist', function () {
      return shitList.deShitList('example.com').then(function () {
        expect(chrome.storage.sync._store).to.not.have.property('example.com');
      });
    });
  });

  describe('#isShitListed', function () {
    it('returns a promise', function () {
      var promise = shitList.isShitListed('example.com');
      expect(promise).to.be.a('Promise');
    });

    it('resolves to false when not shitListed', function () {
      expect(shitList.isShitListed('example.com')).to.eventually.equal(false);
    });

    it('resolves to true when shitListed', function () {
      chrome.storage.sync._store['example.com'] = true;
      return expect(shitList.isShitListed('example.com')).to.eventually.equal(true);
    });
  });

  describe('#toggle', function () {
    beforeEach(function () {
      shitList.isShitListed = sinon.stub().resolves(false);
      shitList.shitList = sinon.stub().resolves();
      shitList.deShitList = sinon.stub().resolves();
    });

    it('returns a promise', function () {
      var promise = shitList.toggle('example.com');
      expect(promise).to.be.a('Promise');
    });

    it('calls isShitListed', function () {
      shitList.toggle('example.com');
      expect(shitList.isShitListed).to.have.been.calledWith('example.com');
    });

    it('shitLists hostname when not shitListed', function () {
      return shitList.toggle('example.com').then(function () {
        expect(shitList.shitList).to.have.been.calledWith('example.com');
      });
    });

    it('deShitLists hostname when shitListed', function () {
      shitList.isShitListed.resolves(true);

      return shitList.toggle('example.com').then(function () {
        expect(shitList.deShitList).to.have.been.calledWith('example.com');
      });
    });
  });

  describe('#getAll', function () {
    it('returns a promise', function () {
      var promise = shitList.getAll();
      expect(promise).to.be.a('Promise');
    });

    it('resolves all shitListed hostnames', function () {
      chrome.storage.sync._store['example.com'] = true;
      chrome.storage.sync._store['www.example.com'] = true;
      chrome.storage.sync._store['reddit.com'] = true;
      chrome.storage.sync._store['dailymail.co.uk'] = true;

      return expect(shitList.getAll()).to.eventually.include.members([
          'example.com',
          'www.example.com',
          'reddit.com',
          'dailymail.co.uk'
      ]);
    });
  });
});
