'use strict';

Vue.component('ingredient', {
  name: 'ingredient',
  props: ['item', 'lang','name'],
  template: ' <div class="ingredient">\
                  <label id="ing_tit">\
                  <button class ="ingredientLagerButton" v-on:click="changeSaldo(item)">{{item["ingredient_"+ lang]}}</button>\
                  </label>\
                  <label id="ing_stock">\
                  {{item.stock}}\
                  </label>\
              </div>',
    methods:{
        changeSaldo: function(item){

          console.log('Change saldo')
            var e = document.getElementById(item.ingredient_id)
            e.style.background = 'rgb(255,255,255,0.4)'
          }
        }
});

var nvm = new Vue({
  el: '#lagerList',
  mixins: [sharedVueStuff], // include stuff that is used both in the ordering system and in the kitchen
  data: {
    type: ''
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

function createButton(){

}
