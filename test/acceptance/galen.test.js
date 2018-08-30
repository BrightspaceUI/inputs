/* global polymerTests, LocalBrowserFactory, SauceBrowserFactory */
/* eslint no-invalid-this: 0 */
'use strict';

var browsers = {
	chrome: new LocalBrowserFactory({ browser: 'chrome', size: '768x768' }),
	chromeWindows: new SauceBrowserFactory({
		browser: 'Chrome',
		platform: 'WIN10',
		size: '1400x900'
	}),
	/*
	firefoxWindows: new SauceBrowserFactory({
		browser: 'Firefox',
		platform: 'WIN10',
		size: '1400x900'
	}),*//*
	ie11Windows: new SauceBrowserFactory({
		browser: 'internet explorer',
		version: '11',
		platform: 'WIN10',
		size: '1400x900'
	}),
	edgeWindows: new SauceBrowserFactory({
		browser: 'microsoftedge',
		platform: 'WIN10',
		size: '1400x900',
		tags: ['no-d2l-shadow']
	}),
	chromeMac: new SauceBrowserFactory({
		browser: 'Chrome',
		platform: 'SIERRA',
		*//* crashes during screenshot command on > 2.24
		 *			https://bugs.chromium.org/p/chromedriver/issues/detail?id=1770# *//*
		desiredCapabilities: {
			chromedriverVersion: '2.24'
		}
	}),
	safariMac: new SauceBrowserFactory({
		browser: 'Safari',
		platform: 'EL_CAPITAN',
		size: '1400x900',
		tags: ['no-d2l-shadow']
	})*/
};

var mainlineEndpoint = 'http://localhost:8081/components/d2l-inputs/demo';
var oneDotXEndpoint = 'http://localhost:8000/components/d2l-inputs/demo';

var inputTimeClickScript = 'document.querySelector("d2l-input-time").$$(".d2l-input").dispatchEvent(new FocusEvent("focus"))';
var rtlScript = 'document.body.setAttribute("dir", "rtl");';
var timeEndpoint = '/demo/d2l-input-time.html';
var timeSpec = 'test/acceptance/d2l-input-time.gspec';

polymerTests(browsers, function(test) {

	function runTests(name, baseEndpoint) {
		test(name + '-d2l-input-time', {
			endpoint: baseEndpoint + timeEndpoint + '?wc-shadydom',
			spec: timeSpec,
			tags: [name, 'closed', 'ltr']
		});
		test.shadow(name + '-d2l-input-time-shadow', {
			endpoint: baseEndpoint + timeEndpoint + '?dom=shadow',
			spec: timeSpec,
			tags: [name, 'closed', 'ltr']
		});
		test(name + '-d2l-input-time-open', {
			endpoint: baseEndpoint + timeEndpoint + '?wc-shadydom',
			spec: timeSpec,
			tags: [name, 'open', 'ltr']
		}, function(opts, cb) {
			opts.driver.executeScript(inputTimeClickScript);
			cb();
		});
		test.shadow(name + '-d2l-input-time-open-shadow', {
			endpoint: baseEndpoint + timeEndpoint + '?dom=shadow',
			spec: timeSpec,
			tags: [name, 'open', 'ltr']
		}, function(opts, cb) {
			opts.driver.executeScript(inputTimeClickScript);
			cb();
		});
		test(name + '-d2l-input-time-rtl', {
			endpoint: baseEndpoint + timeEndpoint + '?wc-shadydom&dir=rtl',
			spec: timeSpec,
			tags: [name, 'closed', 'rtl']
		}, function(opts) {
			opts.driver.executeScript(rtlScript);
		});
		test.shadow(name + '-d2l-input-time-rtl-shadow', {
			endpoint: baseEndpoint + timeEndpoint + '?dir=rtl&dom=shadow',
			spec: timeSpec,
			tags: [name, 'closed', 'rtl']
		}, function(opts) {
			opts.driver.executeScript(rtlScript);
		});
		test(name + '-d2l-input-time-open-rtl', {
			endpoint: baseEndpoint + timeEndpoint + '?wc-shadydom&dir=rtl',
			spec: timeSpec,
			tags: [name, 'open', 'rtl']
		}, function(opts, cb) {
			opts.driver.executeScript(rtlScript);
			opts.driver.executeScript(inputTimeClickScript);
			cb();
		});
	}

	runTests('mainline', mainlineEndpoint);
	runTests('1.x', oneDotXEndpoint);
});
