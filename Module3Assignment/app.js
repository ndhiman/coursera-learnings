(function () {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com")
    .directive("foundItems", FoundItems);

  function FoundItems() {
    var ddo = {
      restrict: "E",
      templateUrl: "listItem.html",
      scope: {
        onEmpty: "<",
        foundItems: "<",
        onRemove: "&",
      },
      controller: NarrowItDownController,
      controllerAs: "list",
      bindToController: true,
    };

    return ddo;
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.searchItem = "";

    menu.foundItems = function () {
      var promise = MenuSearchService.getMatchedMenuItems(menu.searchItem);
      promise
        .then(function (response) {
          if (response && response.length > 0) {
            menu.message = "";
            menu.foundList = response;
          } else {
            menu.message = "Nothing found";
            menu.foundList = [];
          }
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });
    };

    menu.deleteMessage = function () {
      menu.message = " ";
      console.log(menu.message.length);
      menu.foundList = [];
    };

    menu.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };
  }

  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var foundList = [];

    service.removeItem = function (index) {
      foundList.splice(index, 1);
    };

    service.getMatchedMenuItems = function (searchItem) {
      return $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json",
      })
        .then(function (response) {
          var foundList = [];
          var menuLength = response.data.menu_items.length;
          // console.log(menuLength);
          var menuData = response.data.menu_items;

          for (var i = 0; i < menuLength; i++) {
            if (
              menuData[i].description.indexOf(searchItem) > -1 &&
              searchItem.length > 0
            ) {
              foundList.push(menuData[i]);
            }
          }

          return foundList;
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });
    };
  }
})();
