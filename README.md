
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
 
## Options

Options for `marked-tex-renderer` is passed alongside with options to `marked`:

```js
marked.setOptions(options);
```

Following are the options for `marked-tex-renderer`:

 * `failOnUnsupported`: If set to true, an error is thrown when plain-TeX-unsupported features are used. Possible values are `true`, `false`. Default is `true`.
 * `delRenderer`: Renderer function for deleted text. Should have the signature `function (text)`, and should return TeX source for deleted text.
 * `linkRenderer`: Renderer function for hyperlinks. Should have the signature `function (href, title, text)`, and should return TeX source for hyperlink.
 * `imageRenderer`: Renderer function for images. Should have the signature `function (href, title, text)`, and should return TeX source for image.
 * `levelStyles`: Object with LaTeX commands how to translate headings. Default is `{}` and will result in the default usage of headings defined in `Renderer.prototype.heading`. See example for how to change it.
 
`levelStyles` Example: 

This example would set all headings to the same paragraph style:

    marked.setOptions({
      levelStyles: {
        1: '\\paragraph',
        2: '\\paragraph',
        3: '\\paragraph',
        4: '\\paragraph',
        5: '\\paragraph',
        6: '\\paragraph'
      }
    });

This would reset the styles to the default setting:

    marked.setOptions({levelStyles: {}});
