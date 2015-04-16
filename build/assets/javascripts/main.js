/* 作者：李钰龙
 * 功能：扩展jquery
 * 扩展项目：
 *  1、序列化form表单
 *  2、根据参数转换字符串为list
 * 10、可更换主题 
 * 11、建立图标对象数组
 * 12、扩展datagrid，使datagrid的editors能保存combotree的多选值
 */


/**
 * @author 李钰龙
 * 增加formatString功能
 * 使用方法：formatString('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
 * @returns 格式化后的字符串
 */

$.formatString = function(str) {
	for ( var i = 0; i < arguments.length - 1; i++) {
		str = str.replace("{" + i + "}", arguments[i + 1]);
	}
	return str;
};


/**
 * @author 李钰龙
 * @requires jQuery
 * 将form表单元素的值序列化成对象
 * @returns object
 */
$.serializeObject = function(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	return o;
};


/**
 * @author 李钰龙
 * 接收一个以逗号分割的字符串，返回List，list里每一项都是一个字符串
 * @returns list
 */
$.stringToList = function(value) {
	if (value != undefined && value != '') {
		var values = [];
		var t = value.split(',');
		for ( var i = 0; i < t.length; i++) {
			values.push('' + t[i]);/* 避免他将ID当成数字 */
		}
		return values;
	} else {
		return [];
	}
};

/**
 * 获取指定id或者src地址的frame内容
 * 参数：idOrSrc iframe的id或者src
 * 		inFrame 是否在iframe内调用，默认没有
 */
$.getFrameContent = function(idOrSrc, inFrame) {
	if(idOrSrc && idOrSrc != null) {
		// 先判断参数为id的情况
		if(idOrSrc.indexOf(".") > 0 || idOrSrc.indexOf("/") > 0 || idOrSrc.indexOf(":") > 0) {
			// 找不到id对应的iframe，则传递的参数应该是src
			var frames = inFrame == true ? parent.$("iframe") : $("iframe");
			for(var i=0; i<frames.size(); i++) {
				var src = $(frames[i]).attr("src")
				if(src == idOrSrc) {
					return frames[i].contentWindow;
				}
			}
		} else {
			var frame =  inFrame == true ? parent.$("iframe#" + idOrSrc) : $("iframe#" + idOrSrc);
			if(frame.length != 0) {
				return frame[0].contentWindow;;
			}
		}
		return undefined;
	}
};
/* 作者：李钰龙
 * 功能：扩展EasyUI
 * 扩展项目：
 * 	1、自动回收自动回收iframe
 * 	2、可自定义加载时的文字
 *  3、加载出错时，将出错内容放入对话框
 *  4、增加表头菜单，控制显示隐藏列
 *  5、扩展数据验证
 *  6、树形控件自动可根据parentField自动生成树
 *  9、检测处理pannel超出边界情况
 * 10、可更换主题 
 * 11、建立图标对象数组
 * 12、扩展datagrid，使datagrid的editors能保存combotree的多选值
 */

/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
 */


$.fn.panel.defaults.onBeforeDestroy = function() {
	var frame = $('iframe', this);
	try {
		if (frame.length > 0) {
			for ( var i = 0; i < frame.length; i++) {
				frame[i].contentWindow.document.write('');
				frame[i].contentWindow.close();
			}
			frame.remove();
			if ($.browser.msie) {
				CollectGarbage();
			}
		}
	} catch (e) {
	}
};

/**
 * 使panel和datagrid在加载时提示
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 
 */
$.fn.panel.defaults.loadingMessage = '加载中....';
$.fn.datagrid.defaults.loadMsg = '加载中....';

/**
 * dialog打开、关闭时扩展动画效果
 * @author 李钰龙
 * @requires jQuery,EasyUI
 */
$.fn.dialog.defaults.onOpen = function() {
	$(this).parent().addClass("active");
};
$.fn.dialog.defaults.onClose = function() {
	$(this).parent().removeClass("active");
};

/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 通用错误提示
 * 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作
 */
var easyuiErrorFunction = function(XMLHttpRequest) {
	$.messager.progress('close');
	$.messager.alert('错误', XMLHttpRequest.responseText);
};
$.fn.datagrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.treegrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.tree.defaults.onLoadError = easyuiErrorFunction;
$.fn.combogrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combobox.defaults.onLoadError = easyuiErrorFunction;
$.fn.form.defaults.onLoadError = easyuiErrorFunction;

