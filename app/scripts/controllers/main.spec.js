'use strict';

describe('Controller: MainCtrl', function() {

    var MainCtrl,
        scope,
        mainConstantObj,
        mockWindow,
        mockModalSvc,
        sampleSvcObj,
        forecast;

    beforeEach(module('project1App'));

    beforeEach(module(function($provide) {

        $provide.constant('mainConstant', 'Welcome!');

        $provide.service('$window', function() {
            this.alert = jasmine.createSpy('alert');
        });

        $provide.service('modalSvc', function() {
            this.showModalDialog = jasmine.createSpy('showModalDialog');
        });

    }));

    // $httpBackend will be a mock from angular-mocks.js
    beforeEach(inject(function($window, modalSvc, sampleSvc, _forecast_) {
        mockWindow = $window;
        mockModalSvc = modalSvc;
        sampleSvcObj = sampleSvc;
        forecast = _forecast_;
    }));

    // Initialize the controller and a mock scope`
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    
    it('should attach a list of awesomeThings to the scope', inject(function() {
        expect(MainCtrl.awesomeThings.length).toBe(3);
    }));

    it('should call myawesomeThings function, it should return true', inject(function() {
        expect(scope.myawesomeThings()).toBe(true);
    }));

    it('should contain constant', inject(function(mainConstant) {
        expect(mainConstant).toBe('Welcome!');
    }));

    it('should show alert when title is not passed into showDialog', inject(function() {

        var message = "Some message";
        sampleSvcObj.showDialog(message);

        expect(mockWindow.alert).toHaveBeenCalledWith(message);
        expect(mockModalSvc.showModalDialog).not.toHaveBeenCalled();
    }));

    it('should show modal when title is passed into showDialog', inject(function() {

        var message = "Some message";
        var title = "Some title";
        sampleSvcObj.showDialog(message, title);

        expect(mockModalSvc.showModalDialog).toHaveBeenCalledWith({
            message: message,
            title: title
        });

        expect(mockWindow.alert).not.toHaveBeenCalled();
    }));

    it('should get the forecast data', inject(function($httpBackend) {
        var returnData = {"city_name": "New York"};
        //testing forecast service with success response - status 200
        $httpBackend.when('GET', 'https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json').respond(200, returnData);
        var forecastData = forecast.currentData();
        var result;
        forecastData.then(function(response){
          result = response.data;
        });
        $httpBackend.flush();
        expect(result).toEqual(returnData);
    
        // make sure no expectations were missed in your tests.
        // (e.g. expectGET or expectPOST)
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));
    it('should get the forecast data', inject(function($httpBackend) {
        var returnData = {"city_name": "New York"};
        //testing forecast service with error response - status 500
        $httpBackend.when('GET', 'https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json').respond(500, '');
        var forecastData = forecast.currentData();
        var result;
        forecastData.then(function(response){
          result = response.data;
        });
        $httpBackend.flush();
        expect(result).toBeUndefined();
    
        // make sure no expectations were missed in your tests.
        // (e.g. expectGET or expectPOST)
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));
});
