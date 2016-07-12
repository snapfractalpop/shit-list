var ShitList = require('./shitList.js');
var shitList = new ShitList();

shitList.getAll().then(function (shitList) {
  if (shitList.length <= 0) {
    shitList = ["Your shit list is empty."];
  }

  shitList.forEach(function (hostname) {
    var $item = $('<li>').text(hostname);
    $('.list').append($item);
  });
});
