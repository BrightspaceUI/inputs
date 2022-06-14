import '@polymer/polymer/polymer-legacy.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/typography/d2l-typography-shared-styles.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-input-radio-styles">
	<template strip-whitespace="">
		<style>
			.d2l-input-radio-label {
				display: flex;
				align-items: center;
				padding-left: 1.7rem;
				padding-right: 0;
				vertical-align: middle;
				@apply --d2l-body-compact-text;
				color: var(--d2l-color-ferrite);
				margin-bottom: 0.9rem;
			}
			.d2l-input-radio-label.disabled {
				opacity: 0.5;
			}
			.d2l-input-radio-label.disabled > input[type="radio"] {
				opacity: 1.0;
			}
			.d2l-input-radio-label:last-of-type {
				margin-bottom: 0;
			}
			.d2l-input-radio-label > input[type="radio"] {
				margin-right: 0.5rem;
				margin-left: -1.7rem;
				flex: 0 0 auto;
			}
			[dir="rtl"] .d2l-input-radio-label,
			:dir(rtl) .d2l-input-radio-label {
				padding-right: 1.7rem;
				padding-left: 0;
			}
			[dir="rtl"] .d2l-input-radio-label > input[type="radio"],
			:dir(rtl) .d2l-input-radio-label > input[type="radio"] {
				margin-left: 0.5rem;
				margin-right: -1.7rem;
			}
			input[type="radio"] {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				background-position: center center;
				background-repeat: no-repeat;
				background-size: 0.5rem 0.5rem;
				border-radius: 50%;
				border-style: solid;
				box-sizing: border-box;
				display: inline-block;
				height: 1.2rem;
				margin: 0;
				padding: 0;
				transition: background-color 0.5s ease, border-color 0.001s ease;
				vertical-align: middle;
				width: 1.2rem;
			}
			input[type="radio"]:checked {
				background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2010%2010%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%09%3Ccircle%20cx%3D%225%22%20cy%3D%225%22%20r%3D%225%22%20fill%3D%22%23494c4e%22%3E%3C/circle%3E%0A%3C/svg%3E");
			}
			input[type="radio"],
			input[type="radio"]:hover:disabled {
				background-color: var(--d2l-color-regolith);
				border-color: var(--d2l-color-galena);
				border-width: 1px;
			}
			input[type="radio"]:hover,
			input[type="radio"]:focus,
			input[type="radio"].d2l-radio-button-focus {
				border-color: var(--d2l-color-celestine);
				border-width: 2px;
				outline-width: 0;
			}
			input[type="radio"][aria-invalid="true"] {
				border-color: var(--d2l-color-cinnabar);
			}
			input[type="radio"]:disabled {
				opacity: 0.5;
			}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
