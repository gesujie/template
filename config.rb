###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false


# Iframe Layouts
page 'pages/dashboard.html', layout: :iframe_layout
page 'pages/datagrid.html', layout: :iframe_layout
page 'pages/datagrid-form.html', layout: :iframe_layout
page 'pages/tabs.html', layout: :iframe_layout
page 'pages/tree.html', layout: :iframe_layout
page 'pages/schedule.html', layout: :iframe_layout
page 'pages/uploader.html', layout: :iframe_layout
page 'pages/window.html', layout: :iframe_layout
page 'pages/panel.html', layout: :iframe_layout
page 'pages/grid.html', layout: :iframe_layout
page 'pages/form.html', layout: :iframe_layout
page 'pages/accordion.html', layout: :iframe_layout
page 'pages/numberspinner.html', layout: :iframe_layout
page 'pages/layout.html', layout: :iframe_layout
page 'pages/label-button.html', layout: :iframe_layout
page 'pages/colors.html', layout: :iframe_layout

# Pages Layouts
page 'pages/login.html', layout: :pages_layout
page 'pages/error.html', layout: :pages_layout
page 'pages/sign-up.html', layout: :pages_layout
page 'pages/forgotpwd.html', layout: :pages_layout

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

