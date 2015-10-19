/**
 * Example service using ngResource to access a REST api.
 * Docs: https://docs.angularjs.org/api/ngResource/service/$resource
 */

yoomeeServices.factory('NgResourceService',
  // Declare dependencies the service will use
  ['$resource',

  function ($resource) {

    'use strict';

    var egUrl = 'http://my-fake-api/data';

    // Create the resource object
    var egResource =  $resource(egUrl, {}, {
      get: {
        method: 'GET',
        isArray: false
      },
      save: {
        method: 'POST',
        isArray: false,
        params: {'id': '@id', 'text': '@text'}
      },
      delete: {
        method: 'DELETE',
        isArray: false,
        params: {'id': '@id'}
      },
    });

    var serviceData = {

      // Array to populate with the data from the api response.
      results:[],

      getResults: function (id) {

        // Make the GET request
        return egResource.get({id: id}).$promise.then(function(response) {

          // Then when the response has returned copy it to the local array
          serviceData.results = angular.copy(response.results);

          // Return the results
          return serviceData.results;
        });
      },

      postData: function (params) {

        // Make the POST request
        return egResource.save(params).$promise.then(function(response) {

          // you may want to do something with the response here
          return response;
        });
      },

      deleteData: function (id) {

        // Make the DELETE request
        return egResource.delete({id: id}).$promise.then(function(response) {

          // you may want to do something with the response here
          return response;
        });
      }

    };

    return serviceData;

}]);
