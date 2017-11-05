// Karma configuration
// Generated on Thu Sep 28 2017 11:52:08 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jquery-3.2.1', 'requirejs', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // Make resources available on http://localhost:[PORT]/base/[PATH], eg:
      // http://localhost:9876/base/JSONav.safariextension/Extension.html
      { pattern: 'JSONav.safariextension/**/*.html', included: false },
      { pattern: 'JSONav.safariextension/**/*.css', included: false },
      { pattern: 'JSONav.safariextension/**/*.js', included: false },
      { pattern: 'tests/fixtures/**/*', included: false },
      { pattern: 'tests/jasmine/**/*.js', included: false },

      'tests/jasmine.js',
    ],


    // list of files to exclude
    exclude: [
      '**/*~',
      '**/*~.*',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'JSONav.safariextension/*.js': ['coverage'],
      'JSONav.safariextension/inject/*.js': ['coverage'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Safari'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,


    // Tools
    // =====

    client: {
      useIframe: false,
      runInParent: true,
      jasmine: {
        random: false,
        stopOnFailure: true,
      }
    },

    coverageReporter: {
      includeAllSources: false,
      dir: 'tests',
      reporters: [
        {type: 'text'},
        {type: 'text', subdir: '.', file: 'README'},
        {type: 'html', subdir: 'coverage'},
      ]
    },
  })
}