/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 为datagrid、treegrid增加表头菜单，用于显示或隐藏列，注意：冻结列不在此菜单中
 */
var createGridHeaderContextMenu = function(e, field) {
	e.preventDefault();
	var grid = $(this);/* grid本身 */
	var headerContextMenu = this.headerContextMenu;/* grid上的列头菜单对象 */
	if (!headerContextMenu) {
		var tmenu = $('<div style="width:100px;"></div>').appendTo('body');
		var fields = grid.datagrid('getColumnFields');
		for ( var i = 0; i < fields.length; i++) {
			var fildOption = grid.datagrid('getColumnOption', fields[i]);
			if (!fildOption.hidden) {
				$('<div iconCls="icon-ok" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
			} else {
				$('<div iconCls="icon-empty" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
			}
		}
		headerContextMenu = this.headerContextMenu = tmenu.menu({
			onClick : function(item) {
				var field = $(item.target).attr('field');
				if (item.iconCls == 'icon-ok') {
					grid.datagrid('hideColumn', field);
					$(this).menu('setIcon', {
						target : item.target,
						iconCls : 'icon-empty'
					});
				} else {
					grid.datagrid('showColumn', field);
					$(this).menu('setIcon', {
						target : item.target,
						iconCls : 'icon-ok'
					});
				}
			}
		});
	}
	headerContextMenu.menu('show', {
		left : e.pageX,
		top : e.pageY
	});
};
$.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
$.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;

/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 扩展validatebox，添加验证数据功能
 */
$.extend($.fn.validatebox.defaults.rules, {
	idcard : {// 验证身份证 
		validator : function(value) { 
			return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value); 
		}, 
		message : '身份证号码格式不正确' 
	},
	minLength: {
		validator: function(value, param){
			return value.length >= param[0];
		},
		message: '请输入至少（2）个字符.'
	},
	length:{validator:function(value,param){ 
		var len=$.trim(value).length; 
			return len>=param[0]&&len<=param[1]; 
		}, 
			message:"输入内容长度必须介于{0}和{1}之间." 
		}, 
	phone : {// 验证电话号码 
		validator : function(value) { 
			return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value); 
		}, 
		message : '格式不正确,请使用下面格式:020-88888888' 
	}, 
	mobile : {// 验证手机号码 
		validator : function(value) { 
			return /^(13|15|18)\d{9}$/i.test(value); 
		}, 
		message : '手机号码格式不正确' 
	}, 
	intOrFloat : {// 验证整数或小数 
		validator : function(value) { 
			return /^\d+(\.\d+)?$/i.test(value); 
		}, 
		message : '请输入数字，并确保格式正确' 
	}, 
	currency : {// 验证货币 
		validator : function(value) { 
			return /^\d+(\.\d+)?$/i.test(value); 
		}, 
		message : '货币格式不正确' 
	}, 
	qq : {// 验证QQ,从10000开始 
		validator : function(value) { 
			return /^[1-9]\d{4,9}$/i.test(value); 
		}, 
		message : 'QQ号码格式不正确' 
	}, 
	integer : {// 验证整数 
		validator : function(value) { 
			return /^[+]?[1-9]+\d*$/i.test(value); 
		}, 
		message : '请输入整数' 
	}, 
	age : {// 验证年龄
		validator : function(value) { 
			return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value); 
		}, 
		message : '年龄必须是0到120之间的整数' 
	}, 
	
	chinese : {// 验证中文 
		validator : function(value) { 
			return /^[\Α-\￥]+$/i.test(value); 
		}, 
		message : '请输入中文' 
	}, 
	english : {// 验证英语 
		validator : function(value) { 
			return /^[A-Za-z]+$/i.test(value); 
		}, 
		message : '请输入英文' 
	}, 
	unnormal : {// 验证是否包含空格和非法字符 
		validator : function(value) { 
			return /.+/i.test(value); 
		}, 
		message : '输入值不能为空和包含其他非法字符' 
	}, 
	username : {// 验证用户名 
		validator : function(value) { 
			return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value); 
		}, 
		message : '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）' 
	}, 
	faxno : {// 验证传真 
		validator : function(value) { 
//				return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i.test(value); 
			return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value); 
		}, 
		message : '传真号码不正确' 
	}, 
	zip : {// 验证邮政编码 
		validator : function(value) { 
			return /^[1-9]\d{5}$/i.test(value); 
		}, 
		message : '邮政编码格式不正确' 
	}, 
	ip : {// 验证IP地址 
		validator : function(value) { 
			return /d+.d+.d+.d+/i.test(value); 
		}, 
		message : 'IP地址格式不正确' 
	}, 
	name : {// 验证姓名，可以是中文或英文 
			validator : function(value) { 
				return /^[\Α-\￥]+$/i.test(value)|/^\w+[\w\s]+\w+$/i.test(value); 
			}, 
			message : '请输入姓名' 
	},
	date : {// 验证日期
		validator : function(value) { 
		//格式yyyy-MM-dd或yyyy-M-d
			return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(value); 
		},
		message : '清输入合适的日期格式'
	},
	msn:{ 
		validator : function(value){ 
		return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value); 
		}, 
		message : '请输入有效的msn账号(例：abc@hotmail(msn/live).com)' 
	},
	same:{ 
		validator : function(value, param){
			if(value == undefined) {
				return false;
			}
			return $(param[0]).val() == value;
		}, 
		message : '两次输入的密码不一致！'	
	} 
});

