// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

//### Sidebar Navigation JSON
qc.main.slideMenuUrl = "assets/javascripts/json/sidebarNav/mainMenuTreeData.json";

//### Registry Login Button
function btnRegistry(){
	$('.panel-sing-up').addClass('active');
	$('.panel-sing-in').addClass('passive');
}

//### Registry Back Button
function btnBack(){
	$('.panel-sing-up').removeClass('active');
	$('.panel-sing-in').removeClass('passive');
}

//### Sidebar Badge Extend
$('#mainSlideMenu').tree({
	formatter:function(node){
		var s = node.text;
		if (node.children){
			s += '&nbsp;<span class=\'badge badge-info\'>' + node.children.length + '</span>';
		}
		return s;
	}
});

