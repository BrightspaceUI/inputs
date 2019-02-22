/**
`d2l-input-checkbox`
Polymer-based web component for D2L checkboxes

@demo demo/d2l-input-checkbox.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { useShadow } from '@polymer/polymer/lib/utils/settings.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-input-checkbox">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
				margin-bottom: 0.9rem;
			}
			:host([aria-label]) {
				display: inline-block;
				margin-bottom: 0;
			}

			label {
				display: inline-block;
				white-space: nowrap;
			}

			.d2l-input-checkbox-label {
				@apply --d2l-body-compact-text;
				color: var(--d2l-color-ferrite);
				display: inline-block;
				margin-left: 0.5rem;
				vertical-align: middle;
				white-space: normal;
			}

			:host(:dir(rtl)) .d2l-input-checkbox-label {
				margin-right: 0.5rem;
				margin-left: 0;
			}
			:host([aria-label]) .d2l-input-checkbox-label {
				margin-left: 0;
				margin-right: 0;
			}
			:host(:dir(rtl))[aria-label] .d2l-input-checkbox-label {
				margin-left: 0;
				margin-right: 0;
			}

			input[type="checkbox"] {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				background-position: center center;
				background-repeat: no-repeat;
				background-size: 1.2rem 1.2rem;
				border-radius: 0.3rem;
				border-style: solid;
				box-sizing: border-box;
				display: inline-block;
				height: 1.2rem;
				margin: 0;
				padding: 0;
				transition-duration: 0.5s;
				transition-timing-function: ease;
				transition-property: background-color, border-color;
				vertical-align: middle;
				width: 1.2rem;
			}
			input[type="checkbox"]:checked {
				background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23565A5C%22%20d%3D%22M8.4%2016.6c.6.6%201.5.6%202.1%200l8-8c.6-.6.6-1.5%200-2.1-.6-.6-1.5-.6-2.1%200l-6.9%207-1.9-1.9c-.6-.6-1.5-.6-2.1%200-.6.6-.6%201.5%200%202.1l2.9%202.9z%22/%3E%3C/svg%3E%0A");
			}
			input[type="checkbox"]:indeterminate {
				background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23565A5C%22%20d%3D%22M7.5%2C11h9c0.8%2C0%2C1.5%2C0.7%2C1.5%2C1.5l0%2C0c0%2C0.8-0.7%2C1.5-1.5%2C1.5h-9C6.7%2C14%2C6%2C13.3%2C6%2C12.5l0%2C0%0A%09C6%2C11.7%2C6.7%2C11%2C7.5%2C11z%22/%3E%3C/svg%3E%0A");
			}
			input[type="checkbox"],
			input[type="checkbox"]:hover:disabled {
				background-color: var(--d2l-color-regolith);
				border-color: var(--d2l-color-mica);
				border-width: 1px;
			}
			input[type="checkbox"]:hover,
			input[type="checkbox"]:focus,
			input[type="checkbox"].d2l-input-checkbox-focus {
				border-color: var(--d2l-color-celestine);
				border-width: 2px;
				outline-width: 0;
			}
			input[type="checkbox"][aria-invalid="true"] {
				border-color: var(--d2l-color-cinnabar);
			}

			input[type="checkbox"]:disabled,
			:host([disabled]) .d2l-input-checkbox-label {
				opacity: 0.5;
			}
		</style>
		<label>
			<input type="checkbox" class$="[[_getInputClass(tri)]]" aria-label$="[[ariaLabel]]" aria-labelledby$="[[ariaLabelledby]]" checked="{{checked}}" disabled$="[[disabled]]" name$="[[name]]" on-change="_handleChange" on-click="_onClick" on-focus="_handleFocus" value$="[[value]]">
			<span class="d2l-input-checkbox-label"><slot></slot></span>
		</label>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-input-checkbox',
	properties: {
		/**
		 * Fired when the checked state changes due to user interaction.
		 *
		 * @event change
		*/

		/**
		 * Fired when the checkbox receives focus.
		 *
		 * @event focus
		*/

		/**
		 * Gets or sets the [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)
		 * attribute, which defines a string label for the checkbox. Must be used when
		 * an explicit label (through child elements) isn't provided.
		 */
		ariaLabel: {
			type: String,
			reflectToAttribute: true
		},
		/**
		 * Gets or sets the [aria-labelledby attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute),
		 * which contains the IDs of labels for the checkbox.
		 */
		ariaLabelledby: {
			type: String
		},
		/**
		 * Gets or sets the state of the checkbox, `true` is checked and `false` is unchecked.
		 */
		checked: {
			type: Boolean,
			reflectToAttribute: true,
			value: false
		},
		/**
		 * Gets or sets the state of the checkbox, `true` is tri-state and `false` other.
		 */
		indeterminate: {
			type: Boolean,
			reflectToAttribute: true,
			value: false,
			observer: '_setIndeterminate'
		},
		/**
		 * Gets or sets the disabled state of the checkbox, `true` is disabled and `false` is enabled.
		 */
		disabled: {
			type: Boolean,
			reflectToAttribute: true,
			value: false
		},
		/**
		 * Gets or sets the checkbox name, "" by default.
		 */
		name: {
			type: String,
			reflectToAttribute: true,
			value: ''
		},
		/**
		 * Gets or sets the checkbox value that gets submitted in forms, "on" by default.
		 */
		value: {
			type: String,
			reflectToAttribute: true,
			value: 'on'
		}
	},
	focus: function() {
		this.$$('input').focus();
	},
	_handleChange: function(e) {
		this.checked = e.target.checked;
		this.indeterminate = false;
		this.dispatchEvent(new CustomEvent(
			'change',
			{bubbles: true, composed: false}
		));
	},
	_onClick: function(e) {
		const browserType = window.navigator.userAgent;
		if ( this.indeterminate && (browserType.indexOf('Trident') > -1 || browserType.indexOf('Edge') > -1)) {
			this.checked = !this.checked;
			this.indeterminate = false;
			this.dispatchEvent(new CustomEvent(
				'change',
				{bubbles: true, composed: false}
			));
		}
	},
	_handleFocus: function() {
		// in shady DOM the input's "focus" event does not bubble,
		// so no need to fire it
		if (!useShadow) {
			this.dispatchEvent(new CustomEvent(
				'focus',
				{bubbles: true, composed: false}
			));
		}
	},
	_setIndeterminate: function(newValue) {
		var elem = this.$$('input');
		if (newValue) {
			elem.indeterminate = true;
			elem.setAttribute('aria-checked', 'mixed');
		} else {
			elem.indeterminate = false;
			elem.removeAttribute('aria-checked');
		}
	}
});