/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 扩展datagrid，添加单元格内容提示框
 */
$.extend($.fn.datagrid.methods, {	  
	/**
	 * 开打提示功能	
	 * @param {} jq	
	 * @param {} params 提示消息框的样式	
	 * @return {}	
	 */	 
	doCellTip:function (jq, params) {	  
		function showTip(showParams, td, e, dg) {	  
			//无文本，不提示。	  
			if ($(td).text() == "") return;	  
			   
			params = params || {};   
			showParams.content = '<div class="tipcontent">' + showParams.content + '</div>';	  
			$(td).tooltip({	  
				content:showParams.content,	  
				trackMouse:true,	  
				position:params.position,	  
				onHide:function () {	  
					$(this).tooltip('destroy');	  
				},
				onShow:function () {	  
					var tip = $(this).tooltip('tip');	  
					if(showParams.tipStyler){	  
						tip.css(showParams.tipStyler);	  
					}
					if(showParams.contentStyler){	  
						tip.find('div.tipcontent').css(showParams.contentStyler);	  
					}
				}	  
			}).tooltip('show');	  
	 
		};	  
		return jq.each(function () {	  
			var grid = $(this);	  
			var options = $(this).data('datagrid');	  
			if (options && !options.tooltip) {	  
				var panel = grid.datagrid('getPanel').panel('panel');	  
				panel.find('.datagrid-body').each(function () {	  
					var delegateEle = $(this).find('> div.datagrid-body-inner').length ? $(this).find('> div.datagrid-body-inner')[0] : this;	  
					$(delegateEle).undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove').delegate('td[field]', {	  
						'mouseover':function (e) {   
							//if($(this).attr('field')===undefined) return;	  
							var that = this;   
							var setField = null;   
							if(params.specialShowFields && params.specialShowFields.sort){   
								for(var i=0; i<params.specialShowFields.length; i++){   
									if(params.specialShowFields[i].field == $(this).attr('field')){   
										setField = params.specialShowFields[i];   
									}   
								}   
							}   
							if(setField==null){   
								options.factContent = $(this).find('>div').clone().css({'margin-left':'-5000px', 'width':'auto', 'display':'inline', 'position':'absolute'}).appendTo('body');	  
								var factContentWidth = options.factContent.width();	  
								params.content = $(this).text();	  
								if (params.onlyShowInterrupt) {	  
									if (factContentWidth > $(this).width()) {	  
										showTip(params, this, e, grid);	  
									}	  
								} else {	  
									showTip(params, this, e, grid);	  
								}	
							}else{   
								panel.find('.datagrid-body').each(function(){   
									var trs = $(this).find('tr[datagrid-row-index="' + $(that).parent().attr('datagrid-row-index') + '"]');   
									trs.each(function(){   
										var td = $(this).find('> td[field="' + setField.showField + '"]');   
										if(td.length){   
											params.content = td.text();   
										}   
									});   
								});   
								showTip(params, this, e, grid);   
							}   
						},	  
						'mouseout':function (e) {	  
							if (options.factContent) {	  
								options.factContent.remove();	  
								options.factContent = null;	  
							}	  
						}	  
					});	  
				});	  
			}	  
		});	  
	},
	/**
	 * 关闭消息提示功能	
	 * @param {} jq	
	 * @return {}	
	 */	 
	cancelCellTip:function (jq) {	  
		return jq.each(function () {	  
			var data = $(this).data('datagrid');	  
			if (data.factContent) {	  
				data.factContent.remove();	  
				data.factContent = null;	  
			}	  
			var panel = $(this).datagrid('getPanel').panel('panel');	  
			panel.find('.datagrid-body').undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove');
		});	  
	}	  
});  

