//rem定义
var html_f=document.documentElement.clientWidth/6.4;
RenFn();
window.onresize = function () {
  RenFn();
}
var CeShi=0;
function RenFn(){
	if(html_f<70)
	{
		document.documentElement.style.fontSize = html_f+ 'px';
	}
	else
	{
		document.documentElement.style.fontSize = 70+ 'px';
	}
}
//json格式化     $('#a1').text(formatJson(data))
		var formatJson = function(json, options) {
            var reg = null,
              formatted = '',
              pad = 0,
              PADDING = '    '; 
            options = options || {};
            options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
            options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
            if (typeof json !== 'string') {
                json = JSON.stringify(json);
            }
            json = JSON.parse(json);
            json = JSON.stringify(json);
            reg = /([\{\}])/g;
            json = json.replace(reg, '\r\n$1\r\n');
            reg = /([\[\]])/g;
            json = json.replace(reg, '\r\n$1\r\n');
            reg = /(\,)/g;
            json = json.replace(reg, '$1\r\n');
            reg = /(\r\n\r\n)/g;
            json = json.replace(reg, '\r\n');
            reg = /\r\n\,/g;
            json = json.replace(reg, ',');
            if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
                reg = /\:\r\n\{/g;
                json = json.replace(reg, ':{');
                reg = /\:\r\n\[/g;
                json = json.replace(reg, ':[');
            }
            if (options.spaceAfterColon) {
                reg = /\:/g;
                json = json.replace(reg, ':');
            }
            $.each(json.split('\r\n'), function(index, node) {
                var i = 0,
                  indent = 0,
                  padding = '';
                if (node.match(/\{$/) || node.match(/\[$/)) {
                    indent = 1;
                } else if (node.match(/\}/) || node.match(/\]/)) {
                    if (pad !== 0) {
                        pad -= 1;
                    }
                } else {
                    indent = 0;
                }

                for (i = 0; i < pad; i++) {
                    padding += PADDING;
                }

                formatted += padding + node + '\r\n';
                pad += indent;
            });
            return formatted;
        };



