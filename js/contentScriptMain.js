var ShitList = require('./shitList.js');
var Anchors = require('./anchors.js');
var ContentScript = require('./contentScript.js');

var shitList = new ShitList();
var anchors = new Anchors();
var contentScript = new ContentScript();

anchors.setShitList(shitList);
anchors.updateAll();

contentScript.setAnchors(anchors);
contentScript.listen();
