/* 功能：黔驰EasyuiUI框架，主框架生成js
 * 作者：李钰龙
 * 日期：2015-3-27
 */

if (!qc) var qc = {};
qc.main = {};  // UI框架命名空间
qc.main.onlyOpenTitle = "欢迎使用";
qc.main.mainTabs = null;

$(function(){
	if(!qc.main.slideMenuUrl || qc.main.slideMenuUrl == null) {
		qc.main.slideMenuUrl = "json/mainMenuTreeData.json";
	}

	$("#mainSlideMenu").tree({
		url : qc.main.slideMenuUrl,
		fit : true, animate : true,
		parentField : "parentId",
		onClick: function(node){
			if(node.url) {
				qc.main.addTab(node.text, node.url, node.icon, !!node.iframe);
			}
		}
	});

	qc.main.mainTabs = $("#mainTabs").tabs({
		border : false,
        fit : true,
        tabHeight:41,
		onLoad:function(panel){
			
		}

	});
});


// 获取左侧导航的图标
qc.main.getIcon = function(id) {
	var iconCls = '';
	$.each(_menus, function(i, n) {
		$.each(n.children, function(j, o) {
			if (o.id == id) {
				iconCls = o.iconCls;
			}
		});
	});
	return iconCls;
};

qc.main.find = function(id) {
	var obj = null;
	$.each(_menus, function(i, n) {
		$.each(n.children, function(j, o) {
			if (o.id == id) {
				obj = o;
			}
		});
	});
	return obj;
};

qc.main.addTab = function(subtitle, url, icon, iframe) {
	var currTab = null;
	if (!qc.main.mainTabs.tabs('exists', subtitle)) {
		qc.main.mainTabs.tabs('add', {
			title : subtitle,
			content : !!iframe ? qc.main.createFrame(url) : null,
			href : !!iframe ? null : url,
			closable : true,
			icon : icon
		});
		currTab = qc.main.mainTabs.tabs('getSelected');
	} else {
		qc.main.mainTabs.tabs('select', subtitle);
		// 下面的代码解决同名菜单问题，同名但不同地址，则刷新页面
		var src = qc.main.mainTabs.tabs('getTab', subtitle).find("iframe").attr("src");
		currTab = qc.main.mainTabs.tabs('getSelected');
		if(src != url) {
			qc.main.mainTabs.tabs('update', {
				tab : currTab,
				options : {
					content : !!iframe ? qc.main.createFrame(url) : null,
					href : !!iframe ? null : url, icon : icon
				}
			});
		}
	}
	if(iframe && currTab != null) {
		currTab.css("overflow", "hidden");
		currTab.iframe = iframe;
	}
	qc.main.tabClose();
	qc.main.tabCloseEven();
};

qc.main.createFrame = function(url) {
	var s = '<iframe scrolling="auto" frameborder="0"  src="' + url
			+ '" style="width:100%;height:100%;"></iframe>';
	return s;
};

// 绑定菜单
qc.main.tabClose = function() {
	/* 双击关闭TAB选项卡 */
	$(".tabs-inner").dblclick(function() {
		var subtitle = $(this).children(".tabs-closable").text();
		qc.main.mainTabs.tabs('close', subtitle);
	});
	$(".tabs-inner").mousedown(function(e){
		e.preventDefault();
		if(e.which == 2) { // 1 = 鼠标左键 left; 2 = 鼠标中键; 3 = 鼠标右键
			var subtitle = $(this).children(".tabs-closable").text();
			qc.main.mainTabs.tabs('close', subtitle);
			return false;//阻止链接跳转
		};
	});
	// 鼠标中键点击关闭操作
	$(".tabs-selected").mousedown(function(e){
		e.preventDefault();
		if(e.which == 2) { // 1 = 鼠标左键 left; 2 = 鼠标中键; 3 = 鼠标右键
			var subtitle = $(this).children().first().text();
			qc.main.mainTabs.tabs('close', subtitle);
			return false;//阻止链接跳转
		};
		return false;
	});
	/* 为选项卡绑定右键 */
	$(".tabs-selected").bind('contextmenu', function(e) {
		$('#mainTabMenu').menu('show', {
			left : e.pageX,
			top : e.pageY
		});
		var subtitle = $(this).children().first().text();
		$('#mainTabMenu').data("currtab", subtitle);
		qc.main.mainTabs.tabs('select', subtitle);
		return false;
	});
};

// 绑定右键菜单事件
qc.main.tabCloseEven = function() {
	$('#mainTabMenu').menu({
		onClick : function(item) {
			qc.main.closeTab(item.id);
		}
	});
	return false;
}

