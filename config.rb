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
page 'pages/datagrid_horizontal_form.html', layout: :iframe_layout
page 'pages/datagrid_vertical_form.html', layout: :iframe_layout
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
page 'pages/label_button.html', layout: :iframe_layout
page 'pages/colors.html', layout: :iframe_layout
page 'pages/under_construction.html', layout: :iframe_layout
page 'pages/table.html', layout: :iframe_layout

# Pages Layouts
page 'pages/login.html', layout: :pages_layout
page 'pages/error.html', layout: :pages_layout
page 'pages/sign_up.html', layout: :pages_layout
page 'pages/forgotpwd.html', layout: :pages_layout

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Automatic image dimensions on image_tag helper

# Reload the browser automatically whenever files change
configure :development do

  activate :livereload

  activate :automatic_image_sizes

  activate :syntax
  set :markdown_engine, :redcarpet
  set :markdown, :fenced_code_blocks => true, :smartypants => true

  set :css_dir, 'assets/stylesheets'
  set :js_dir, 'assets/javascripts'
  set :images_dir, 'assets/images'
  set :fonts_dir, 'assets/fonts'

end

# Build-specific configuration
configure :build do

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  activate :cache_buster

  activate :syntax
  set :markdown_engine, :redcarpet
  set :markdown, :fenced_code_blocks => true, :smartypants => true

  # Use relative URLs
  activate :relative_assets

  set :css_dir, 'assets/stylesheets'
  set :js_dir, 'assets/javascripts'
  set :images_dir, 'assets/images'
  set :fonts_dir, 'assets/fonts'

  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher

  # Or use a different image path
  #set :http_path, "/images/"

end