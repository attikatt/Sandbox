/*jslint es5:true, indent: 2 */
/*global sharedVueStuff, Vue, socket */
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
             this.active = !this.active;
             if (this.order.type === "juice"){
               this.$emit('active-order-juice');
             }
             if (this.order.type === "smoothie"){
               this.$emit('active-order-smoothie');
             }
           }
        }
});

var vm = new Vue({
  el: '#mainDiv',
  mixins: [sharedVueStuff], // include stuff that is used both in the ordering system and in the kitchen
  data: {
    activeOrder: {juice: "no Juice chosen", smoothie:"no Smoothie chosen"},
    activeOrderStage: {juice: "not-started", smoothie: "not-started" }
  },
  methods: {
    getActiveOrderStage: function(order) {
        if (this.activeOrder[order.type] == order)
          return this.activeOrderStage[order.type];
    },
    markDone: function (orderid) {
      socket.emit("orderDone", orderid);
    },
    ejPaborjad: function (type,orderDiv,style){
      this.activeOrderStage[type] = "not-started";
      document.getElementById(orderDiv).style.border = "2pt " + style + " white";
    },
    paborjad: function(type,orderDiv,style){
      this.activeOrderStage[type] = "started";
      document.getElementById(orderDiv).style.border = "2pt " + style + " yellow";
    },
    klar: function(order,type,orderDiv,style,button){
      document.getElementById(orderDiv).style.border = "2pt " + style + " white";
      this.activeOrderStage[type] = "not-started";
      order.done = true;
      document.getElementById(button).checked = true;
      vm.markDone(order.orderId);

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
  }
);

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
