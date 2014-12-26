app.controller('PostsController', ['$rootScope', '$scope', 'restApi', '$state', 'FoundationApi', '$filter', function($rootScope, $scope, restApi, $state, foundationApi, $filter) {
  $scope.api = new restApi('posts');
  $scope.params = $state.params;

  var filterPosts = function() {
    $scope.filteredPosts = $scope.posts;
    if ( $scope.params.id ) {
      $scope.filteredPosts = $filter('filter')($scope.posts, {id: $scope.params.id});
      $scope.post = $scope.filteredPosts[0];
    }
  }

  $scope.api.getIndex().then(function() {
    $scope.posts = $scope.api.data;
    filterPosts();
  });

  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams) {
      $scope.params = toParams;
      filterPosts();
  });

  $scope.new = function() {
    $scope.post = {title: "", content: ""};
    foundationApi.publish('new-posts', 'open');
  }

  $scope.edit = function(id) {
    $scope.post = $filter('filter')($scope.posts, {id: id})[0];
    foundationApi.publish('edit-posts', 'open');
  }

  $scope.update = function() {
    $scope.api.putUpdate({
      id: $scope.post.id,
      post: {
        title: $scope.post.title,
        content: $scope.post.content
      }
    }).then(function() {
      $scope.data = $scope.api.data;
      if ( $scope.data.errors ) {
        handleErrors($scope.data.errors);
      } else {
        filterPosts();
        foundationApi.publish('main-notifications', {title: "Post Updated", color: "success", position: "top left"});
        foundationApi.publish('edit-posts', 'close');
      }
    });
  }

  $scope.create = function() {
    $scope.api.postCreate({
      post: {
        title: $scope.post.title || '',
        content: $scope.post.content || ''
      }
    }).then(function() {
      $scope.data = $scope.api.data;
      if ( $scope.data.errors ) {
        handleErrors($scope.data.errors);
      } else {
        $scope.post = $scope.api.data;
        $scope.posts.push($scope.post);
        filterPosts();
        $state.go('posts');
        foundationApi.publish('main-notifications', {title: "Post Created", color: "success", position: "top left"});
        foundationApi.publish('new-posts', 'close');
      }
    });
  }

  $scope.destroy = function(post) {
    $scope.post = post;
    foundationApi.publish('delete-posts', 'open');
  }

  $scope.destroyConfirm = function(post) {
    $scope.api.deleteDestroy({id: post.id}).then(function() {
      $scope.data = $scope.api.data;
      if ( $scope.data.errors ) {
        handleErrors($scope.data.errors);
      } else {
        var index = $scope.posts.indexOf(post)
        $scope.posts.splice(index, 1);
        filterPosts();
        $state.go('posts');
        foundationApi.publish('main-notifications', {title: "Post Deleted", color: "warning", position: "top left"});
      }
    });
  }

  var handleErrors = function(errors) {
    var content = '';
    for (var key in errors) {
      for (var error in errors[key]) {
        if ( error > 0 || key > 0 ) {
          content += ", ";
        }
        content += key.toUpperCase()[0] + key.slice(1) + ' ' + errors[key][error];
      }
    }
    foundationApi.publish('main-notifications', {title: "Error", content: content, color: "alert", position: "top left"});
  }

}]);
