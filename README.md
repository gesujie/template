# EASY ADMIN

## What's Easy Admin

Easy Admin are HTML5-CSS3-JS based administrator template.

### Demo Page

Please checkout [here](http://easy-admin.aer​obatic.io/). If you find any bug please create issue. 

## Feature of Easy Admin

  - #### Grid System
  - #### Button Icon Hover Animation
  - #### Themes
  - #### Datagrid
  - #### Tabs
  - #### Panels
  - #### Labels & Buttons
  - #### Window & Dialog
  - #### Accordion
  - #### Forms
  - #### Tree
  - #### Calendar
  - #### Uploader
  - #### Alert
  - #### Dropdown
  
## How do I get set up?

### Download

Several quick start options are available:

### If you have no "GIT"

[Download the latest release.](https://bitbucket.org/coskuntekin/easy-admin/get/v0.1.12.zip)

###  If you have "GIT"

Clone the repo: `git clone https://coskuntekin@bitbucket.org/coskuntekin/easy-admin.git`

### Windows

You don't need any third part to install. For preview you can use `build` folder. Because build folder are HTML5-CSS3-JS.

### Linux

If you have ruby you should to install `gem install middleman` gem then you can run `middleman server`.

## Contributes Guideline

* If you find any issue please create a issue
* If you have any idea about features please create a issue
* If you updated please pull request

## What is Next ?

[ ] Add slim scroll 
[ ] Add SVG graph 
[ ] Add responsive media query

## Changelog (v0.1.12)

* Added dropdown button
* Added source code view

## Changelog (v0.1.10)

* Fixed tree JSON issue 
* Added alert. 4 color variant. `alert alert-success`
* If you are using `fontawesome` CDN please removed, on this version we added fontawesome in local file. Please feel free to use CDN.
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

## Credit

* [jQuery](https://jquery.com/)
* [Easy UI](http://www.jeasyui.com/)
* [Font Awesome](http://fortawesome.github.io/Font-Awesome)
* [Full Calendar](http://fullcalendar.io/)
* [Moment JS](http://momentjs.com/)
* [Web Uploader](http://fex.baidu.com/webuploader/)

[Chains Development Team](http://qianchi.net/jsp/web/homepage)