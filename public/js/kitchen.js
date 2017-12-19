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
             console.log(this.order.type)
             //vm.displayChosenDrink(this.order, this.orderId);
             this.active = !this.active;
             if (this.order.type === "juice"){
             this.$emit('active-order-juice');
             }
             if (this.order.type === "smoothie"){
             this.$emit('active-order-smoothie');
             }

             //document.getElementById('insertLine').innerHTML= "<hr>"
           }
        }
});

var vm = new Vue({
  el: '#mainDiv',
  mixins: [sharedVueStuff], // include stuff that is used both in the ordering system and in the kitchen
  data: {
    activeOrderJuice: "no Juice chosen",
    activeOrderSmoothie: "no Smoothie chosen"
  },
  methods: {
    markDone: function (orderid) {
      socket.emit("orderDone", orderid);
    },
    ejPaborjad: function (order){
      
    },
    paborjad: function(){

    },
    klar: function(){

    },

    displayChosenDrink: function(order, orderId) {

      var ingredientList =[]
      var ingred = []
      for (var i = 0; i < order.ingredients.length; i++){
        ingredientList.push(order.ingredients[i].ingredient_en)
      }

      document.getElementById('orderInfoHead').innerHTML = "#" + orderId +"<br>" + order.type.toUpperCase()
      /*for (var i=0; i<order.ingredients.length;i++){
        var canvas = document.getElementById("myCanvas");
        var ctx=canvas.getContext("2d");
        ctx.stokeStyle= order.ingredients[i].ingredient_color;
        console.log(order.ingredients[i].ingredient_color)
        ctx.rect(20,20,20,20);
        ctx.stroke();
      }*/
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
