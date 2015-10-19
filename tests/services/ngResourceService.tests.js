/**
 * Uses Angular mocks and httpBackend to mock responses from the api endpoints that are used in the service.
 *
 * Docs:
 * https://docs.angularjs.org/guide/unit-testing
 * https://github.com/angular/bower-angular-mocks
 * https://docs.angularjs.org/api/ngMock/service/$httpBackend
 *
 * Tip:
 * Use fdescribe or fonly to run a group or single test
 */

describe('NgResourceService', function () {

  'use strict';

  var httpBackend, NgResourceService;
  var egUrl = 'http://my-fake-api/data';
  var egGetUrlWithParams = egUrl + '?id=1';
  var egPostUrl = egUrl + '?id=1&text=words';
  var egDelUrl =  egUrl + '?id=1';

  // setup some dummy data to be returned from the mock api call
  var returnData = {
    status: 200,
    results: [
      {
        id: 1
      }
    ]
  };

  /*
   * Set up before each test
   */
  beforeEach(function () {

    //include modules used by the service
    module('ui.router');
    module('ngResource');
    module('yoomee.services');

    // inject the service and httpBackend
    inject(function(_NgResourceService_, _$httpBackend_) {
      NgResourceService = _NgResourceService_;
      httpBackend = _$httpBackend_;
    });

  });

  /*
   * Clean up after each test
   */
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  /*
   * getResults method tests
   */
  describe('getResults method', function () {

    it('should call the api when use the getResults method', function () {

      // Call the getResults method
      NgResourceService.getResults();

      // Expect the api call to have been made
      httpBackend.expectGET(egUrl).respond();

      // Flush pending requests - needed in all tests that use mocked requests
      httpBackend.flush();

    });

    it('should call the api with parameters', function () {

      // Call the getResults method
      NgResourceService.getResults(1);

      // Expect the api call to have been made
      httpBackend.expectGET(egGetUrlWithParams).respond();

      // Flush pending requests - needed in all tests that use mocked requests
      httpBackend.flush();

    });

    it('should add the response to the local model', function () {

      // mock the data returned from the api call
      httpBackend.whenGET(egUrl).respond(returnData);

      // Call the getResults method
      NgResourceService.getResults().then(function () {

        // wait for the ngResource promise to be resolved before testing the expectation
        expect(NgResourceService.results).toEqual(returnData.results);

      });

      // Flush pending requests - needed in all tests that use mocked requests
      httpBackend.flush();

    });

  });

  describe('postData method', function () {

    it('should post to the api when use the postData method', function () {

      //Call the postData method
      NgResourceService.postData({id: 1, text: 'words'});

      // Expect the api call to have been made
      httpBackend.expectPOST(egPostUrl).respond();

      // Flush pending requests - needed in all tests that use mocked requests
      httpBackend.flush();

    });

  });

  describe('deleteData method', function () {

    it('should call the api when use the deleteData method', function () {

      //Call the deleteData method
      NgResourceService.deleteData(1);

      // Expect the api call to have been made
      httpBackend.expectDELETE(egDelUrl).respond();

      // Flush pending requests - needed in all tests that use mocked requests
      httpBackend.flush();

    });

  });

});
