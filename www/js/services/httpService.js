/**
 * Example service using $http to access an api.
 * Docs: https://docs.angularjs.org/api/ng/service/$http
 */

yoomeeServices.factory('HttpService',
  // Declare dependencies the service will use
  ['$http',
  function ($http) {

    'use strict';

    var egUrl = 'http://my-fake-api/data';

    var serviceData = {

      // Array to populate with the data from the api response.
      results:[],

      getResults: function (id) {

        // Create the request object
        var req = {
          method: 'GET',
          url: egUrl,
          params: {
            id: id
          }
        };

        // Make the request
        return $http(req).then(function(response) {

          // Then when the response has returned copy it to the local array
          if (response.data) {
            serviceData.results = angular.copy(response.data.results);
          }

          // Return the results
          return serviceData.results;
        });

      },

      postData: function (params) {

        // Create the request object
        var req = {
          method: 'POST',
          url: egUrl,
          params: {
            id: params.id,
            text: params.text
          }
        };

        // Make the request
        return $http(req).then(function(response) {

          // you may want to do something with the response here
          return response;
        });

      },

      deleteData: function (id) {

        // Create the request object
        var req = {
          method: 'DELETE',
          url: egUrl,
          params: {
            id: id
          }
        };

        // Make the request
        return $http(req).then(function(response) {

          // you may want to do something with the response here
          return response;
        });

      }

    };

    return serviceData;

}]);
