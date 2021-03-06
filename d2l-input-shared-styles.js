import '@polymer/polymer/polymer-legacy.js';
import '@brightspace-ui/core/components/colors/colors.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-input-styles">
	<template>
		<style>
			:host {
				--d2l-input-border-radius: 0.3rem;
				--d2l-input-height: auto;
				--d2l-input-line-height: 1.2rem;
				--d2l-input-width: 100%;
				--d2l-input-background-color: #ffffff;
				--d2l-input-border-color: var(--d2l-color-galena);
				--d2l-input-boxshadow: inset 0 2px 0 0 rgba(181, 189, 194, .2); /* corundum */
				--d2l-input-padding: 0.4rem 0.75rem;
				--d2l-input-padding-focus: calc(0.4rem - 1px) calc(0.75rem - 1px);
				--d2l-input-color: var(--d2l-color-ferrite);

				--d2l-input-common: {
					border-radius: var(--d2l-input-border-radius);
					border-style: solid;
					border-color: var(--d2l-input-border-color);
					box-sizing: border-box;
					display: inline-block;
					margin: 0;
					min-width: calc(2rem + 1em);
					vertical-align: middle;
					width: var(--d2l-input-width);
					transition: background-color 0.5s ease, border-color 0.001s ease;
				};
				--d2l-input-text: {
					color: var(--d2l-input-color);
					/*font-family: inherit; ... for now, this needs to be added within the style of the component html file where needed, as trying
					to use this with @apply leads to an issue documented here: https://github.com/webcomponents/shadycss/issues/91 ... when this is fixed,
					we can add it back to here */
					font-size: 0.8rem;
					font-weight: 400;
					letter-spacing: 0.02rem;
					/* using min-height and line-height as IE11
					 * doesn't support line-height on inputs */
					line-height: var(--d2l-input-line-height);
					min-height: calc(2rem + 2px);
				};
				--d2l-input-hover-disabled: {
					background-color: var(--d2l-input-background-color);
					border-color: var(--d2l-input-border-color);
					border-width: 1px;
					box-shadow: var(--d2l-input-boxshadow);
					padding: var(--d2l-input-padding);
				};
				--d2l-input-hover-focus: {
					border-color: var(--d2l-color-celestine);
					border-width: 2px;
					outline-style: none;
					outline-width: 0;
					padding: var(--d2l-input-padding-focus);
				};
				--d2l-input-invalid: {
					border-color: var(--d2l-color-cinnabar);
				};
				--d2l-input-disabled: {
					opacity: 0.5;
				};
				--d2l-input-placeholder: {
					color: var(--d2l-color-mica);
					font-size: 0.8rem;
					font-weight: 400;
					opacity: 1; /* Firefox has non-1 default */
				};
				--d2l-input: {
					@apply --d2l-input-common;
					@apply --d2l-input-text;
					@apply --d2l-input-hover-disabled;
					height: var(--d2l-input-height);
				};
			}
			input[type="text"].d2l-input, input[type="search"].d2l-input,
			input[type="tel"].d2l-input, input[type="url"].d2l-input,
			input[type="email"].d2l-input, input[type="password"].d2l-input,
			input[type="number"].d2l-input {
				@apply --d2l-input;
			}
			textarea.d2l-input {
				@apply --d2l-input;
				@apply --d2l-input-textarea;
			}
			input.d2l-input::placeholder,
			textarea.d2l-input::placeholder {
				@apply --d2l-input-placeholder;
			}
			input.d2l-input::-webkit-input-placeholder,
			textarea.d2l-input::-webkit-input-placeholder {
				@apply --d2l-input-placeholder;
			}
			input.d2l-input::-moz-placeholder,
			textarea.d2l-input::-moz-placeholder {
				@apply --d2l-input-placeholder;
			}
			input.d2l-input::-ms-input-placeholder,
			textarea.d2l-input::-ms-input-placeholder {
				@apply --d2l-input-placeholder;
				/* IE will cause field to resize if placeholder font-size is different */
				font-size: 0.8rem;
			}
			/* This selector duplication is required to work around specificity issues
			   introduced by the ShadyCSS scoping shim. It applies an additional scoping
			   class to the type attribute selector
			*/
			input[type="text"].d2l-input:hover, input[type="search"].d2l-input:hover,
			input[type="tel"].d2l-input:hover, input[type="url"].d2l-input:hover,
			input[type="email"].d2l-input:hover, input[type="password"].d2l-input:hover,
			input[type="number"].d2l-input:hover,
			input[type="text"].d2l-input:focus, input[type="search"].d2l-input:focus,
			input[type="tel"].d2l-input:focus, input[type="url"].d2l-input:focus,
			input[type="email"].d2l-input:focus, input[type="password"].d2l-input:focus,
			input[type="number"].d2l-input:focus,
			textarea.d2l-input:hover, textarea.d2l-input:focus {
				@apply --d2l-input-hover-focus;
			}
			input[aria-invalid="true"].d2l-input,
			input[aria-invalid="true"].d2l-input:hover,
			input[aria-invalid="true"].d2l-input:focus,
			input[type="text"].d2l-input:invalid, input[type="search"].d2l-input:invalid,
			input[type="tel"].d2l-input:invalid, input[type="url"].d2l-input:invalid,
			input[type="email"].d2l-input:invalid, input[type="password"].d2l-input:invalid,
			input[type="number"].d2l-input:invalid,
			textarea[aria-invalid='true'].d2l-input, textarea.d2l-input:invalid {
				@apply --d2l-input-invalid;
			}
			input[type="text"].d2l-input:hover:disabled, input[type="search"].d2l-input:hover:disabled,
			input[type="tel"].d2l-input:hover:disabled, input[type="url"].d2l-input:hover:disabled,
			input[type="email"].d2l-input:hover:disabled, input[type="password"].d2l-input:hover:disabled,
			input[type="number"].d2l-input:hover:disabled,
			textarea.d2l-input:hover:disabled {
				@apply --d2l-input-hover-disabled;
			}
			input[type="text"].d2l-input:disabled, input[type="search"].d2l-input:disabled,
			input[type="tel"].d2l-input:disabled, input[type="url"].d2l-input:disabled,
			input[type="email"].d2l-input:disabled, input[type="password"].d2l-input:disabled,
			input[type="number"].d2l-input:disabled,
			textarea.d2l-input:disabled {
				@apply --d2l-input-disabled;
			}
			input.d2l-input::-webkit-search-cancel-button,
			input.d2l-input::-webkit-search-decoration {
				display: none;
			}
			input.d2l-input::-ms-clear {
				display: none;
				width: 0;
				height: 0;
			}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
