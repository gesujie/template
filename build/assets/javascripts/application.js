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

//### Sidebar Navigation Json
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

//### Schedule Prev Button
function prevButton(){
	var schedule = $('#schedule');
	schedule.fullCalendar('prev');
	var moment = schedule.fullCalendar('getDate');
	document.getElementById("getDate").textContent = moment.format('YYYY/MM/DD');
}

//### Schedule Today Button
function todayButton(){
	var schedule = $('#schedule');
	schedule.fullCalendar('today');
	var moment = schedule.fullCalendar('getDate');
	document.getElementById("getDate").textContent = moment.format('YYYY/MM/DD');
}

//### Schedule Next Button
function nextButton(){
	var schedule = $('#schedule');
	schedule.fullCalendar('next');
	var moment = schedule.fullCalendar('getDate');
	document.getElementById("getDate").textContent = moment.format('YYYY/MM/DD');

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

$(window).load(function(){

	Namespace.register("qc.demoWindow");
	qc.main.pushWindowId("qc-window-windowObj");
	qc.demoWindow.windowObj = null;
	qc.demoWindow.openWindow = function() {
		if (!qc.demoWindow.windowObj) {
			qc.demoWindow.windowObj = $("#qc-window-windowObj").show().window({
				title: 'Easy UI Window Login',
				iconCls: 'fa fa-columns',
				modal: true,
				width: 450,
				height: 240,
				minimizable: false,
				closable: true
			});
		} else {
			qc.demoWindow.windowObj.window("open");
		}
	};

	//### Run Alert
	//$.messager.alert('Info','Message will be closed after 4 seconds.','info');

	//### Message Box
	$.messager.show({
		msg: 'Message will be closed after 4 seconds.',
		showType: 'slide',
		width: 500,
		height: 50,
		noheader: true,
		onBeforeOpen: function(){
			$(this).parent().addClass('message-default');
			$(this).addClass('message-body-primary');
			$(this).append("<a href='javascript:void(0)' class='message-close'>×</a>");
		}
	});

});
