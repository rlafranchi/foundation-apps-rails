(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    });

    //$locationProvider.hashPrefix('!');
  }


  function run() {
    FastClick.attach(document.body);
  }

})();

var application = angular.module('application');
var services = angular.module('application.services', ['platanus.inflector']);
var controllers = angular.module('application.controllers', ['application', 'application.services', 'platanus.inflector']);
var app = angular.module('app', ['application', 'application.services', 'application.controllers']);

app.config([ '$httpProvider', '$locationProvider', function($httpProvider, $locationProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);

services.config([ '$httpProvider', '$locationProvider', function($httpProvider, $locationProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);
