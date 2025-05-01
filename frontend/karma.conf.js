module.exports = function (config) {
    config.set({
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage')
      ],
      reporters: ['progress', 'coverage'],
      browsers: ['Chrome'],
      singleRun: false, // Setze auf 'true' für einmaligen Testlauf
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage'),
        subdir: '.',
        reporters: [
          { type: 'html' },
          { type: 'text-summary' }
        ]
      }
    });
  };
  