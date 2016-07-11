var ShitList = require('./shitList.js');
var Background = require('./background.js');

var shitList = new ShitList();
var background = new Background();

background.setShitList(shitList);

background.listen();
background.updateAllAnchors();
