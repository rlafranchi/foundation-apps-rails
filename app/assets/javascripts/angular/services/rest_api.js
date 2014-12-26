services.factory('restApi', function($http, inflector) {

  var apiBase = '/api/'

  var restApi = function(resources) {
    this.resources = resources;
    this.url = null;
    this[resources + 'Path'] = '/' + resources;
    this['new' + inflector.singularize(resources) + 'Path'] = '/' + resources + '/new';
    this[inflector.singularize(resources) + 'Path'] = function(id) {
      return '/' + resources + '/' + id;
    }
    this['edit' + inflector.singularize(resources) + 'Path'] = function(id) {
      return '/' + resources + '/' + id + '/edit';
    }
  }

  restApi.prototype.getIndex = function() {
    this.url = apiBase + this.resources
    var self = this;
    return $http.get(this.url)
      .then(
        function(response) {
          self.data = response.data;
          return response;
        },
        function(response) {
          self.data = response.data;
          return response;
        }
    );
  }

  restApi.prototype.getShow = function(id) {
    this.url = apiBase + this.resources + '/' + id;
    var self = this;
    return $http.get(this.url)
      .then(
        function(response) {
          self.data = response.data;
          return response;
        },
        function(response) {
          self.data = response.data;
          return response;
        }
    );
  }

  restApi.prototype.postCreate = function(params) {
    this.url = apiBase + this.resources;
    this.params = params;
    var self = this;
    return $http.post(this.url, this.params)
      .then(
        function(response) {
          self.data = response.data;
          return response;
        },
        function(response) {
          self.data = response.data;
          return response;
        }
    );
  }

  restApi.prototype.putUpdate = function(params) {
    this.url = apiBase + this.resources + '/' + params.id;
    this.params = params;
    var self = this;
    return $http.put(this.url, this.params)
      .then(
        function(response) {
          self.data = response.data;
          return response;
        },
        function(response) {
          self.data = response.data;
          return response;
        }
    );
  }

  restApi.prototype.deleteDestroy = function(params) {
    this.url = apiBase + this.resources + '/' + params.id;
    this.params = params;
    var self = this;
    return $http.delete(this.url)
      .then(
        function(response) {
          self.data = response.data;
          return response;
        },
        function(response) {
          self.data = response.data;
          return response;
        }
    );
  }

  function responseHandler(response, self) {

  }

  return restApi;
});
