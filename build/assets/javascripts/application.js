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

//### Sidebar navigation json
qc.main.slideMenuUrl = "assets/javascripts/json/sidebarNav/mainMenuTreeData.json";

//### Registry login button
function btnRegistry(){
    $('.panel-registry').addClass('active');
    $('.panel-login').addClass('passive');
}

//### Registry back button
function btnBack(){
    $('.panel-registry').removeClass('active');
    $('.panel-login').removeClass('passive');
}
;
