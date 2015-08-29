/*
 * tests for marked-tex-renderer
 * https://github.com/sampathsris/marked-tex-renderer
 * 
 */

/*jshint node: true */
'use strict';

var fs = require('fs'),
	path = require('path'),
	TexRenderer = require('../'),
	marked = require('marked');

marked.setOptions({
	renderer: new TexRenderer(),
	gfm: true
});

var mdfilename = __dirname + '/tests/example.md';
var markdown = fs.readFileSync(mdfilename, { encoding: 'utf8' });
var tex = marked(markdown);

var texfilename = __dirname + '/output/example.tex';
fs.writeFileSync(texfilename, tex, { encoding: 'utf8' });

console.log('Test is complete');
