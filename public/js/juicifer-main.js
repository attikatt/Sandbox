/*jslint es5:true, indent: 2 */
/*global io, Vue */
/*exported sharedVueStuff */
'use strict';

var socket = io();

Vue.component('order-item', {
  props: ['uiLabels', 'order', 'orderId', 'lang'],
  template: '<div><p class="headOrderInfo">{{orderId}}{{order.type}}</p> </br> <hr> <ul> <li v-for="item in order.ingredients" :class="item.ingredient_color"><span>{{item["ingredient_" + lang]}}</span> </li></ul></div>'
});

Vue.component('order-item-short',{
  props: ['uiLabels', 'order', 'type', 'orderId','lang', 'name'],
  template : '<div>#{{orderId}} </br> Egen dryck </br> (<span>{{order.type}}</span>)</div>'
});

// Stuff that is used both in the ordering system and in the kitchen
var sharedVueStuff = {
  data: {
    orders: {},
    uiLabels: {},
    ingredients: {},
    lang: "en"
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
      this.uiLabels = data.uiLabels;
      this.ingredients = data.ingredients;
    }.bind(this));

    socket.on('switchLang', function (data) {
      this.uiLabels = data;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
      if (typeof data.ingredients !== 'undefined') {
        this.ingredients = data.ingredients;
      }
    }.bind(this));
  },
  methods: {
    switchLang: function () {
      if (this.lang === "en") {
        this.lang = "sv";
      } else {
        this.lang = "en";
      }
      socket.emit('switchLang', this.lang);
    }
  }
};
