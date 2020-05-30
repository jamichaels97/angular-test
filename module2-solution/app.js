(function fn(){
  'use strict';

  angular.module('ShoppingListWithPurchaseStatus', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getDesiredItems();

    toBuy.message = function(){
      return toBuy.items.length > 0 ? "" : "Everything is bought!";
    }

    toBuy.addItem = function(name, quantity){
      ShoppingListCheckOffService.addDesiredItem(name, quantity);
    }

    toBuy.removeItem = function(itemIndex){
      ShoppingListCheckOffService.removeDesiredItem(itemIndex);
    }

    toBuy.purchaseItem = function(itemIndex){
      ShoppingListCheckOffService.PurchaseItem(itemIndex);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this;

    bought.items = ShoppingListCheckOffService.getPurchasedItems();
    bought.message = function(){ return bought.items.length > 0 ? "" : "Nothing bought yet"; }
  }

  // adds an 's' if appropriate.
  function simplePluralizeNoun(noun, count){
    if(count === 1){
      return noun;
    }
    else{
      return noun + "s";
    }
  }

  function createItem(purchaseDescription, itemName, itemQuantity){
    var item = {
      name: itemName,
      quantity: itemQuantity,
      displayText: purchaseDescription + " " + itemQuantity + " " + simplePluralizeNoun(itemName, itemQuantity)
    };

    return item;
  }

  function preLoadItemsToBuy(desiredItems){
    var purchaseStatus = "Buy";
    desiredItems.push(createItem(purchaseStatus, "Banana", 10));
    desiredItems.push(createItem(purchaseStatus, "Orange", 13));
    desiredItems.push(createItem(purchaseStatus, "Watermelon", 1));
    desiredItems.push(createItem(purchaseStatus, "Grape", 30));
    desiredItems.push(createItem(purchaseStatus, "Tangerine", 11));
    desiredItems.push(createItem(purchaseStatus, "Bowl", 6));
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var desiredItems = [];
    preLoadItemsToBuy(desiredItems);
    service.getDesiredItems = function(){
      return desiredItems;
    }

    var purchasedItems = [];
    service.getPurchasedItems = function(){
      return purchasedItems;
    }

    service.addDesiredItem = function(itemName, itemQuantity){
      var item = {
        name: itemName,
        quantity: itemQuantity
      };
      desiredItems.push(item);
    }

    service.removeDesiredItem = function(desiredItemIndex){
      desiredItems.splice(desiredItemIndex, 1);
    }

    service.PurchaseItem = function(desiredItemIndex){
      var purchasedItem = desiredItems[desiredItemIndex];

      purchasedItems.push(createItem("Bought", purchasedItem.name, purchasedItem.quantity));

      service.removeDesiredItem(desiredItemIndex);
    }
  }

})();
