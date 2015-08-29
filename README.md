
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
