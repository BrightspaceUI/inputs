/**
`d2l-input-text`
Polymer-based web component for D2L text inputs

@demo demo/d2l-input-text.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-colors/d2l-colors.js';
import 'd2l-polymer-behaviors/d2l-focusable-behavior.js';
import './d2l-input-text-behavior.js';
import './d2l-input-shared-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-input-text">
	<template strip-whitespace="">
		<style include="d2l-input-styles">
			:host {
				display: inline-block;
				width: 100%
			}
			input {
				position: relative;
				font-family: inherit;
			}
		</style>
		<input
			aria-invalid$="[[ariaInvalid]]"
			aria-label$="[[ariaLabel]]"
			aria-labelledby$="[[ariaLabelledby]]"
			autofocus$="[[autofocus]]"
			class="d2l-input d2l-focusable"
			disabled$="[[disabled]]"
			list$="[[list]]"
			max$="[[max]]"
			maxlength$="[[maxlength]]"
			min$="[[min]]"
			minlength$="[[minlength]]"
			name$="[[name]]"
			on-change="_handleChange"
			on-keypress="_handleKeypress"
			pattern$="[[pattern]]"
			placeholder$="[[placeholder]]"
			readonly$="[[readonly]]"
			required$="[[required]]"
			size$="[[size]]"
			step$="[[step]]"
			tabindex$="[[tabIndex]]"
			type$="[[type]]"
			value="{{value::input}}">
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-input-text',

	behaviors: [
		D2L.PolymerBehaviors.FocusableBehavior,
		D2L.PolymerBehaviors.Text.InputTextBehavior
	],

	properties: {
		/**
		 * Gets or sets the [aria-describedby attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute),
		 * which contains the IDs of the elements that describe the input.
		 */
		ariaDescribedby: {
			type: String
		},
		/**
		 * List of pre-defined options to suggest to the user. The value must be the id of a <datalist> element in the same document.
		 */
		list: {
			type: String
		},
		/**
		 * The maximum numeric value for this item, which must not be less than its minimum (min attribute) value.
		 */
		max: {
			type: String
		},
		/**
		 * The minimum numeric value for this item, which must not be greater than its maximum (max attribute) value.
		 */
		min: {
			type: String
		},
		/**
		 * A regular expression that the control's value is checked against.
		 */
		pattern: {
			type: String
		},
		/**
		 * Indicates that the form will not be submitted when the user presses enter within the input cell.
		 */
		preventSubmit: {
			type: Boolean,
			value: false,
		},
		/**
		 * The initial size of the control as an integer number of characters.
		*/
		size: {
			type: Number
		},
		/**
		 * Works with the min and max attributes to limit the increments at which a numeric value can be set.
		*/
		step: {
			type: String
		},
		/**
		 * Gets or sets the text input type, one of "text" (default), "number", "email", "password", "url".
		 */
		type: {
			type: String,
			value: 'text'
		},
		/**
		 * Value of the input.
		 */
		value: {
			type: String,
			notify: true
		}
	},
	_handleChange: function() {
		// Change events don't automatically propagate across shadow DOM boundaries
		this.dispatchEvent(new CustomEvent(
			'change',
			{bubbles: true, composed: false}
		));
	},
	_handleKeypress: function(e) {
		if (this.preventSubmit && e.keyCode === 13) {
			e.preventDefault();
			return false;
		}
		return true;
	}
});
