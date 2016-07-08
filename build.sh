#!/bin/bash
browserify js/backgroundMain.js | uglifyjs -cm > js/backgroundBundle.min.js
browserify js/contentScriptMain.js | uglifyjs -cm > js/contentScriptBundle.min.js
zip ../shitList.zip ./manifest.json
zip -r ../shitList.zip ./css
zip -r ../shitList.zip ./images
zip -r ../shitList.zip ./js/libs
zip ../shitList.zip ./js/backgroundBundle.min.js
zip ../shitList.zip ./js/contentScriptBundle.min.js
