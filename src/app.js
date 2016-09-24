import angular from 'angular';

console.log('Angular w/ CSS Modules');

const app = angular.module('app', [
  require('./hello').name
]);

export default app;
