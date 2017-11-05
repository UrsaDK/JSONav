const TEST_REGEXP = /^\/base\/tests\/jasmine\/.*\.js$/i
const allTestFiles = [];

Object.keys(window.__karma__.files).forEach((file) => {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    const normalizedFile = file.replace(/\.js$/g, '');
    allTestFiles.push(normalizedFile);
  }
});

require.config({
  // Karma serves files under /base (see karma.config.js)
  baseUrl: '/base/JSONav.safariextension',

  // path translations, which allow us to refer to different library
  // dependencies, without using relative paths
  paths: {
    'Extension': 'Extension',
    'JSONav': 'inject/JSONav',

    'highlight': 'vendor/highlight.js/highlight.pack',
    'linkify': 'vendor/linkify.js/linkify.min',
    'linkify-element': 'vendor/linkify.js/linkify-element.min',
  },

  // dynamically load all files in /test/jasmine
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
