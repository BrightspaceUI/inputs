/**
`d2l-input-search`
Polymer-based web component for search

@demo demo/d2l-input-search.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'fastdom/fastdom.js';
import 'd2l-polymer-behaviors/d2l-focusable-behavior.js';
import 'd2l-button/d2l-button-icon.js';
import 'd2l-icons/tier1-icons.js';
import './d2l-input-shared-styles.js';
import './d2l-input-search-localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-input-search">

	<template strip-whitespace="">
		<style include="d2l-input-styles">

			:host {
				display: inline-block;
				position: relative;
				width: 100%
			}

			input[type="text"].d2l-input {
				font-family: inherit;
				padding-right: 2.4rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			:host-context([dir="rtl"]) input[type="text"].d2l-input {
				padding-right: 0.75rem;
				padding-left: 2.4rem;
			}

			/* Duplicated because some browsers ignore CSS block for any invalid selector */
			:host(:dir(rtl)) input[type="text"].d2l-input {
				padding-right: 0.75rem;
				padding-left: 2.4rem;
			}

			.d2l-input-search-hover input[type="text"].d2l-input,
			.d2l-input-search-focus input[type="text"].d2l-input{
				@apply --d2l-input-hover-focus;
				padding-right: calc(2.4rem - 1px);
			}

			:host-context([dir="rtl"]) input[type="text"].d2l-input:hover,
			:host-context([dir="rtl"]) input[type="text"].d2l-input:focus,
			:host-context([dir="rtl"]) .d2l-input-search-hover input[type="text"].d2l-input,
			:host-context([dir="rtl"]) .d2l-input-search-focus input[type="text"].d2l-input {
				padding-right: calc(0.75rem - 1px);
				padding-left: calc(2.4rem - 1px);
			}

			:host(:dir(rtl)) input[type="text"].d2l-input:hover,
			:host(:dir(rtl)) input[type="text"].d2l-input:focus,
			:host(:dir(rtl)) .d2l-input-search-hover input[type="text"].d2l-input,
			:host(:dir(rtl)) .d2l-input-search-focus input[type="text"].d2l-input {
				padding-right: calc(0.75rem - 1px);
				padding-left: calc(2.4rem - 1px);
			}

			d2l-button-icon {
				--d2l-button-icon-min-height: 1.7rem;
				--d2l-button-icon-min-width: 1.7rem;
				--d2l-button-icon-border-radius: 4px;
				position: absolute;
				height: 1.7rem;
				width: 1.7rem;
				top: 0.2rem;
				right: 0.2rem;
			}

			:host-context([dir="rtl"]) d2l-button-icon {
				left: 0.2rem;
				right: auto;
			}

			:host(:dir(rtl)) d2l-button-icon {
				left: 0.2rem;
				right: auto;
			}

			d2l-button-icon[hidden] {
				display: none;
			}

		</style>
		<div class="d2l-input-search-container">
			<input aria-label$="[[label]]" class="d2l-input d2l-focusable" disabled$="[[disabled]]" maxlength$="[[maxlength]]" on-keypress="_handleInputKeyPress" on-input="_handleInput" placeholder$="[[placeholder]]" type="text" value="[[value]]">
			<d2l-button-icon class="d2l-input-search-search" disabled$="[[disabled]]" hidden="[[!_showSearch]]" icon="d2l-tier1:search" on-click="search" text="[[localize('search')]]"></d2l-button-icon>
			<d2l-button-icon class="d2l-input-search-clear" disabled$="[[disabled]]" hidden="[[_showSearch]]" icon="d2l-tier1:close-default" on-click="_handleClearClick" text="[[localize('search.clear')]]"></d2l-button-icon>
		</div>
	</template>

	

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-input-search',

	behaviors: [
		D2L.PolymerBehaviors.FocusableBehavior,
		D2L.PolymerBehaviors.Search.LocalizeBehavior
	],

	/**
	 * Fired when a search or clear is performed.
	 * @event d2l-input-search-searched
	 * @param {String} value Value of the search input.
	 */

	properties: {
		/**
		 * Whether the input is disabled.
		 */
		disabled: {
			type: Boolean,
			reflectToAttribute: true,
			value: false
		},
		/**
		 * Accessible label to be applied to the input.
		 */
		label: {
			type: String
		},
		/**
		 * Maximum number of characters that the user can enter.
		 */
		maxlength: {
			type: Number
		},
		/**
		 * When true, the clear button will not be displayed when a search is performed.
		 */
		noClear: {
			type: Boolean
		},
		/**
		 * A hint to the user of what can be entered in the input.
		 */
		placeholder: {
			type: String
		},
		/**
		 * Value of the input.
		 */
		value: {
			type: String,
			notify: true,
			value: ''
		},
		/**
		 * Value of the input the last time a search was performed.
		 */
		lastSearchValue: {
			type: String,
			readOnly: true,
			value: ''
		},
		_showSearch: {
			type: Boolean,
			computed: '_computeShowSearch(lastSearchValue, value)'
		}
	},

	hostAttributes: {
		'role': 'search'
	},

	_keyCodes: {
		ENTER: 13
	},

	ready: function() {
		if (this.value !== undefined && this.value !== null) {
			this._setLastSearchValue(this.value);
		}
		this._handleFocus = this._handleFocus.bind(this);
		this._handleBlur = this._handleBlur.bind(this);
		this._handleMouseEnter = this._handleMouseEnter.bind(this);
		this._handleMouseLeave = this._handleMouseLeave.bind(this);
	},

	attached: function() {
		afterNextRender(this, function() {
			var elem = this._getContainer();
			// need explicit event handlers for Polymer 1
			elem.addEventListener('focus', this._handleFocus, true);
			elem.addEventListener('blur', this._handleBlur, true);
			elem.addEventListener('mouseenter', this._handleMouseEnter, true);
			elem.addEventListener('mouseleave', this._handleMouseLeave, true);
		}.bind(this));
	},

	detached: function() {
		var elem = this._getContainer();
		elem.removeEventListener('focus', this._handleFocus, true);
		elem.removeEventListener('blur', this._handleBlur, true);
		elem.removeEventListener('mouseenter', this._handleMouseEnter, true);
		elem.removeEventListener('mouseleave', this._handleMouseLeave, true);
	},

	/**
	 * Performs a search.
	 */
	search: function() {
		var noClear = (this.noClear === true);
		this._setLastSearchValue(this.value);
		this._dispatchEvent();
		fastdom.mutate(function() {
			if (!noClear && this.value.length > 0) {
				dom(this.root).querySelector('.d2l-input-search-clear').focus();
			}
		}.bind(this));
	},

	_computeShowSearch: function(lastSearchValue, value) {
		var noClear = (this.noClear === true);
		var valueIsEmpty = (value === undefined || value === null || value === '');
		var lastSearchValueIsEmpty = (lastSearchValue === undefined || lastSearchValue === null || lastSearchValue === '');
		var showSearch = (valueIsEmpty && lastSearchValueIsEmpty) ||
			(lastSearchValue !== value) || noClear;
		return showSearch;
	},

	_dispatchEvent: function() {
		this.dispatchEvent(new CustomEvent(
			'd2l-input-search-searched',
			{bubbles: true, composed: false, detail: {value: this.value}}
		));
	},

	_getContainer: function() {
		return dom(this.root).querySelector('.d2l-input-search-container');
	},

	_handleBlur: function(e) {
		if (this._isFocusableChild(e.relatedTarget)) return;
		fastdom.mutate(function() {
			this._getContainer().classList.remove('d2l-input-search-focus');
		}.bind(this));
	},

	_handleClearClick: function() {
		this.value = '';
		if (this.value !== this.lastSearchValue) {
			this._setLastSearchValue('');
			this._dispatchEvent();
		}
		fastdom.mutate(function() {
			var input = dom(this.root).querySelector('input');
			input.focus();
		}.bind(this));
	},

	_handleFocus: function() {
		fastdom.mutate(function() {
			this._getContainer().classList.add('d2l-input-search-focus');
		}.bind(this));
	},

	_handleInputKeyPress: function(e) {
		if (e.keyCode !== this._keyCodes.ENTER) {
			return;
		}
		e.preventDefault();
		this._setLastSearchValue(this.value);
		this._dispatchEvent();
	},

	_handleInput: function(e) {
		this.value = e.target.value;
	},

	_handleMouseEnter: function() {
		fastdom.mutate(function() {
			this._getContainer().classList.add('d2l-input-search-hover');
		}.bind(this));
	},

	_handleMouseLeave: function(e) {
		if (this._isFocusableChild(e.relatedTarget)) return;
		fastdom.mutate(function() {
			this._getContainer().classList.remove('d2l-input-search-hover');
		}.bind(this));
	},

	_isFocusableChild: function(elem) {
		return elem === dom(this.root).querySelector('input')
			|| elem === dom(this.root).querySelector('.d2l-input-search-search')
			|| elem === dom(this.root).querySelector('.d2l-input-search-clear');
	}

});
