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