/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 扩展datagrid，使datagrid的editors能保存combotree的多选值
 */
$.extend(jQuery.fn.datagrid.defaults.editors, {
	combotree: {
		init: function(container, options){
			var editor = jQuery('<input type="text">').appendTo(container);
			cip.editor = editor;
			cip.options = options;
			if(editor.combotree) {
				editor.combotree(options);
			} 
			return editor;
		},  
		destroy: function(target){
			$(target).combotree('destroy');
		},  
		getValue: function(target){
			var temp = $(target).combotree('getValues');
			return temp.join(',');
		},  
		setValue: function(target, value){
			if(value && value != null) {
				var temp = value.split(',');
				$(target).combotree('setValues', temp);
			}
		},
		resize: function(target, width){
			$(target).combotree('resize', width);
		}
	}
});  


/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 将tree，treegrid的list数据自动转换tree形式的json
 */
$.fn.treeDataFilterListToTree = function(data, opt) {
	if (opt.parentField) {
		var idField = opt.idField || 'id';
		var textField = opt.textField || 'text';
		var iconField = opt.iconField || 'iconCls';
		var parentField = opt.parentField || 'parentField';
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idField]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children']) {
					tmpMap[data[i][parentField]]['children'] = [];
				}
				data[i]['id'] = data[i][idField];
				data[i]['text'] = data[i][textField];
				data[i]['iconCls'] = data[i][iconField];
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['id'] = data[i][idField];
				data[i]['text'] = data[i][textField];
				data[i]['iconCls'] = data[i][iconField];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
	
}

/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 扩展tree，使tree支持设置父节点，自动生成树形结构
 * 增加parentField属性
 */
$.fn.tree.defaults.loadFilter = function(data) {
	return $.fn.treeDataFilterListToTree(data, $(this).data().tree.options);
};

/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 扩展treegrid，使treegrid支持设置父节点，自动生成树形结构
 * 增加parentField属性
 */
$.fn.treegrid.defaults.loadFilter = function(data) {
	return $.fn.treeDataFilterListToTree(data, $(this).data().treegrid.options);
};



/** 
 * 扩展树表格级联勾选方法： 
 * @param {Object} container 
 * @param {Object} options 
 * @return {TypeName}  
 */  
