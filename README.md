### 说明

我们修改了easyui的界面风格和部分js，使得后台管理界面框架得以建立。

### 如何开始使用

### 下载

下面有几种快速使用的方法：

#### 如果你没有使用GIT

[下载这个最新版本的发布包](https://bitbucket.org/coskuntekin/admin-template-easyui/get/0.1.5.zip)

#### 如果使用了GIT

直接在你的电脑上迁出这个地址 `git clone https://coskuntekin@bitbucket.org/coskuntekin/admin-template-easyui.git`

#### Windows

请下载以后，将文件夹内的build文件夹放到服务器根目录，然后访问对应的服务器首页进行预览。

### 如何更新 (v0.1.5)

* 我们添加了两个主题选项。使用请将类添加上 `body`

    * `<body class="theme-default">`
    * `<body class="theme-material">`

* 我们改变按钮颜色变量类。`color-*` 替换 `l-btn-*`

* 我们有两个按钮图标动画。我们删除 `btn-jump`

    * `l-btn-bounce`
    * `l-btn-fade`

* 我们添加两个新页面。您不需要创建登录页和 404 页。

    * `pages/register.html`
    * `pages/404.html`
    
* 你可以使用选项卡的功能定位。

    * `tabPosition:'top'` 
    * `tabPosition:'right'` 
    * `tabPosition:'bottom'` 
    * `tabPosition:'left'` 

* 我们改变默认复选框和单选按钮的样式。对于使用请添加该类上输入
    
    * `<input class="easyui-checkbox" type="checkbox">`
    * `<input class="easyui-radio" type="radio">`

### README

We modified "easy ui" styles and javascript then created a admin template page.

### How do I get set up?

#### Download

Several quick start options are available:

#### If you have no "GIT"

[Download the latest release.](https://bitbucket.org/coskuntekin/admin-template-easyui/get/0.1.5.zip)

####  If you have "GIT"

Clone the repo: `git clone https://coskuntekin@bitbucket.org/coskuntekin/admin-template-easyui.git`

#### Windows

You don't need any third part to install. For preview you can use "build" folder. Because build are HTML5-CSS3. Please use your localhost.

#### Linux

If you have ruby you need to install "middleman" gem then you can run middleman server.

### Contributes Guideline

* If you find any issue please create a issue
* If you have any idea about features please create a issue
* If you updated please pull request

### How to Update (v0.1.5)

* We added two theme options. For use please add class on `body`

    * `<body class="theme-default">`
    * `<body class="theme-material">`
    
* We changed button color variables class. `color-*` replace with `l-btn-*`

* We have two button icons animation. We removed `btn-jump`

    * `l-btn-bounce`
    * `l-btn-fade`

* We added two new pages. You don't need to create login page and 404 page.
    
    * `pages/register.html`
    * `pages/404.html`

* You can use tabs with positions functions. 
    
    * `tabPosition:'top'` 
    * `tabPosition:'right'` 
    * `tabPosition:'bottom'` 
    * `tabPosition:'left'` 

* We changed default checkbox and radio button styles. For use please add that class on input
    
    * `<input class="easyui-checkbox" type="checkbox">`
    * `<input class="easyui-radio" type="radio">`
    
### Credit

* [jQuery](https://jquery.com/)
* [Easy UI](http://www.jeasyui.com/)
* [Font Awesome](http://fortawesome.github.io/Font-Awesome)
* [Full Calendar](http://fullcalendar.io/)
* [Moment JS](http://momentjs.com/)
* [Web Uploader](http://fex.baidu.com/webuploader/)