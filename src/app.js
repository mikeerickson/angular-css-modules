import angular from 'angular';
import '!style!css!./app.css';

console.log('Angular w/ CSS Modules');

const app = angular.module('app', [
  require('./hello').name
]);

export default app;
