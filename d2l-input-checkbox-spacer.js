/**
`d2l-input-checkbox-spacer`
Spacer to align secondary content with checkboxes

@demo demo/d2l-input-checkbox.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-input-checkbox-spacer">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
				padding-left: 1.7rem;
				margin-bottom: 0.9rem;
			}
			:host(:dir(rtl)) {
				padding-right: 1.7rem;
				padding-left: 0;
			}
		</style>
		<slot></slot>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-input-checkbox-spacer'
});
