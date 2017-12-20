'use strict';

Vue.component('order-item-to-prepare',{
  props: ['uiLabels', 'order', 'orderId', 'lang'],
  template: '<div>\
          <order-item\
            :ui-labels="uiLabels"\
            :lang="lang"\
            :order-id="orderId"\
            :order="order">\
          </order-item>\
         </div>',
  methods: {
    orderDone: function () {
      this.$emit('done');
    },
    cancelOrder: function () {

    }
  }
});

Vue.component('order-list',{
  props: ['uiLabels', 'order', 'orderId', 'lang', 'type'],
  template: '<div v-bind:class="order.type" v-on:click ="setActive()">\
          <order-item-short\
            :ui-labels="uiLabels"\
            :lang="lang"\
            :order-id="orderId"\
            :order="order">\
          </order-item-short>\
         </div>',
         data: function(){
           return {
             active: false
           }
         },
         methods:{
           setActive: function(){
             vm.displayChosenDrink(this.order, this.orderId);
             this.active = !this.active;
             this.$emit('activate-order');
           }
        }
});

var vm = new Vue({
  el: '#mainDiv',
  mixins: [sharedVueStuff], // include stuff that is used both in the ordering system and in the kitchen
  data: {
    activeOrder: "no order chosen",
  },
  methods: {
    markDone: function (orderid) {
      socket.emit("orderDone", orderid);
    },

    displayChosenDrink: function(order, orderId) {

      var ingredientList =[]
      var ingred = []
      for (var i = 0; i < order.ingredients.length; i++){
        ingredientList.push(order.ingredients[i].ingredient_en)
      }
        //document.getElementById('orderInfoHead').innerHTML = "#" + orderId +"<br>" + order.type.toUpperCase()
        //document.getElementById('orderInfo').innerHTML = ingredientList.join('<br>')
      },
      searchForOrder: function(){
        console.log(orderNumSearch);
      }
    }
  });


function updateClock(){
var now = new Date(),
    hours = now.getHours(),
    minutes = now.getMinutes(),
    seconds = now.getSeconds();
    if (minutes < 10) {
        minutes = "0" + minutes
    };
document.getElementById('clock').innerHTML = [hours,minutes,seconds].join(':');
setTimeout(updateClock,1000);
}
 updateClock();

 // Get the modal
 var modal = document.getElementById('myModal');

 // Get the button that opens the modal
 var btn = document.getElementById("searchButton");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks the button, open the modal
 btn.onclick = function() {
     modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
     modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }

var orderNumSearch = '';
 var numLetterList = [];

 function numberPressed(letterButton){
     var letterButton = letterButton.value;
     numLetterList.push(letterButton);
     orderNumSearch = '';
     for (var i =0; i < numLetterList.length; i++){
       orderNumSearch = Number(orderNumSearch + numLetterList[i]);
     };
     document.getElementById("changeSaldoConsoleChild").innerHTML = numLetterList.join("");
 }

 function backSpaceLetter(){
     numLetterList.pop();
     document.getElementById("changeSaldoConsoleChild").innerHTML = numLetterList.join("");
 }

 function clearSaldoField(){
     numLetterList = [];
     document.getElementById("changeSaldoConsoleChild").innerHTML = numLetterList.join("");
 }
