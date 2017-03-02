CONFIG = {

  safari: {
    desc: 'Safari Extension',
    base_dir: 'JSONav.safariextension',
    vendor_dir: 'vendor',
    settings: 'Settings.plist',
  },

  highlight: {
    desc: 'HighlightJS',
    base_dir: 'vendor/highlight.js',
    languages: [:json, :javascript],
    provides: [
      'build/highlight.pack.js',
      'build/demo/styles',
    ],
  },

  linkify: {
    desc: 'LinkifyJS',
    base_dir: 'vendor/linkify.js',
    provides: [
      'dist/linkify.min.js',
      'dist/linkify-element.min.js',
    ],
  },
}

task default: [:build]
Dir.glob('tasks/*.rake').each { |t| load t }
