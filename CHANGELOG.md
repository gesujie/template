
## Changelog (v0.1.15)

  * Added simple table styles
  * Added freeze table style and JS. If you don't wanna use EasyUI Datagrid, you can use freeze table.
  * Improved button style. 

## Changelog (v0.1.14)

  * Fixed layout [issue](https://bitbucket.org/coskuntekin/easy-admin/issues/51/easyui-layout-has-grid-issues)
  * Fixed responsive [issue](https://bitbucket.org/coskuntekin/easy-admin/issues/52/1920x1080-resolution-layout-problems)
  * Updated `theme-material`
  * Added theme settings
  * Added tree grid source code
  * Added go back button

## Changelog (v0.1.13.5)

  * Fixed dialog's stack when a tab closed
  * Fixed tree grid title line
  * Created editable tree gird with toolbar buttons

## Changelog (v0.1.13)

  * Added switch button
  * Created user settings dialog with switch button
  * Fixed datagrid layout gap between panel
  * Added text colors classes
  * Fixed Tab's inline css
  * Created under constructor page

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
