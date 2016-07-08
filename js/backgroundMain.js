var shitList = require('./shitList.js');
var background = require('./background.js');

background.setShitList(shitList);

background.listen();
background.updateAllAnchors();