// 关闭菜单选项
qc.main.closeTab = function(action) {
	var alltabs = qc.main.mainTabs.tabs('tabs');
	var currentTab = qc.main.mainTabs.tabs('getSelected');
	var currtabTitle = currentTab.panel('options').title;
	var allTabtitle = [];
	$.each(alltabs, function(i, n) {
		allTabtitle.push($(n).panel('options').title);
	});
	switch (action) {
	case "refresh":
		var src;
		if (currtabTitle != qc.main.onlyOpenTitle) {
			src = currentTab.children()[0].src;
			if(src != null && src.length > 0) {
				qc.main.mainTabs.tabs('update', {
					tab : currentTab,
					options : {
						content : !!currentTab.iframe ? qc.main.createFrame(src) : null
					}
				});
			} else {
				qc.main.mainTabs.tabs('getSelected').panel("refresh");
			}
		}

		break;
	case "close":
		if (currtabTitle != qc.main.onlyOpenTitle) {
			qc.main.mainTabs.tabs('close', currtabTitle);
		}
		break;
	case "closeall":
		$.each(allTabtitle, function(i, n) {
			if (n != qc.main.onlyOpenTitle) {
				qc.main.mainTabs.tabs('close', n);
			}
		});
		break;
	case "closeother":
		$.each(allTabtitle, function(i, n) {
			if (n != currtabTitle && n != qc.main.onlyOpenTitle) {
				qc.main.mainTabs.tabs('close', n);
			}
		});
		break;
	case "closeright":
		var tabIndex = qc.main.mainTabs.tabs('getTabIndex', currentTab);
		if (tabIndex == alltabs.length - 1) {
			$.messager.show({title:'提示',
				msg:'右边没有可关闭的标签！',
				timeout:5000,
				showType:'slide'
			});
			return false;
		}
		$.each(allTabtitle, function(i, n) {
			if (i > tabIndex) {
				if (n != qc.main.onlyOpenTitle) {
					qc.main.mainTabs.tabs('close', n);
				}
			}
		});

		break;
	case "closeleft":
		var tabIndex = qc.main.mainTabs.tabs('getTabIndex', currentTab);
		if (tabIndex == 1) {
			$.messager.show({title:'提示',
				msg:'左边没有可关闭的标签！',
				timeout:5000,
				showType:'slide'
			});
			return false;
		}
		$.each(allTabtitle, function(i, n) {
			if (i < tabIndex) {
				if (n != qc.main.onlyOpenTitle) {
					qc.main.mainTabs.tabs('close', n);
				}
			}
		});
		break;
	}
}

qc.main.menushow = function(e){
	var lis=$(".menu > li");
	$("#"+e.id).addClass("active");
	$("div."+e.id).fadeIn();
	var src=$("div."+e.id+" > iframe").attr("src");
	if(src==""||src=="#"){
		durl=$("div."+e.id).attr("title");
		$("div."+e.id+" > iframe").attr("src",durl);
	}
	for ( var int = 0; int < lis.length; int++) {
		var lid=lis[int].id;
		if(e.id!=lid){
			$("#"+lid).removeClass("active");
			$("div."+lid).css("display", "none");
		}
	}
}
/**
 * 功能：关闭当前tab,选中指定标题的tab,并刷新对应的frameID
 * 参数：tab的id
 * 使用约束：必须传递.doUrl
 */
qc.main.closeThisAndsOpenOther = function(thisTabTitle,otherTabTitle,frameURL) {
    
    //判断otherTabTitle的tab是否存在
	if (qc.main.mainTabs.tabs('exists', otherTabTitle))
	{  //关闭当前tab
	    qc.main.mainTabs.tabs('close', thisTabTitle);
	    //存在 先选中
	   qc.main.mainTabs.tabs('select', otherTabTitle);
	    //获取地址
	   
		var currTab = qc.main.mainTabs.tabs('getSelected');
		var iframe = $(currTab.panel('options').content);
		src = iframe.attr('src');
		//地址不同，更换Frame
		if(src != frameURL) 
		{
		 qc.main.mainTabs.tabs('update', {
				tab : currTab,
				options : {
					content : qc.main.createFrame(frameURL)
				}
			});
		}
		else//地址相同，不执行
		{
		  	//var reloadframe=qc.main.getCurrentWindow(frameURL);
			//reloadframe.location.reload();
		}
	}
	else//名称otherTabTitle的tab不存在
	{
			var currTab2 = qc.main.mainTabs.tabs('getSelected');
			qc.main.mainTabs.tabs('update', {
				tab : currTab2,
				options : {
				    title: otherTabTitle,
					content : qc.main.createFrame(frameURL)
				}
			});
	}
	
}

/**
 * 功能：关闭模态窗口并刷新制定Frame
 * 参数：frame的id
 */
qc.main.getCurrentWindow = function(frameID) {
	var framename=frameID;
	var index = frameID.lastIndexOf(".");
	if(index!=-1)
	{
		 framename=frameID.substring(0,index);
	}
	return frames[framename];
}

/**
 * 功能：弹出信息窗口
 * 参数：title:标题 
 *		 msgString:提示信息 
 *		 msgType:信息类型 [error,info,question,warning]
 */
qc.main.msgShow = function(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}