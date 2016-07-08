global.chai = require('chai');
global.sinon = require('sinon');
require('sinon-as-promised');
global.sinonChai = require('sinon-chai');
global.chaiJq = require('chai-jq');
global.chaiAsPromised = require('chai-as-promised');
global.expect = chai.expect;
global.chrome = require('chrome-stub');
global.URL = require('url-parse');
chai.use(sinonChai);
chai.use(chaiJq);
chai.use(chaiAsPromised);

global.jsdom = require('jsdom');
global.$ = require('jquery')(jsdom.jsdom().parentWindow);

chrome.extension = {
  onMessage: {
    addListener: sinon.stub()
  }
};
