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

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = (new JSDOM(''));

global.document = window.document;
global.$ = require('jquery')(window);

chrome.extension = {
  onMessage: {
    addListener: sinon.stub()
  }
};
