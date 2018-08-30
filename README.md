# d2l-inputs
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/BrightspaceUI/inputs)
[![Bower version][bower-image]][bower-url]
[![Build status][ci-image]][ci-url]

Polymer-based web components for D2L inputs

## Installation

`d2l-inputs` can be installed from [Bower][bower-url]:
```shell
bower install d2l-inputs
```

## Usage

Include the [webcomponents.js](http://webcomponents.org/polyfills/) "lite" polyfill (for browsers who don't natively support web components):
```html
<head>
	<script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
</head>
```
Then import the components below you want to use.

### d2l-input-checkbox and d2l-input-checkbox-spacer

<img src="/images/checkbox.gif?raw=true" width="350">

Import `d2l-input-checkbox.html` and `d2l-input-checkbox-spacer.html`:

```html
<head>
	<link rel="import" href="bower_components/d2l-inputs/d2l-input-checkbox.html">
	<link rel="import" href="bower_components/d2l-inputs/d2l-input-checkbox-spacer.html">
</head>
```

A `<d2l-input-checkbox>` custom element can now be used in your application. The label
for your checkbox should be placed inside the element:

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../d2l-typography/d2l-typography.html">
    <link rel="import" href="d2l-input-checkbox.html">
    <custom-style include="d2l-typography">
      <style is="custom-style" include="d2l-typography"></style>
    </custom-style>
    <style>
      html {
        font-size: 20px;
        font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
      }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<d2l-input-checkbox>Label for checkbox</d2l-input-checkbox>
```

Many of the same attributes from native `<input type="checkbox">` are available:

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../d2l-typography/d2l-typography.html">
    <link rel="import" href="d2l-input-checkbox.html">
    <custom-style include="d2l-typography">
      <style is="custom-style" include="d2l-typography"></style>
    </custom-style>
    <style>
      html {
        font-size: 20px;
        font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
      }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<d2l-input-checkbox checked>Checked checkbox</d2l-input-checkbox>
```

To hide the label when space is limited, use the `aria-label` attribute to
provide an accessible label:

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../d2l-typography/d2l-typography.html">
    <link rel="import" href="d2l-input-checkbox.html">
    <custom-style include="d2l-typography">
      <style is="custom-style" include="d2l-typography"></style>
    </custom-style>
    <style>
      html {
        font-size: 20px;
        font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
      }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<d2l-input-checkbox aria-label="label for checkbox"></d2l-input-checkbox>
```

To align following related content below checkboxes, the `d2l-input-checkbox-spacer` element can be used.

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../d2l-typography/d2l-typography.html">
    <link rel="import" href="d2l-input-checkbox.html">
    <link rel="import" href="d2l-input-checkbox-spacer.html">
    <custom-style include="d2l-typography">
      <style is="custom-style" include="d2l-typography"></style>
    </custom-style>
    <style>
      html {
        font-size: 20px;
        font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
      }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<d2l-input-checkbox>Label for checkbox</d2l-input-checkbox>
<d2l-input-checkbox-spacer style="color:#999999;">
  Additional content can go here and will<br>
  also line up nicely with the checkbox.
</d2l-input-checkbox-spacer>
```

### d2l-input-search

<img src="/images/search.gif?raw=true" width="700">

Import `d2l-input-search.html`:

```html
<head>
	<link rel="import" href="bower_components/d2l-inputs/d2l-input-search.html">
</head>
```

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../d2l-typography/d2l-typography.html">
    <link rel="import" href="d2l-input-search.html">
    <custom-style include="d2l-typography">
      <style is="custom-style" include="d2l-typography"></style>
    </custom-style>
    <style>
      html {
        font-size: 20px;
        font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
      }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<d2l-input-search label="Search" value="Apples"
   placeholder="Search for fruit">
</d2l-input-search>
```

The `d2l-input-search` component dispatches an event (`d2l-input-search-searched`) when a search is performed:

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../d2l-typography/d2l-typography.html">
    <link rel="import" href="d2l-input-search.html">
    <custom-style include="d2l-typography">
      <style is="custom-style" include="d2l-typography"></style>
    </custom-style>
    <style>
      html {
        font-size: 20px;
        font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
      }
    </style>
		<d2l-input-search label="Search" value="Apples"
		   placeholder="Search for fruit">
		</d2l-input-search>
		<script>var search = document.body;</script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<script>
	search.addEventListener('d2l-input-search-searched', (e) => {
	    // e.detail.value contains the search value
	    console.log(e.detail.value);
	});
</script>
```
When the input is cleared, the same event will be fired with an empty value.

### d2l-input-time

<img src="/images/time.gif?raw=true" width="550">

Import `d2l-input-time.html`:

```html
<head>
	<link rel="import" href="bower_components/d2l-inputs/d2l-input-time.html">
</head>
```

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../d2l-typography/d2l-typography.html">
    <link rel="import" href="d2l-input-time.html">
    <custom-style include="d2l-typography">
      <style is="custom-style" include="d2l-typography"></style>
    </custom-style>
    <style>
      html {
        font-size: 20px;
        font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
      }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<label for="input-time-combobox">Time input:</label>
<d2l-input-time
	id="input-time"
	time-interval="{{interval}}"
	hours="{{hours}}"
	minutes="{{minutes}}"
	locale="{{locale}}"
	timezone="{{timezone}}"
></d2l-input-time>
```

The `d2l-input-time` component dispatches an event (`d2l-input-time-changed`) when a time is set:

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../d2l-typography/d2l-typography.html">
    <link rel="import" href="d2l-input-time.html">
    <custom-style include="d2l-typography">
      <style is="custom-style" include="d2l-typography"></style>
    </custom-style>
    <style>
      html {
        font-size: 20px;
        font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
      }
    </style>
		<label for="input-time-combobox">Time input:</label>
		<d2l-input-time
			id="input-time"
			time-interval="{{interval}}"
			hours="{{hours}}"
			minutes="{{minutes}}"
			locale="{{locale}}"
			timezone="{{timezone}}"
    ></d2l-input-time>
    <script>var time = document.body;</script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<script>
	time.addEventListener('d2l-input-time-changed', (e) => {
	    // e.detail.value contains the search value
	    console.log(e.detail.value);
	});
</script>
```

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

If you don't have it already, install the [Polymer CLI](https://www.polymer-project.org/3.0/docs/tools/polymer-cli) globally:

```shell
npm install -g polymer-cli
```

To start a [local web server](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#serve) that hosts the demo page and tests:

```shell
polymer serve
```

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run lint
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#tests):

```shell
npm run test:polymer:local
```

To lint AND run local unit tests:

```shell
npm test
```

[bower-url]: http://bower.io/search/?q=d2l-inputs
[bower-image]: https://badge.fury.io/bo/d2l-inputs.svg
[ci-url]: https://travis-ci.org/BrightspaceUI/inputs
[ci-image]: https://travis-ci.org/BrightspaceUI/inputs.svg?branch=master
