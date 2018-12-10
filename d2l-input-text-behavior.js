import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Text = window.D2L.PolymerBehaviors.Text || {};

/** @polymerBehavior D2L.PolymerBehaviors.Text.InputTextBehavior */
D2L.PolymerBehaviors.Text.InputTextBehaviorImpl = {
	properties: {
		/**
		 * Fired when the input changes due to user interaction.
		 *
		 * @event change
		*/

		/**
		 * Gets or sets the [aria-invalid attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute),
		 * which is used to indicate that the value entered into the input field does not conform to the format expected.
		 */
		ariaInvalid: {
			type: String
		},
		/**
		 * Gets or sets the [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)
		 * attribute, which defines a string label for the input.
		 */
		ariaLabel: {
			type: String
		},
		/**
		 * Gets or sets the [aria-labelledby attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute),
		 * which contains the IDs of labels for the input.
		 */
		ariaLabelledby: {
			type: String
		},
		/**
		 * Bound to the input's `autofocus` attribute. When true, will automatically focus on the input when the page loads.
		 */
		autofocus: {
			type: Boolean,
			value: false
		},
		/**
		 * Bound to the input's `disabled` attribute. Gets or sets the disabled state of the input, `true` is disabled and `false` is enabled.
		 */
		disabled: {
			type: Boolean,
			reflectToAttribute: true,
			value: false
		},
		/**
		 * Maximum number of characters that the user can enter.
		 */
		maxlength: {
			type: Number
		},
		/**
		 * Minimum number of characters that the user can enter.
		 */
		minlength: {
			type: Number
		},
		/**
		 * Bound to the input's `name` attribute. The name of the control, which is submitted with the form data.
		 */
		name: {
			type: String
		},
		/**
		 * Bound to the input's `placeholder` attribute. A hint to the user of what can be entered in the control.
		 */
		placeholder: {
			type: String
		},
		/**
		 * Bound to the input's `readonly` attribute. Indicates that the user cannot modify the value of the control.
		 */
		readonly: {
			type: Boolean,
			value: false
		},
		/**
		 * Specifies that the user must fill in a value before submitting a form.
		*/
		required: {
			type: Boolean,
			value: false
		},
	},

	attached: function() {
		afterNextRender(this, function() {
			this.$$('.d2l-input').addEventListener('invalid', this._handleInvalid);
		}.bind(this));
	},
	detached: function() {
		this.$$('.d2l-input').removeEventListener('invalid', this._handleInvalid);
	},
	_handleInvalid: function(e) {
		e.preventDefault();
	}
};

/** @polymerBehavior D2L.PolymerBehaviors.Text.InputTextBehavior */
D2L.PolymerBehaviors.Text.InputTextBehavior = [
	D2L.PolymerBehaviors.Text.InputTextBehaviorImpl
];
