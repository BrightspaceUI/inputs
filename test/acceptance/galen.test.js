/* global polymerTests, LocalBrowserFactory, SauceBrowserFactory, importClass, org, Thread */
/* eslint no-invalid-this: 0 */
'use strict';

importClass(org.openqa.selenium.Keys);

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

var mainlineEndpoint = 'http://localhost:8081/components/d2l-inputs';
var oneDotXEndpoint = 'http://localhost:8000/components/d2l-inputs';

var rtlScript = 'document.body.setAttribute("dir", "rtl");';

var getDateTimeInput = 'document.querySelector("d2l-input-datetime").$$("d2l-input-date").$$(".d2l-input")';
var inputDateTimeClickScript = getDateTimeInput + '.dispatchEvent(new MouseEvent("click"))';
var inputDateTimeTypeScript = getDateTimeInput + '.value= "01/30/1990"';
var inputDateTimeHitEnterScript = getDateTimeInput + '.dispatchEvent(new KeyboardEvent("keydown", {bubbles: true, cancelable: true, key:"Enter", char:"Enter", keyCode: 13}))';
var datetimeEndpoint = '/demo/d2l-input-datetime-galen.html';
var datetimeSpec = 'test/acceptance/d2l-input-datetime.gspec';

var inputTimeClickScript = 'document.querySelector("d2l-input-time").$$(".d2l-input").dispatchEvent(new FocusEvent("focus"))';
var timeEndpoint = '/demo/d2l-input-time.html';
var timeSpec = 'test/acceptance/d2l-input-time.gspec';

polymerTests(browsers, function(test) {

	function datetimeTestHelper(rtl, shadow, open, mobile, endpointName, baseEndpoint) {
		var name = endpointName + '-d2l-input-datetime';
		var queryParams = [];
		name = rtl ? name + '-rtl' : name;
		name = open ? name + '-open' : name;
		name = shadow ? name + '-shadow' : name;
		name = mobile ? name + '-mobile' : name;

		rtl && queryParams.push('dir=rtl');
		shadow && queryParams.push('dom=shadow');
		mobile && queryParams.push('width=280px');

		var testEndpoint = baseEndpoint + datetimeEndpoint;
		if (queryParams.length) {
			testEndpoint += '?' + queryParams.join('&');
		}
		var tags = [];
		tags.push(endpointName);
		rtl && tags.push('rtl') || tags.push('ltr');
		open && tags.push('open') || tags.push('closed');
		mobile && tags.push('mobile') || tags.push('desktop');

		var cb;
		if (open) {
			cb = function(opts, cb) {
				if (rtl) {
					opts.driver.executeScript(rtlScript);
				}
				Thread.sleep(50);
				opts.driver.executeScript(inputDateTimeClickScript);
				Thread.sleep(50);
				opts.driver.executeScript(inputDateTimeTypeScript);
				Thread.sleep(50);
				opts.driver.executeScript(inputDateTimeHitEnterScript);
				Thread.sleep(50);
				cb();
			};
		}

		var testFunc = shadow ? test.shadow : test;

		testFunc(name, {
			endpoint: testEndpoint,
			spec: datetimeSpec,
			size: mobile ? '375x667' : '1024x768',
			tags: tags
		}, cb);
	}

	function runTests(name, baseEndpoint) {
		datetimeTestHelper(false, false, false, false, name, baseEndpoint);
		datetimeTestHelper(false, false, true, false, name, baseEndpoint);
		datetimeTestHelper(true, false, false, false, name, baseEndpoint);
		datetimeTestHelper(true, false, true, false, name, baseEndpoint);
		datetimeTestHelper(false, true, false, false, name, baseEndpoint);
		datetimeTestHelper(false, true, true, false, name, baseEndpoint);
		datetimeTestHelper(true, true, false, false, name, baseEndpoint);
		datetimeTestHelper(true, true, true, false, name, baseEndpoint);
		datetimeTestHelper(false, false, false, true, name, baseEndpoint);
		datetimeTestHelper(false, false, true, true, name, baseEndpoint);
		datetimeTestHelper(true, false, false, true, name, baseEndpoint);
		datetimeTestHelper(true, false, true, true, name, baseEndpoint);

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
