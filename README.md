![Shit List](/promo/promo-tile1400x560.png)
## A shit list for the web.

## Description

This is a Chrome extension to help you avoid shitty websites. When a website offends you, by playing a sound somewhere that you cannot find, by forcing extra pageviews via faulty "slideshows", or any other annoying behavior, you can add it to your Shit List. Just click the Shit List icon. Next time you hover a link to that site, you will be warned with a Shit indicator. You can still visit the site as the goal of this extension is to serve as a mild deterrent, not a debilitating blacklist.

## Motivation

Ads power the web by incentivizing content creation with monetization strategies that are less exclusive than pay-walls and other schemes. Unfortunately, this strategy isn't always designed with a fair balance of a user's experience in mind. This extension aims to respect ad sponsored content by simply reminding people to boycott sites that offend them the most. This way, a user can still support sites that they like, but the user can decide where they draw the line in terms of abuse.

## Installation

### The easy way
  * [The extension can be installed from the Chrome Web Store](https://chrome.google.com/webstore/detail/shit-list/cbgmjlonfpfcpicneheiiibdklibdpcf)

### The open source way
  1. Dependencies
    * nodejs
    * npm
    * jQuery
  2. Clone the project
    * ```git clone https://github.com/snapfractalpop/shit-list```
    * ```cd shit-list```
  3. Install dependencies
    * ```npm install```
  4. Add jquery
    * Add jquery to js/libs/ folder in project root (mkdir libs/ if necessary)
    * Make sure manifest.json content_scripts -> js references whatever version you install
  5. Build it
    * ```chmod +x build.sh```
    * ```./build.sh```
  5. Add to Chrome
    * Go to chrome://extensions and make sure Developer mode is checked
    * Click "Load unpacked extension..." and select the shit-list folder

## Tests

1. Install as above (through step 4)
2. Run tests
  * ```mocha``` or ```npm test```
3. Watch nyan cat nyan it's way across the screen


## Contributors

* Fork the project
* Send a pull request

## License

[ISC License](https://opensource.org/licenses/ISC)
