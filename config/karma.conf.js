const TEST_PROFILE = process.env.TEST_PROFILE || 'default';

function profileVars(profile) {
  let singleRun;
  let browsers = [];

  switch (profile) {
    case 'dev':
      singleRun = false;
      browsers = ['Chrome'];
      break;

    default:
      singleRun = true;
      browsers = ['PhantomJS'];
  }

  return {
    singleRun,
    browsers,
  };
}

module.exports = function(config) {
  const { singleRun, browsers } = profileVars(TEST_PROFILE);
  config.set({
    basePath: '../',
    files: [
      'test/**/*.test.js',
    ],
    exclude: [],

    frameworks: ['mocha', 'babel-polyfill'],
    preprocessors: {
      'test/**/*.test.js': ['webpack'],
    },
    webpack: require('./webpack.config.test'),
    reporters: ['mocha'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    autoWatch: !singleRun,
    singleRun: singleRun,

    browsers: browsers,
    concurrency: Infinity,
  });
};
