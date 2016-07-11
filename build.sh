#!/bin/bash
browserify js/backgroundMain.js | uglifyjs -cm > js/backgroundBundle.min.js
browserify js/contentScriptMain.js | uglifyjs -cm > js/contentScriptBundle.min.js
rm -f build/shitList-release.zip
mkdir -p build
zip build/shitList-release.zip ./manifest.json
zip -r build/shitList-release.zip ./css
zip -r build/shitList-release.zip ./images
zip -r build/shitList-release.zip ./js/libs
zip build/shitList-release.zip ./js/backgroundBundle.min.js
zip build/shitList-release.zip ./js/contentScriptBundle.min.js
