var shitList = require('./shitList.js');
var anchors = require('./anchors.js');
var contentScript = require('./contentScript.js');

anchors.setShitList(shitList);
anchors.updateAll();

contentScript.setAnchors(anchors);
contentScript.listen();
