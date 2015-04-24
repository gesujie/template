### 说明

我们修改了easyui的界面风格和部分js，使得后台管理界面框架得以建立。

### 如何开始使用

### 下载

下面有几种快速使用的方法：

#### 如果你没有使用GIT

[下载这个最新版本的发布包](https://bitbucket.org/coskuntekin/admin-template-easyui/get/0.1.2.zip)

#### 如果使用了GIT

直接在你的电脑上迁出这个地址 `git clone https://coskuntekin@bitbucket.org/coskuntekin/admin-template-easyui.git`

#### Windows

请下载以后，将文件夹内的build文件夹放到服务器根目录，然后访问对应的服务器首页进行预览。

### 目录结构

```
#!code
admin-template-easyui/
├── build/
│   ├── assets/
│   │   ├── images
│   │   │   ├── logo.png
│   │   │   └── tree_icons.png
│   │   ├── javascripts
│   │   │   ├── components
│   │   │   │   ├── admin
│   │   │   │   │   └── qc.admin.js
│   │   │   │   ├── easyloader
│   │   │   │   │   └── easyloader.js
│   │   │   │   ├── extEasyui
│   │   │   │   │   └── qc.ext.easyui.js
│   │   │   │   ├── extJquery
│   │   │   │   │   └── qc.ext.jquery.js
│   │   │   │   ├── location
│   │   │   │   │   └── easyui-lang-zh_CN.js
│   │   │   │   ├── moment
│   │   │   │   │   └── moment.js
│   │   │   │   ├── schedule
│   │   │   │   │   ├── fullcalendar.js
│   │   │   │   │   └── zh-cn.js
│   │   │   │   ├── tabs
│   │   │   │   │   └──qc.admin.tab.js
│   │   │   │   └── webUploader
│   │   │   │       ├── Uploader.swf
│   │   │   │       ├── upload.js
│   │   │   │       └── webuploader.js
│   │   │   ├── json
│   │   │   │   ├── datagridData
│   │   │   │   │   └── demoDatagridData.json
│   │   │   │   ├── demoData
│   │   │   │   │   └── tree_data1.json
│   │   │   │   ├── scheduleEvents
│   │   │   │   │   └── events.json
│   │   │   │   └── sidebarNav
│   │   │   │      └── mainMenuTreeData.json
│   │   │   ├──vendor
│   │   │   │   ├──jquery.easyui.min.js
│   │   │   │   └──jquery-2.1.3.min.js
│   │   │   ├── application.js
│   │   │   └── main.js
│   │   └── stylesheets
│   │       └── application.css
│   ├── pages/
│   │   ├── accordion.html
│   │   ├── dashboard.html
│   │   ├── datagrid-form.html
│   │   ├── datagrid.html
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── schedule.html
│   │   ├── tabs.html
│   │   ├── tree.html
│   │   └── uploader.html
│   ├── source/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── partials/
│   │   ├── .editorconfig
│   │   ├── .htaccess
│   │   ├── 404.html
│   │   ├── browserconfig.xml
│   │   ├── crossdomain.xml
│   │   ├── favicon.ico
│   │   ├── humans.txt
│   │   ├── index.html.haml
│   │   └── robots.txt
```

### README

We modified "easy ui" styles and javascript then created a admin template page.

### How do I get set up?

#### Download

Several quick start options are available:

#### If you have no "GIT"

[Download the latest release.](https://bitbucket.org/coskuntekin/admin-template-easyui/get/0.1.2.zip)

####  If you have "GIT"

Clone the repo: `git clone https://coskuntekin@bitbucket.org/coskuntekin/admin-template-easyui.git`

#### Windows

You don't need any third part to install. For preview you can use "build" folder. Because build are HTML5-CSS3. Please use your localhost.

#### Linux

If you have ruby you need to install "middleman" gem then you can run middleman server.

### What's Include

```
#!code
admin-template-easyui/
├── build/
│   ├── assets/
│   │   ├── images
│   │   │   ├── logo.png
│   │   │   └── tree_icons.png
│   │   ├── javascripts
│   │   │   ├── components
│   │   │   │   ├── admin
│   │   │   │   │   └── qc.admin.js
│   │   │   │   ├── easyloader
│   │   │   │   │   └── easyloader.js
│   │   │   │   ├── extEasyui
│   │   │   │   │   └── qc.ext.easyui.js
│   │   │   │   ├── extJquery
│   │   │   │   │   └── qc.ext.jquery.js
│   │   │   │   ├── location
│   │   │   │   │   └── easyui-lang-zh_CN.js
│   │   │   │   ├── moment
│   │   │   │   │   └── moment.js
│   │   │   │   ├── schedule
│   │   │   │   │   ├── fullcalendar.js
│   │   │   │   │   └── zh-cn.js
│   │   │   │   ├── tabs
│   │   │   │   │   └──qc.admin.tab.js
│   │   │   │   └── webUploader
│   │   │   │       ├── Uploader.swf
│   │   │   │       ├── upload.js
│   │   │   │       └── webuploader.js
│   │   │   ├── json
│   │   │   │   ├── datagridData
│   │   │   │   │   └── demoDatagridData.json
│   │   │   │   ├── demoData
│   │   │   │   │   └── tree_data1.json
│   │   │   │   ├── scheduleEvents
│   │   │   │   │   └── events.json
│   │   │   │   └── sidebarNav
│   │   │   │      └── mainMenuTreeData.json
│   │   │   ├──vendor
│   │   │   │   ├──jquery.easyui.min.js
│   │   │   │   └──jquery-2.1.3.min.js
│   │   │   ├── application.js
│   │   │   └── main.js
│   │   └── stylesheets
│   │       └── application.css
│   ├── pages/
│   │   ├── accordion.html
│   │   ├── dashboard.html
│   │   ├── datagrid-form.html
│   │   ├── datagrid.html
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── schedule.html
│   │   ├── tabs.html
│   │   ├── tree.html
│   │   └── uploader.html
│   ├── source/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── partials/
│   │   ├── .editorconfig
│   │   ├── .htaccess
│   │   ├── 404.html
│   │   ├── browserconfig.xml
│   │   ├── crossdomain.xml
│   │   ├── favicon.ico
│   │   ├── humans.txt
│   │   ├── index.html.haml
│   │   └── robots.txt
```

### Contributes Guideline

* If you find any issue please create a issue
* If you have any idea about features please create a issue
* If you updated please pull request

### Credit

* [jQuery](https://jquery.com/)
* [Easy UI](http://www.jeasyui.com/)
* [Full Calendar](http://fullcalendar.io/)
* [Moment JS](http://momentjs.com/)
* [Web Uploader](http://fex.baidu.com/webuploader/)