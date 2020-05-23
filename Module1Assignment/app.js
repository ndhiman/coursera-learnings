(function () {
  "use strict";

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];
  function LunchCheckController($scope) {
    $scope.dishes = "";
    $scope.numberOfDishes = "";
    $scope.message = "";

    $scope.displayMessage = function () {
      $scope.message = calculateMessage();
    };

    $scope.deleteMessage = function () {
      $scope.message = "";
    };

    // Logic for displaying what message to display
    function calculateMessage() {
      var length = calculateDishes($scope.dishes);
      $scope.numberOfDishes = length;
      var message = "";
      if (length == "0") {
        message = "Please enter data first";
      } else if (length > 0 && length <= 3) message = "Enjoy!";
      else message = "Too much!";
      return message;
    }

    /* Calculated number of dishes by checking how many times comma appread after a char value. And to 
      calculate the last dish have appended the comma manually.

      charValue: To check that value appread before comma was char or not 
      numberofDishes: number of dishes 
  */
    function calculateDishes(dishes) {
      dishes = dishes + ","; //Appending comma(,) at the end of list
      var numberOfDishes = 0;
      let charValue = false;

      for (let i = 0; i < dishes.length; i++) {
        if (dishes.charAt(i) == ",") {
          if (charValue == true) numberOfDishes++;
          charValue = false;
        } else {
          if (dishes.charAt(i) != " ") charValue = true;
        }
      }
      return numberOfDishes;
    }
  }
})();
