/**
 * marked-tex-renderer
 *     A plug-in style renderer to produce TeX output for marked
 * https://github.com/sampathsris/marked-tex-renderer
 */

/*jshint node: true */
'use strict';

var NEWLINE = '\r\n';

function Renderer(options) {
	this.options = options || {};
}

Renderer.prototype.code = function (code, lang, escaped) {
	return [
		'\\begin{verbatim}',
		code,
		'\\end{verbatim}'
	].join(NEWLINE) + NEWLINE;
};

Renderer.prototype.blockquote = function (quote) {
	return [
		'\\begin{quote}',
		quote,
		'\\end{quote}'
	].join(NEWLINE) + NEWLINE;
};

Renderer.prototype.html = function (html) {
	return html;
};

Renderer.prototype.heading = function (text, level, raw) {
	var command = '';

	switch (level) {
	case 1:
		command = '\\chapter';
		break;
	case 2:
		command = '\\section';
		break;
	case 3:
		command = '\\subsection';
		break;
	case 4:
		command = '\\subsubsection';
		break;
	case 5:
		command = '\\paragraph';
		break;
	case 6:
		command = '\\subparagraph';
		break;
	}

	return NEWLINE + command + '{' + text + '}' + NEWLINE;
};

Renderer.prototype.hr = function () {
	return '\\hrulefill' + NEWLINE;
};

Renderer.prototype.list = function (body, ordered) {
	if (ordered) {
		return [
			NEWLINE,
			'\\begin{enumerate}',
			body,
			'\\end{enumerate}',
			NEWLINE
		].join(NEWLINE);
	} else {
		return [
			NEWLINE,
			'\\begin{itemize}',
			body,
			'\\end{itemize}',
			NEWLINE
		].join(NEWLINE);
	}
};

Renderer.prototype.listitem = function (text) {
	return '\\item ' + text + NEWLINE;
};

Renderer.prototype.paragraph = function (text) {
	return '\\par ' + text;
};

Renderer.prototype.tablecell = function (content, flags) {
	// treat the cell as an element of a JSON array, and add a comma
	// to separate it from the subsequent cells
	return JSON.stringify({ content: content, flags: flags}) + ',';
};

Renderer.prototype.tablerow = function (content) {
	// remove trailing comma from the list of cells
	var row = content.substr(0, content.length - 1);
	
	// and return it as a JSON array. add a comma to separate the
	// row from the subsequent rows
	return '[' + row + '],';
};

Renderer.prototype.table = function (header, body) {
	var headerArr = [],
		bodyArr = [],
		hasHeader = false,
		firstRow,
		tex,
		tableSpec;
	
	// remove the trailing comma from header row
	if (header) {
		header = header.substr(0, header.length - 1);
		headerArr = JSON.parse(header);
		
		if (headerArr.length !== 0) {
			hasHeader = true;
		}
	}
	
	// remove the trailing comma from body row(s)
	if (body) {
		body = body.substr(0, body.length - 1);
		bodyArr = JSON.parse(body);
	}
	
	if (headerArr.length !== 0) {
		firstRow = headerArr;
	} else {
		firstRow = bodyArr[0];
	}
	
	tex = '\\begin{tabular}';
	
	// create table spec
	tableSpec = '{|';
	
	for (var i = 0; i < firstRow.length; i++) {
		var align = 'l';
		
		switch (firstRow[i].flags.align) {
			case 'right':
				align = 'r';
				break;
			case 'right':
				align = 'c';
				break;
		}
		
		tableSpec += align;
		
		if (i !== firstRow.length - 1) {
			tableSpec += '|';
		}
	}
	
	tableSpec += '}';
	tex += tableSpec + NEWLINE;
	
	// create table body
	tex += '\\hline' + NEWLINE;
	
	for (var j = 0; j < bodyArr.length; j++) {
		var rowArr = bodyArr[j];
		
		for (var k = 0; k < rowArr.length; k++) {
			tex += rowArr[k].content;
			
			if (k < rowArr.length - 1) {
				tex += ' & ';
			} else {
				tex += ' \\\\' + NEWLINE;
			}
		}
		
		if (j === 0 && hasHeader) {
			tex += '\\hline' + NEWLINE;
		}
	}
	
	tex += '\\hline' + NEWLINE;
	
	tex += '\\end{tabular}' + NEWLINE;
	
	return tex;
};

Renderer.prototype.strong = function (text) {
	return '\\textbf{' + text + '}';
};

Renderer.prototype.em = function (text) {
	return '\\emph{' + text + '}';
};

Renderer.prototype.codespan = function (text) {
	return '\\texttt{' + text + '}';
};

Renderer.prototype.br = function () {
	return '\\';
};

Renderer.prototype.del = function (text) {
	if (this.options.delRenderer) {
		return this.options.delRenderer(text);
	}
	
	throw new Error(
        'Client should prvide a function to render deleted texts. ' +
        'Use options.delRenderer = function (text)');
};

Renderer.prototype.link = function (href, title, text) {
	if (this.options.linkRenderer) {
		return this.options.linkRenderer(href, title, text);
	}
	
	return text;
};

Renderer.prototype.image = function (href, title, text) {
	if (this.options.imageRenderer) {
		return this.options.imageRenderer(href, title, text);
	}
	
	throw new Error(
        'Client should prvide a function to render images. ' +
        'Use options.imageRenderer = function (href, title, text)');
};

Renderer.prototype.text = function (text) {
	return unescape(text);
};

function unescape(html) {
    return html.replace(/&([#\w]+);/g, function(_, n) {
        n = n.toLowerCase();
        
        if (n === 'colon') return ':';
        
        if (n.charAt(0) === '#') {
            return n.charAt(1) === 'x' ?
                String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
        }
        return '';
    });
}

module.exports = Renderer;
