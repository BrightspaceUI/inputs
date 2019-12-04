> Deprecated: use [BrightspaceUI/core](https://github.com/BrightspaceUI/core) instead.

The only component that isn't currentlly available in `@brightspace-ui/core` is `<d2l-input-textarea>`, so it remains here. It wasn't migrated due to its reliance on Polymer style mixins, and the reliance of places that use it on overriding those mixins. Mixins aren't something that Lit supports.

### d2l-input-textarea

<img src="/screenshots/textarea.gif?raw=true" width="250">

Import `d2l-input-textarea.html`:

```html
<script type="module">
	import 'node_modules/d2l-inputs/d2l-input-textarea.js';
</script>
```

A `<d2l-input-textarea>` custom element can now be used in your application:


```html
<d2l-input-textarea name="myInput" value="input value"></d2l-input-textarea>
```

Many of the same attributes from native [`<textarea>` are available](https://developer.mozilla.org/en/docs/Web/HTML/Element/textarea):

```html
<d2l-input-textarea disabled></d2l-input-textarea>
```

These attributes may also be used:
* `no-border` removes border styling from the text area.
* `hover-styles` applies (square) hover styling to the text area.

<img src="/screenshots/textarea-noborder.gif?raw=true" width="250">

```html
<d2l-input-textarea no-border hover-styles></d2l-input-textarea>
```

The `d2l-input-textarea` component dispatches an event (`change`) when text is entered/changed/removed:

```html
<script>
	textarea.addEventListener('change', (e) => {
	    // e.target.value contains the text value
	    console.log(e.target.value);
	});
</script>
```
When the input is cleared, the same event will be fired with an empty value.
