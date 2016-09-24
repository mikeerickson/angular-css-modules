const path = require('path');
const hasCoverage = global.process.argv.reduce((result, arg) => {
  return arg.indexOf('coverage') !== -1 || result;
});

const include = [
  path.resolve('./src')
];

const preLoaders = hasCoverage ? [

  // Process test code with Babel
  {
    test: /\.spec\.js$/,
    loader: 'babel',
    include: include
  },

  // Process all non-test code with Isparta
  {
    test: /\.js$/,
    loader: 'isparta',
    include: include,
    exclude: /\.spec\.js$/
  }
] : [{
  test: /\.js$/,
  loader: 'babel',
  include: include
}];

const loaders = [{
  test: /\.css$/,
  loader: 'null'
}, {
  test: /\.html$/,
  loader: 'ng-cache?prefix=[dir]/[dir]'
}];

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'spec.js'
    ],
    webpack: {
      devtool: 'eval',
      module: {
        loaders: loaders,
        preLoaders: preLoaders
      },
      cache: true
    },
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true
      }
    },
    preprocessors: {
      'spec.js': ['webpack']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      subdir: '.',
      reporters: [{
        type: 'cobertura',
        file: 'cobertura.xml'
      }, {
        type: 'text',
        file: 'text.txt'
      }, {
        type: 'text-summary',
        file: 'text-summary.txt'
      }, {
        type: 'html'
      }]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
