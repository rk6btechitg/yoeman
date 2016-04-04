'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('project1App'));

  var MainCtrl,
    scope,
    mainConstantObj;

  beforeEach(module(function ($provide) {
      $provide.constant('mainConstant', 'Welcome!' );
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, mainConstant) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      mainConstantObj : mainConstant
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MainCtrl.awesomeThings.length).toBe(3);
  });

  it('should contain constant', inject(function (mainConstant) {
    expect(mainConstant).toBe('Welcome!');
  }));
  
});
