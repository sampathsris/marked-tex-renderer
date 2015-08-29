
# marked-tex-renderer

A plug-in style renderer to produce TeX output for [`marked`](https://github.com/chjj/marked).

## Usage

```js
var marked = require('marked');
var TexRenderer = require('marked-tex-renderer');

marked.setOptions({
  renderer: new TexRenderer()
});

console.log(marked('I am using __markdown__.'));
```

## Unsupported features of plain TeX

`marked-tex-renderer` tries to be agnostic to LaTeX packages. As a result, in cannot convert some Markdown features to TeX in a straightforward manner (simply because you need packages to implement them). Therefore, `marked-tex-renderer` relies on external functions for rendering these features:

 * Deleted text: `~~Deleted text~~`
 * Hyperlinks: `Click [here](https://github.com)`
 * Images: `![An example image](example.png)`

You can supply rendering functions for these feature in following manner:

```js
marked.setOptions({
	renderer: new TexRenderer(),
	gfm: true,
	failOnUnsupported: false,
	delRenderer: function (text) {
		// return TeX source to render deleted text
	},
	linkRenderer:  function (href, title, text) {
		// return TeX source to render hyperlinks
	},
	imageRenderer:   function (href, title, text) {
		// return TeX source to render images
	}
});
```

However, `marked-tex-renderer` provide some useful functions. You can use them, but you will have to include some `\usepackage` commands in your tex files manually:

```js
marked.setOptions({
	renderer: new TexRenderer(),
	gfm: true,
	failOnUnsupported: false,
	
	// requires \usepackage{ulem}
	delRenderer: TexRenderer.delImpl,
	
	// requires \usepackage{hyperref}
	linkRenderer: TexRenderer.linkImpl,
	
	// requires \usepackage{graphicx}
	imageRenderer: TexRenderer.imageImpl
});
```
 
