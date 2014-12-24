var services = angular.module('application.services', []);

services.factory('restApi', function($http) {

  var apiBase = '/api/'

  var restApi = function(resources) {
    this.resources = resources;
    this.url = null;
  }

  restApi.prototype.getIndex = function() {
    this.url = apiBase + this.resources
    var self = this;
    $http.get(this.url)
      .then(function(response) {
        self.data = response.data;
        return response;
    });
  }
  restApi.prototype.getShow = function(id) {
    this.url = apiBase + this.resources + '/' + id;
    var self = this;
    $http.get(this.url)
      .then(function(response) {
        self.data = response.data;
        return response;
    });
  }
  restApi.prototype.postCreate = function(params) {
    this.url = apiBase + this.resources;
    this.params = params;
    var self = this;
    $http.post(this.url, this.params)
      .then(function(response) {
        self.data = response.data;
        return response;
    });
  }
  restApi.prototype.putUpdate = function(params) {
    this.url = apiBase + this.resources + '/' + params.id;
    this.params = params;
    var self = this;
    $http.put(this.url, this.params)
      .then(function(response) {
        self.data = response.data;
        return response;
    });
  }
  restApi.prototype.deleteDestroy = function(params) {
    this.url = apiBase + this.resources + '/' + params.id;
    this.params = params;
    var self = this;
    $http.delete(this.url)
      .then(function(response) {
        self.data = response.data;
        return response;
    });
  }
  return restApi;
});
