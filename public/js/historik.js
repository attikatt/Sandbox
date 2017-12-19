'use strict';

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
             console.log('set order to active')
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
        document.getElementById('orderInfoHead').innerHTML = "#" + orderId +"<br>" + order.type.toUpperCase()
        document.getElementById('orderInfo').innerHTML = ingredientList.join('<br>')
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
