describe('restApi', function () {
  var $httpBackend, $urlRouterProvider, restApi, resources, apiNew, responseData, response, params;


  beforeEach(module('application.services'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    restApi = $injector.get('restApi');
    resources = 'resources';
    apiNew = new restApi(resources);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('resources', function() {
    it('should set the resources', function() {
      expect(apiNew.resources).toEqual('resources');
    });
  });

  describe('getIndex', function() {
    beforeEach(function() {
      responseData = [
        { "id":1,"title":"Title","content":"some content","created_at":"2014-12-23T04:54:54.222Z","updated_at":"2014-12-23T04:54:54.222Z"},
        { "id":2,"title":"Defferent Title","content":"some more content","created_at":"2014-12-23T04:54:54.227Z","updated_at":"2014-12-23T04:54:54.227Z" }
      ];
      response = $httpBackend.expectGET('/api/resources').respond(responseData);
      var result = apiNew.getIndex();
      $httpBackend.flush();
    });
    it('should set the right url', function() {
      expect(apiNew.url).toEqual('/api/resources');
    });
    it('should return all resources', function() {
      expect(apiNew.data).toEqual(responseData);
    });
    it('should have the right length', function() {
      expect(apiNew.data.length).toEqual(2);
    });
    it('should set id for a post', function() {
      expect(apiNew.data[0].id).toEqual(1);
    });
  });

  describe('getShow', function() {
    beforeEach(function() {
      responseData = { "id":1,"title":"Title","content":"some content","created_at":"2014-12-23T04:54:54.222Z","updated_at":"2014-12-23T04:54:54.222Z" };
      response = $httpBackend.expectGET('/api/resources/1').respond(responseData);
      var result = apiNew.getShow(1);
      $httpBackend.flush();
    });
    it('should set the correct url', function() {
      expect(apiNew.url).toEqual('/api/resources/1');
    });
    it('should return the post', function() {
      expect(apiNew.data).toEqual(responseData);
    });
    it('should set content for a post', function() {
      expect(apiNew.data.content).toEqual("some content");
    });
  });

  describe('postCreate', function() {
    describe('successful response', function() {
      beforeEach(function() {
        params = {resource: {title: "Title", content: "some content"}}
        responseData = { "id":1,"title":"Title","content":"some content","created_at":"2014-12-23T04:54:54.222Z","updated_at":"2014-12-23T04:54:54.222Z" };
        response = $httpBackend.expectPOST('/api/resources', params).respond(responseData);
        var result = apiNew.postCreate(params);
        $httpBackend.flush();
      });
      it('should return the new post', function() {
        expect(apiNew.data).toEqual(responseData);
      });
      it('should set the params', function() {
        expect(apiNew.params).toEqual(params);
      });
    });
    describe('unsuccessful response', function() {
      beforeEach(function() {
        params = {resource: {title: "", content: "some content"}}
        responseData = { "errors": { "title": "can't be blank" } };
        response = $httpBackend.expectPOST('/api/resources', params).respond(responseData);
        var result = apiNew.postCreate(params);
        $httpBackend.flush();
      });
      it('should return errors', function() {
        expect(apiNew.data.errors.title).toEqual("can't be blank");
      });
      it('should set the params', function() {
        expect(apiNew.params).toEqual(params);
      });
    });
  });

  describe('putUpdate', function() {
    beforeEach(function() {
      params = {id: "1", resource: {title: "Title", content: "some other content"}}
      responseData = { "id":1,"title":"Title","content":"some other content","created_at":"2014-12-23T04:54:54.222Z","updated_at":"2014-12-23T04:54:54.222Z" };
        response = $httpBackend.expectPUT('/api/resources/1', params).respond(responseData);
      var result = apiNew.putUpdate(params);
      $httpBackend.flush();
    });
    it('should set params', function() {
      expect(apiNew.params).toEqual(params);
    });
    it('should return the resource', function() {
      expect(apiNew.data).toEqual(responseData);
    });
  });

  describe('deleteDestroy', function() {
    beforeEach(function() {
      params = { "id":1,"title":"Title","content":"some other content","created_at":"2014-12-23T04:54:54.222Z","updated_at":"2014-12-23T04:54:54.222Z" }
      responseData = {};
        response = $httpBackend.expectDELETE('/api/resources/1').respond(responseData);
      var result = apiNew.deleteDestroy(params);
      $httpBackend.flush();
    });
    it('should set params', function() {
      expect(apiNew.params).toEqual(params);
    });
  });

  describe('resourcesPath', function() {
    it('should return the right path', function() {
      var apiPlus = new restApi('posts');
      expect(apiPlus.postsPath).toEqual('/posts');
    });
  });

  describe('newresourcePath', function() {
    it('should return the right path', function() {
      var apiPlus = new restApi('posts');
      expect(apiPlus.newpostPath).toEqual('/posts/new');
    });
  });

  describe('resourcePath', function() {
    it('should return the right path', function() {
      var apiPlus = new restApi('posts');
      expect(apiPlus.postPath(1)).toEqual('/posts/1');
    });
  });

  describe('editresourcePath', function() {
    it('should return the right path', function() {
      var apiPlus = new restApi('posts');
      expect(apiPlus.editpostPath(1)).toEqual('/posts/1/edit');
    });
  });
});
