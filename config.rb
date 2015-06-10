###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

page 'pages/dashboard.html', layout: :resource
page 'pages/datagrid.html', layout: :resource
page 'pages/datagrid-form.html', layout: :resource
page 'pages/tabs.html', layout: :resource
page 'pages/login.html', layout: :resource
page 'pages/register.html', layout: :resource
page 'pages/tree.html', layout: :resource
page 'pages/treegrid.html', layout: :resource
page 'pages/schedule.html', layout: :resource
page 'pages/uploader.html', layout: :resource
page 'pages/window.html', layout: :resource
page 'pages/panel.html', layout: :resource
page 'pages/grid.html', layout: :resource
page 'pages/form.html', layout: :resource
page 'pages/accordion.html', layout: :resource
page 'pages/numberspinner.html', layout: :resource
page 'pages/layout.html', layout: :resource
page 'pages/label.html', layout: :resource

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
# which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

# Server Environment
configure :server do

  # Debug assets
  set :debug_assets, true

end

# Development Environment
configure :development do

  # Automatic image dimensions on image_tag helpers
  activate :automatic_image_sizes

  # Reload the browser automatically whenever files change
  activate :livereload

  # Assets Pipeline Sets
  set :haml, {ugly: false, format: :html5}
  set :css_dir, 'assets/stylesheets'
  set :js_dir, 'assets/javascripts'
  set :images_dir, 'assets/images'
  set :fonts_dir, 'assets/fonts'

  # Pretty URLs
  # activate :directory_indexes

end

# Build Environment
configure :build do

  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # GZIP text files
  # activate :gzip

end

# Production Environment
configure :production do

  # Assets Pipeline Sets
  set :css_dir, 'assets/stylesheets'
  set :js_dir, 'assets/javascripts'
  set :images_dir, 'assets/images'
  set :fonts_dir, 'assets/fonts'

  # Middleman Production dev server run code
  # middleman server -e production

end

