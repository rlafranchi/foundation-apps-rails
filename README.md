foundation-apps-rails
=====================

A Ruby on Rails starting app that integrates Foundation for Apps
http://foundation.zurb.com/apps

<h3>Requirements</h3>

* Node
* Bower

<h3>Install</h3>

* run the following commands to install bower components and node packages

<tt>bundle install</tt>
<tt>rake zfapp:install</tt>

* run Gulp from the root directory to build the necessary javascript files, partials, templates, and iconic images.  This will also watch for template changes.

<tt>gulp</tt>

<h3>Templates</h3>

* front matter templates can be created in the directory <tt>app/views/templates</tt>

```html
<!-- app/views/templates/example.html -->
---
name: Example
url: /example
---

<h1>Example</h1>
```

<h3>Angular</h3>

* create angular assets under the directory <tt>app/assets/javascripts/angular/</tt>

```javascript
// app/assets/javascripts/angular/controllers/example_controller.js
app.controller('ExampleController', ['$scope', function($scope) {
  $scope.hola = 'Hola';
}]);
```

<h3>Testing</h3>

* Karma is used for testing and can be run with the following command (The rails server must be running at localhost:3000):
`rake karma:run` (single run)
or
`rake karma:start`

* Test files can be created in the directory `spec/javascripts/angular/`.

```javascript
// spec/javascripts/angular/controllers/example_controller_spec.js
describe('ExampleController', function(){
  var $scope;

  beforeEach(module('application'));

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('ExampleController', {$scope: $scope});
  }));

  it('should say Hola', function() {
    expect($scope.hola).toBe('Hola');
  });
});
```

<h3>Integrating with Rails</h3>

* here's a working demo: https://young-fortress-5170.herokuapp.com/posts

* checkout the posts branch to see an example of how to fetch data from the rails backend
`git checkout posts`
* Here's an example of how to expose json data

```ruby
# posts_controller.rb

class PostsController < ApplicationController
  respond_to :json
  def index
    respond_with Post.all
  end
  
  # ...
  
end
```
* api routes are under the api scope

```ruby
scope :api, defaults: {format: :json} do
  resources :posts, except: [:new, :edit]
end

#     posts GET    /api/posts(.:format)          posts#index {:format=>:json}
#           POST   /api/posts(.:format)          posts#create {:format=>:json}
#      post GET    /api/posts/:id(.:format)      posts#show {:format=>:json}
#           PATCH  /api/posts/:id(.:format)      posts#update {:format=>:json}
#           PUT    /api/posts/:id(.:format)      posts#update {:format=>:json}
#           DELETE /api/posts/:id(.:format)      posts#destroy {:format=>:json}
```

* an angular REST api service has been created to easily implement requests in a similar manner to rails development and allows for the following methods: `getIndex()` `getShow(id)` `postCreate(params)` `putUpdate(params)` `deleteDestroy(params)`

```javascript
// app/assets/controllers/posts_controller.js
controllers.controller('Postscontroller', ['$scope', 'restApi', function($scope, restApi) {
  $scope.api = new restApi('posts');
  
  $scope.api.getIndex().then(function() {
    $scope.posts = $scope.api.data; // returns all posts
  });
}]);
```

```html
<!-- app/views/templates/posts.html -->
---
name: posts
url: /posts
controller: PostsController
---
<div ng-repeat="post in posts">
  <h1>{{post.title}}</h1>
  <p>{{post.content}}</p>
</div>
```