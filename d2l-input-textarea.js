/**
`d2l-input-textarea` is an element containing a textarea that grows in height as more
lines of input are entered. Unless an explicit height or the `maxRows` property is set, it will
never scroll.

### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--d2l-input-textarea` | Mixin applied to the textarea | `{}`

@demo demo/d2l-input-textarea.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@brightspace-ui/core/components/colors/colors.js';
import '@polymer/polymer/polymer-legacy.js';
import 'fastdom/fastdom.js';
import './d2l-input-text-behavior.js';
import './d2l-input-shared-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-input-textarea">
	<template strip-whitespace="">
		<style include="d2l-input-styles">
			:host {
				display: inline-block;
				position: relative;
				width: 100%;
				padding: 0;
				overflow: hidden;

				--d2l-input-height: 100%;
			}

			.mirror-text {
				visibility: hidden;
				word-wrap: break-word;
				overflow-wrap: break-word;
				word-break: break-word;
				box-sizing: border-box;

				@apply --d2l-input;
				@apply --d2l-input-textarea;
			}

			.fit {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
			}

			textarea {
				position: relative;
				outline: none;
				border: none;
				resize: none;
				background: inherit;
				color: inherit;
				/* see comments in template */
				width: 100%;
				height: 100%;
				font-size: inherit;
				font-family: inherit;
				line-height: inherit;
				text-align: inherit;
				overflow: auto;
			}

			:host([no-border]) textarea.d2l-input,
			:host([no-border]) .mirror-text {
				border: none;
				padding: 0.4rem 0.75rem;
				box-shadow: none;
			}

			/* fix IE & Edge textarea content cut off b/c mirror text size is smaller than textarea which mirror text is borderless */
			@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
				 /* IE10+ CSS styles go here */
				:host([no-border]) .mirror-text {
					border: unset;
					border-style: solid;
					border-width: 2px;
				}
			}

			@supports (-ms-ime-align:auto) {
				/* IE Edge CSS styles go here */
				:host([no-border]) .mirror-text {
					border: unset;
					border-style: solid;
					border-width: 2px;
				}
			}

			@-moz-document url-prefix() {
				/* Fix Firefox on hover content area shrink and text shift issue */
				:host([no-border]) textarea.d2l-input,
				:host([no-border]) .mirror-text {
					border: unset;
					border-style: solid;
					border-radius: 0;
					border-color: transparent;
					border-width: 2px;
					padding: calc(0.4rem - 2px) calc(0.75rem - 2px);
					box-shadow: none;
				}
			}

			:host([hover-styles]) textarea.d2l-input:hover,
			:host([hover-styles]) textarea.d2l-input:focus,
			:host([hover-styles]) textarea.d2l-input[aria-invalid='true'] {
				border-style: solid;
				border-radius: 0;
				border-color: var(--d2l-color-celestine);
				border-width: 2px;
				outline-width: 0;
				padding: calc(0.4rem - 2px) calc(0.75rem - 2px);
				box-shadow: inset 0 2px 0 0 rgba(181, 189, 194, .2); /* corundum */
				transition-property: none;
			}

			:host([hover-styles]) textarea.d2l-input[aria-invalid='true'] {
				@apply --d2l-input-invalid;
			}

			:host([no-padding]) textarea.d2l-input {
				padding-left: 0;
				padding-right: 0;
			}

		</style>

		<!-- the mirror sizes the input/textarea so it grows with typing -->
		<!-- use &#160; instead of &nbsp; to allow this element to be used in XHTML -->
		<div id="mirror" class="mirror-text" aria-hidden="true">&nbsp;</div>

		<!-- size the input/textarea with a div, because the textarea has intrinsic size in ff -->
		<div class="d2l-input-textarea-container fit">
			<textarea id="textarea" aria-invalid$="[[ariaInvalid]]" aria-label$="[[ariaLabel]]" aria-labelledby$="[[ariaLabelledby]]" autocomplete$="[[autocomplete]]" autofocus$="[[autofocus]]" class="d2l-input d2l-focusable" disabled$="[[disabled]]" inputmode$="[[inputmode]]" maxlength$="[[maxlength]]" minlength$="[[minlength]]" name$="[[name]]" on-change="_handleChange" placeholder$="[[placeholder]]" readonly$="[[readonly]]" required$="[[required]]" rows$="[[rows]]"></textarea>
		</div>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({

	is: 'd2l-input-textarea',

	behaviors: [
		D2L.PolymerBehaviors.Text.InputTextBehavior
	],

	properties: {
		/**
		 * Bound to the textarea's `autocomplete` attribute.
		 */
		autocomplete: {type: String, value: 'off'},
		/**
		 * Applies hover styling to the text area.
		 */
		hoverStyles: {type: Boolean, value: false},
		/**
		 * Bound to the textarea's `inputmode` attribute.
		 */
		inputmode: {type: String},
		/**
		 * The maximum number of rows this element can grow to until it
		 * scrolls. 0 means no maximum.
		 *
		 * @attribute maxRows
		 * @type number
		 * @default 0
		 */
		maxRows: {type: Number, value: 0, observer: '_updateCached'},
		/**
		 * Removes border styling from the text area.
		 */
		noBorder: {type: Boolean, value: false},
		/**
		 * The initial number of rows.
		 *
		 * @attribute rows
		 * @type number
		 * @default 1
		 */
		rows: {type: Number, value: 1, observer: '_updateCached'},
		/**
		 * Value of the textarea
		 * @type {string|number}
		 */
		value: {observer: '_valueChanged', type: String, notify: true},
		/**
		 * Removes left and right padding from textarea.
		 */
		noPadding: {type: Boolean, value: false, reflectToAttribute: true},
	},

	listeners: {'input': '_onInput'},

	/**
	 * Returns the underlying textarea.
	 * @return {!HTMLTextAreaElement}
	 */
	get textarea() {
		return this.$.textarea;
	},

	/**
	 * Returns textarea's selection start.
	 * @return {number}
	 */
	get selectionStart() {
		return this.$.textarea.selectionStart;
	},

	/**
	 * Returns textarea's selection end.
	 * @return {number}
	 */
	get selectionEnd() {
		return this.$.textarea.selectionEnd;
	},

	/**
	 * Sets the textarea's selection start.
	 */
	set selectionStart(value) {
		this.$.textarea.selectionStart = value;
	},

	/**
	 * Sets the textarea's selection end.
	 */
	set selectionEnd(value) {
		this.$.textarea.selectionEnd = value;
	},

	focus: function() {
		var elem = dom(this.root).querySelector('.d2l-focusable');
		if (!elem) return;
		elem.focus();
	},

	_valueChanged: function(value) {
		var textarea = this.textarea;
		if (!textarea) {
			return;
		}

		// If the value changed manually, then we need to also update
		// the underlying textarea's value. Otherwise this change was probably
		// generated from the _onInput handler, and the two values are already
		// the same.
		if (textarea.value !== value) {
			textarea.value = !(value || value === 0) ? '' : value;
		}

		fastdom.mutate(function() {
			this.$.mirror.innerHTML = this._valueForMirror();
		}.bind(this), this);
	},

	_onInput: function(event) {
		var eventPath = dom(event).path;
		this.value = eventPath ? eventPath[0].value : event.target.value;
	},

	_constrain: function(tokens) {
		var _tokens;
		tokens = tokens || [''];
		// Enforce the min and max heights for a multiline input to avoid
		// measurement
		if (this.maxRows > 0 && tokens.length > this.maxRows) {
			_tokens = tokens.slice(0, this.maxRows);
		} else {
			_tokens = tokens.slice(0);
		}
		while (this.rows > 0 && _tokens.length < this.rows) {
			_tokens.push('');
		}
		// Use &#160; instead of &nbsp; to allow this element to be used in XHTML.
		return _tokens.join('<br/>') + '&#160;';
	},

	_valueForMirror: function() {
		var input = this.textarea;
		if (!input) {
			return;
		}
		var value = input.value || this.placeholder;

		this.tokens = (value) ? value.replace(/&/gm, '&amp;')
			.replace(/"/gm, '&quot;')
			.replace(/'/gm, '&#39;')
			.replace(/</gm, '&lt;')
			.replace(/>/gm, '&gt;')
			.split('\n') :
			[''];
		return this._constrain(this.tokens);
	},

	_updateCached: function() {
		fastdom.mutate(function() {
			this.$.mirror.innerHTML = this._constrain(this.tokens);
		}.bind(this), this);
	},

	_handleChange: function() {
		// Change events don't automatically propagate across shadow DOM boundaries
		this.dispatchEvent(new CustomEvent(
			'change',
			{bubbles: true, composed: true}
		));
	}

});
