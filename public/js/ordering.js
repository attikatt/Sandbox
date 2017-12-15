/*jslint es5:true, indent: 2 */
/*global sharedVueStuff, Vue, socket */
'use strict';

Vue.component('ingredient', {
  props: ['item', 'type', 'lang'],
  template: ' <div class="ingredient">\
                  <label>\
                    <button v-on:click="incrementCounter">{{ counter }}</button>\
                    {{item["ingredient_"+ lang]}}\
                  </label>\
              </div>',
  data: function () {
    return {
      counter: 0
    };
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1;
      this.$emit('increment');
    },
    resetCounter: function () {
      this.counter = 0;
    }
  }
});



var vm = new Vue({
  el: '#ordering',
  mixins: [sharedVueStuff], // include stuff that is used both in the ordering system and in the kitchen
  data: {
    type: '',
    chosenIngredients: []
  },
  created: function() {
    socket.on("orderNumber",function(orderNumber) {
      alert("Your ordernumber is " + orderNumber);
      console.log
  });
},
  methods: {
    addToOrder: function (item, type) {
      this.chosenIngredients.push(item);
      this.type = type;
    },
    placeOrder: function () {
      var i,
      //Wrap the order in an object
        order = {
          ingredients: this.chosenIngredients,
          type: this.type,
        };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      socket.emit('order', {order: order}); //free function
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter(); //ordering component
      }
      this.type = '';
      this.chosenIngredients = [];
    }
  }
});
