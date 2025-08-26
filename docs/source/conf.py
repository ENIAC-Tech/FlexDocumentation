# Configuration file for the Sphinx documentation builder.

# -- Project information

project = 'FlexDocumentation'
copyright = '2025, ENIAC'
author = 'ENIAC'

release = '0.1'
version = '0.1.0'

# -- General configuration

extensions = [
    'sphinx.ext.duration',
    'sphinx.ext.doctest',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx.ext.intersphinx',
    'myst_parser',
]

# Markdown configuration
source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

myst_enable_extensions = [
    'colon_fence',
    'deflist',
]

# Multi-language support
language = 'en'                 # Source language (default: English)
locale_dirs = ['locales/']      # Root directory for .po/.mo files
gettext_compact = False         # Generate po files per source file

intersphinx_mapping = {
    'python': ('https://docs.python.org/3/', None),
    'sphinx': ('https://www.sphinx-doc.org/en/master/', None),
}
intersphinx_disabled_domains = ['std']

templates_path = ['_templates']

# -- Options for HTML output

html_theme = 'sphinx_rtd_theme'

# -- Options for EPUB output
epub_show_urls = 'footnote'

# Add custom static resource paths and styles
html_static_path = ['_static']
html_css_files = [
    'css/custom.css',
]
