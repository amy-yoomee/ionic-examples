/**
 * Mocks the NgResourceService methods used in the controller
 * Docs:
 * https://docs.angularjs.org/guide/unit-testing
 * https://docs.angularjs.org/api/ng/service/$q
 */
describe('UsingServiceController', function () {

  'use strict';

  var scope, mockNgResourceService;

  //dummy results to return from the mocked NgResourceService
  var results = [
    {
      id: 1
    }
  ];

  /*
   * Set up before each test
   */
  beforeEach(function() {
    // include modules used by the controller
    module('ui.router');
    module('yoomee.controllers');

    // mock the NgResource service
    // create as an empty object which we can then add methods to and specify what they return
    mockNgResourceService = {};
    module('yoomee.services', function($provide) {
      $provide.value('NgResourceService', mockNgResourceService);
    });

    // inject the controller
    inject(function($controller, $rootScope, $q) {
      scope = $rootScope.$new();

      // mock the NgResourceService methods used in the controller
      // return a resolved promise, optionally with data - use $q for promises
      mockNgResourceService.getResults = function() {
        var defer = $q.defer();
        // resolve with data
        defer.resolve(results);
        return defer.promise;
      };

      mockNgResourceService.postData = function() {
        var defer = $q.defer();
        // resolve without data
        defer.resolve();
        return defer.promise;
      };

      mockNgResourceService.deleteData = function() {
        var defer = $q.defer();
        // resolve without data
        defer.resolve();
        return defer.promise;
      };

      // spy on the mocked methods
      spyOn(mockNgResourceService, 'getResults').and.callThrough();
      spyOn(mockNgResourceService, 'postData').and.callThrough();
      spyOn(mockNgResourceService, 'deleteData').and.callThrough();

      $controller('UsingServiceController as vm', {
        $scope: scope
      });

      scope.$digest();
    });

  });

  describe('get the results', function () {

    it('should call the NgResourceService getResults method', function () {
      expect(mockNgResourceService.getResults).toHaveBeenCalled();
    });

    it('should add the response from the NgResourceService getResults method to the view model', function () {
      expect(scope.vm.results).toEqual(results);
    });

  });

  describe('create a new result', function () {

    it('should call the NgResourceService postData method', function () {

      // call the new result method
      scope.vm.newResult();

      expect(mockNgResourceService.postData).toHaveBeenCalled();
    });

  });

  describe('delete a result', function () {

    it('should call the NgResourceService deleteData method', function () {

      // call the delete result method
      scope.vm.deleteResult();

      expect(mockNgResourceService.deleteData).toHaveBeenCalled();
    });

  });

});
