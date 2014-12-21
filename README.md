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
