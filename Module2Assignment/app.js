(function () {
  "use strict";

  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var buyItems = this;

    buyItems.buyItemsList = ShoppingListCheckOffService.getItems();

    buyItems.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeItem(itemIndex);
      ShoppingListCheckOffService.getBoughtItems();
    };

    buyItems.lengthOfList = ShoppingListCheckOffService.getLength();
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtItems = this;
    boughtItems.boughtItemsList = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var buyItemsList = [
      {
        name: "Chocolates",
        quantity: "10",
      },
      {
        name: "Bread",
        quantity: "20",
      },
      {
        name: "Chips",
        quantity: "33",
      },
      {
        name: "Milk",
        quantity: "10",
      },
      {
        name: "Donuts",
        quantity: "15",
      },
    ];

    var boughtItemsList = [];

    service.getItems = function () {
      return buyItemsList;
    };

    service.removeItem = function (itemIndex) {
      var item = buyItemsList[itemIndex];
      boughtItemsList.push(item);
      buyItemsList.splice(itemIndex, 1);
    };
    service.getBoughtItems = function () {
      return boughtItemsList;
    };
    service.getLength = function () {
      return buyItemsList.length;
    };
  }
})();
