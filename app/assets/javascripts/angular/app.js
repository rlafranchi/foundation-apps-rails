var application = angular.module('application');
var services = angular.module('application.services', ['platanus.inflector']);
var controllers = angular.module('application.controllers', ['application', 'application.services', 'platanus.inflector']);
var app = angular.module('app', ['application', 'application.services', 'application.controllers']);

app.config([ '$httpProvider', '$locationProvider', function($httpProvider, $locationProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    $locationProvider.html5Mode({ enabled: true, requireBase: true });
  }
]);

services.config([ '$httpProvider', '$locationProvider', function($httpProvider, $locationProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);