$.extend($.fn.treegrid.methods,{  
	/** 
	 * 级联选择 
	 * @param {Object} target 
	 * @param {Object} param  
	 *	  param包括两个参数: 
	 *		  id:勾选的节点ID 
	 *		  deepCascade:是否深度级联 
	 * @return {TypeName}  
	 */  
	cascadeCheck : function(target,param){  
		var opts = $.data(target[0], "treegrid").options;  
		if(opts.singleSelect)  
			return;  
		var idField = opts.idField;//这里的idField其实就是API里方法的id参数  
		var status = false;//用来标记当前节点的状态，true:勾选，false:未勾选  
		var selectNodes = $(target).treegrid('getSelections');//获取当前选中项  
		for(var i=0;i<selectNodes.length;i++){  
			if(selectNodes[i][idField]==param.id)  
				status = true;  
		}  
		//级联选择父节点  
		selectParent(target[0],param.id,idField,status);  
		selectChildren(target[0],param.id,idField,param.deepCascade,status);  
		/** 
		 * 级联选择父节点 
		 * @param {Object} target 
		 * @param {Object} id 节点ID 
		 * @param {Object} status 节点状态，true:勾选，false:未勾选 
		 * @return {TypeName}  
		 */  
		function selectParent(target,id,idField,status){  
			var parent = $(target).treegrid('getParent',id);  
			if(parent){  
				var parentId = parent[idField];  
				if(status)  
					$(target).treegrid('select',parentId);  
				else  
					$(target).treegrid('unselect',parentId);  
				selectParent(target,parentId,idField,status);  
			}  
		}  
		/** 
		 * 级联选择子节点 
		 * @param {Object} target 
		 * @param {Object} id 节点ID 
		 * @param {Object} deepCascade 是否深度级联 
		 * @param {Object} status 节点状态，true:勾选，false:未勾选 
		 * @return {TypeName}  
		 */  
		function selectChildren(target,id,idField,deepCascade,status){  
			//深度级联时先展开节点  
			if(!status&&deepCascade)  
				$(target).treegrid('expand',id);  
			//根据ID获取下层孩子节点  
			var children = $(target).treegrid('getChildren',id);  
			for(var i=0;i<children.length;i++){  
				var childId = children[i][idField];  
				if(status)  
					$(target).treegrid('select',childId);  
				else  
					$(target).treegrid('unselect',childId);  
				selectChildren(target,childId,idField,deepCascade,status);//递归选择子节点  
			}  
		}  
	}  
});

/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 扩展combotree，使combotree支持设置父节点，自动生成树形结构
 * 增加parentField属性
 */
$.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;

/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 扩展datagrid行编辑的combobox编辑器，解决无法设置多选值的bug
 */
$.extend($.fn.datagrid.defaults.editors.combobox, {
	getValue : function(jq) {
		var opts = $(jq).combobox('options');
		if(opts.multiple){
			var values = $(jq).combobox('getValues');
			if(values.length>0){
				if(values[0]==''||values[0]==' '){
					return values.join(',').substring(1);//新增的时候会把空白当成一个值了，去掉
				}
			}
			return values.join(',');
		} else
			return $(jq).combobox("getValue");
	},
	setValue : function(jq, value) {
		var opts = $(jq).combobox('options');
		if(opts.multiple && value!=null && (""+value).indexOf(opts.separator)!=-1){//多选且不只一个值
			var values = (""+value).split(opts.separator);
			$(jq).combobox("setValues", values);
		} else
			$(jq).combobox("setValue", value);
	}
});

/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 扩展datagrid行编辑的combogrid编辑器
 */
$.extend($.fn.datagrid.defaults.editors, {
	combogrid: {
		init: function(container, options){
			var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);
			input.combogrid(options);
			return input;
		},
		destroy: function(target){
			$(target).combogrid('destroy');
		},
		getValue: function(jq){
			var opts = $(jq).combogrid('options');
			if(opts.multiple){
				var values = $(jq).combogrid('getValues');
				if(values.length>0){
					if(values[0]==''||values[0]==' '){
						return values.join(',').substring(1);//新增的时候会把空白当成一个值了，去掉
					}
				}
				return values.join(',');
			} else
				return $(jq).combogrid("getValue");
		},
		setValue: function(jq, value){
			var opts = $(jq).combogrid('options');
			if(opts.multiple && value!=null && (""+value).indexOf(opts.separator)!=-1){//多选且不只一个值
				var values = (""+value).split(opts.separator);
				$(jq).combogrid("setValues", values);
			} else
				$(jq).combogrid("setValue", value);
		},
		resize: function(target, width){
			$(target).combogrid('resize',width);
		}
	}
});
/**
 * 扩展datebox为datetimebox
 */
$.extend($.fn.datagrid.defaults.editors, { 
	datetimebox: {   
		init: function(container, options){   
			var editor = $('<input />').appendTo(container);   
			options.editable = false;
			editor.datetimebox(options);
			return editor;   
		},   
		getValue: function(target){   
			return $(target).datetimebox('getValue');   
		},   
		setValue: function(target, value){   
			$(target).datetimebox('setValue', value);   
		},   
		resize: function(target, width){   
			$(target).datetimebox('resize',width);
		},
		destroy: function(target) {
			$(target).datetimebox('destroy');
		}
	}
}); 

