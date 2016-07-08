#!/bin/bash
browserify js/backgroundMain.js | uglifyjs -cm > js/backgroundBundle.min.js
browserify js/contentScriptMain.js | uglifyjs -cm > js/contentScriptBundle.min.js
