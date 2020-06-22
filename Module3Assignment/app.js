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
      templateUrl: "listItem.html",
      scope: {
        nothingMessage: "@nothingMessage",
        items: "<",
        onRemove: "&",
      },
      controller: ShoppingListDirectiveController,
      controllerAs: "list",
      bindToController: true,
    };

    return ddo;
  }
  function ShoppingListDirectiveController() {
    var list = this;
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.searchItem = "";
    menu.message = "";
    menu.foundList = "";

    menu.foundItems = function () {
      var checkLength = menu.searchItem.length;
      if (checkLength == "0") {
        menu.foundList = "";
        menu.message = "Nothing found";
      } else {
        var promise = MenuSearchService.getMatchedMenuItems(menu.searchItem);
        promise
          .then(function (response) {
            menu.foundList = response;
            if (menu.foundList.length == 0) menu.message = "Nothing found";
          })
          .catch(function (error) {
            console.log("Something went terribly wrong.");
          });
      }
    };

    menu.deleteMessage = function () {
      menu.message = " ";
      menu.foundList = "";
    };

    menu.removeItem = function (itemIndex) {
      console.log("Hi" + itemIndex);
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
      foundList = [];
      return $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json",
      })
        .then(function (response) {
          var menuLength = response.data.menu_items.length;
          var menuData = response.data.menu_items;

          for (var i = 0; i < menuLength; i++) {
            if (menuData[i].description.indexOf(searchItem) > -1) {
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
