/**
 * Example controller that utilises the NgResourceService
 * Uses 'controller as' syntax
 *
 * Docs:
 * https://docs.angularjs.org/api/ng/directive/ngController
 */

yoomeeControllers.controller('UsingServiceController',
  // Declare dependencies the controller will use
  ['NgResourceService',
  function (NgResourceService) {

    'use strict';

    // create the view model object
    var vm = this;

    // Get the results from the service and add to the view model
    function getResults () {
      NgResourceService.getResults().then(function (results) {
        vm.results = results;
      });
    }

    // Create a new result, would be triggered by user interaction
    vm.newResult = function () {
      // data for the new result, this would probably come from a form
      var id = 1;
      var text = 'words';

      var params = {
        id: id,
        text: text
      };

      NgResourceService.postData(params).then(function () {
        // could trigger a confirmation here
      });
    };

    // Delete a result, would be triggered by user interaction
    vm.deleteResult = function (id) {

      NgResourceService.deleteData(id).then(function () {
        // could trigger a confirmation here
      });

    };

    getResults();

}]);