$.extend($.fn.datagrid.methods, { /*扩展动态编辑框，可以指定禁止编辑的编辑框所在的列*/
	addEditor : function(jq, param) {
		if (param instanceof Array) {
			$.each(param, function(index, item) {
				var e = $(jq).datagrid('getColumnOption', item.field);
				e.editor = item.editor;
			});
		} else {
			var e = $(jq).datagrid('getColumnOption', param.field);
			e.editor = param.editor;
		}
	},
	removeEditor : function(jq, param) {
		if (param instanceof Array) {
			$.each(param, function(index, item) {
				var e = $(jq).datagrid('getColumnOption', item);
				e.editor = {};
			});
		} else {
			var e = $(jq).datagrid('getColumnOption', param);
			e.editor = {};
		}
	}
});

/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 创建一个模式化的dialog
 * @returns $.modalDialog.handler 这个handler代表弹出的dialog句柄
 * @returns $.modalDialog.xxx 这个xxx是可以自己定义名称，主要用在弹窗关闭时，刷新某些对象的操作，可以将xxx这个对象预定义好
 */
$.modalDialog = function(options) {
	var opts = $.extend({
		title : '模态窗口',
		width : 840,
		height : 680,
		modal : true,
		closable : true,
		onClose : function() {
			$(this).dialog('destroy');
		}
	}, options);
	opts.modal = true;// 强制此dialog为模式化，无视传递过来的modal参数
	return $.modalDialog.handler = $('<div/>').dialog(opts);
};



/**
 * @author 李钰龙
 * @requires jQuery,EasyUI
 * 防止panel/window/dialog组件超出浏览器边界
 * @param left
 * @param top
 */
var easyuiPanelOnMove = function(left, top) {
	var l = left;
	var t = top;
	if (l < 1) {
		l = 1;
	}
	if (t < 1) {
		t = 1;
	}
	var width = parseInt($(this).parent().css('width')) + 14;
	var height = parseInt($(this).parent().css('height')) + 14;
	var right = l + width;
	var buttom = t + height;
	var browserWidth = $(window).width();
	var browserHeight = $(window).height();
	if (right > browserWidth) {
		l = browserWidth - width;
	}
	if (buttom > browserHeight) {
		t = browserHeight - height;
	}
	$(this).parent().css({/* 修正面板位置 */
		left : l,
		top : t
	});
};
$.fn.dialog.defaults.onMove = easyuiPanelOnMove;
$.fn.window.defaults.onMove = easyuiPanelOnMove;
$.fn.panel.defaults.onMove = easyuiPanelOnMove;


/**
 * @author 李钰龙
 * @requires jQuery
 * 改变jQuery的AJAX默认属性和方法
 */
$.ajaxSetup({
	type : 'POST',
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		$.messager.progress('close');
		$.messager.alert('错误', XMLHttpRequest.responseText+"_"+errorThrown);
	}
});
 
/**
 * @author 李钰龙
 * @requires jQuery,EasyUI,jQuery cookie plugin
 * 更换EasyUI主题的方法
 * @param themeName 主题名称
 */
$.changeThemeFun = function(themeName) {
	var $easyuiTheme = $('#easyuiTheme');
	var url = $easyuiTheme.attr('href');
	var href = url.substring(0, url.indexOf('themes')) + 'themes/' + themeName + '/easyui.css';
	$easyuiTheme.attr('href', href);
	var $iframe = $('iframe');
	if ($iframe.length > 0) {
		for ( var i = 0; i < $iframe.length; i++) {
			var ifr = $iframe[i];
			$(ifr).contents().find('#easyuiTheme').attr('href', href);
		}
	}
	$.cookie('easyuiThemeName', themeName, {
		expires : 7
	});
};


/**
 * @author 李钰龙
 * @requires jQuery,EasyUI，My97
 * 扩展my97插件
 * 使用方法：参数和my97原本控件参数相同
 * 			class="easyui-my97"
 * 			data-options="readOnly:true,dateFmt:'yyyy-MM-dd'"
 */
$.fn.my97 = function (options, params) {
	if (typeof options == "string") {
		return $.fn.my97.methods[options](this, params);
	}
	options = options || {};
	if (!WdatePicker) {
		alert("未引入My97js包！");
		return;
	}
	return this.each(function () {
		var data = $.data(this, "my97");
		var newOptions;
		if (data) {
			newOptions = $.extend(data.options, options);
			data.opts = newOptions;
		} else {
			newOptions = $.extend({}, $.fn.my97.defaults, $.fn.my97.parseOptions(this), options);
			$.data(this, "my97", {
				options : newOptions
			});
		}
		$(this).addClass('Wdate').click(function () {
			WdatePicker(newOptions);
		});
	});
};
$.fn.my97.methods = {
	setValue : function (target, params) {
		target.val(params);
	},
	getValue : function (target) {
		return target.val();
	},
	clearValue : function (target) {
		target.val('');
	}
};
$.fn.my97.parseOptions = function (target) {
	return $.extend({}, $.parser.parseOptions(target, 
		["el", "vel", "weekMethod", "lang", "skin", 
		 "dateFmt", "realDateFmt", "realTimeFmt", 
		 "realFullFmt", "minDate", "maxDate", "startDate", {
			doubleCalendar : "boolean",
			enableKeyboard : "boolean",
			enableInputMask : "boolean",
			autoUpdateOnChanged : "boolean",
			firstDayOfWeek : "number",
			isShowWeek : "boolean",
			highLineWeekDay : "boolean",
			isShowClear : "boolean",
			isShowToday : "boolean",
			isShowOthers : "boolean",
			readOnly : "boolean",
			errDealMode : "boolean",
			autoPickDate : "boolean",
			qsEnabled : "boolean",
			autoShowQS : "boolean",
			opposite : "boolean"
		}
	]));
};
$.fn.my97.defaults = {
	dateFmt : 'yyyy-MM-dd HH:mm:ss'
};
$.parser.plugins.push('my97');
//扩展my97日期控件结束
;
if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '第';
	$.fn.pagination.defaults.afterPageText = '共{pages}页';
	$.fn.pagination.defaults.displayMsg = '显示{from}到{to},共{total}记录';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '正在处理，请稍待。。。';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '确定';
	$.messager.defaults.cancel = '取消';
}
$.map(['validatebox','textbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = '该输入项为必输项';
	}
});
if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
	$.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
	$.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
	$.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['日','一','二','三','四','五','六'];
	$.fn.calendar.defaults.months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '今天';
	$.fn.datebox.defaults.closeText = '关闭';
	$.fn.datebox.defaults.okText = '确定';
	$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
	};
	$.fn.datebox.defaults.parser = function(s){
		if (!s) return new Date();
		var ss = s.split('-');
		var y = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		var d = parseInt(ss[2],10);
		if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
			return new Date(y,m-1,d);
		} else {
			return new Date();
		}
	};
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}
if ($.fn.datetimespinner){
	$.fn.datetimespinner.defaults.selections = [[0,4],[5,7],[8,10],[11,13],[14,16],[17,19]]
}
;

/* 说明：如果使用url方式引入页面，自己页面的变量，必须在qc下添加命名空间
 * 例： 添加页面 planTreeYear.jsp
 *      命名空间为 qc.planTreeYear (命名空间可以自定义，要求不与其他页面命名空间重复即可)
 *      变量为 qc.planTreeYear.dgTree  定义datagrid
 *          或 qc.planTreeYear.comboPerson  定义combobox
 */

// 定义命名空间
if (!qc) var qc = {};
if (!qc.combotree) qc.combotree = {};
if (!qc.combobox) qc.combobox = {};
if (!qc.datagrid) qc.datagrid = {};
if (!qc.treegrid) qc.treegrid = {};
if (!qc.tree) qc.tree = {};
if (!qc.menu) qc.menu = {};
if (!qc.form) qc.form = {};
if (!qc.dialog) qc.dialog = {};
if (!qc.tabs) qc.tabs = {};
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
		border : false, fit : true, tabHeight:41,
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
		var src = null;
		currTab = qc.main.mainTabs.tabs('getSelected');
		if(iframe) {
			src = qc.main.mainTabs.tabs('getTab', subtitle).find("iframe").attr("src");
		} else {
			src = qc.main.mainTabs.tabs('getTab', subtitle).panel("options").href;
		}
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
;





