'use strict';

Vue.component('ingredient', {
  name: 'ingredient',
  props: ['item','lang','name'],
  template: ' <div v-bind:class="[{highlight: chosen}, \'ingredient\']" v-on:click="changeSaldo()">\
                  <label id="ing_tit">\
                  {{item["ingredient_"+ lang]}}\
                  </label>\
                  <label id="ing_stock">\
                  {{item.stock}}\
                  </label>\
              </div>',
    data: function(){
    return{
    chosen: false
}
},
    methods:{
        changeSaldo: function() {
            this.chosen = !this.chosen;
            this.$emit('ingredientchosen');
            console.log("emitted")
//refs -föräldrar kan inte komma åt barnelements datastrukturer
          }
        } //emit
});

var vm = new Vue({
  el: '#lagerDiv',
  mixins: [sharedVueStuff], // include stuff that is used both in the ordering system and in the kitchen
  data: {
    chosenIng: 'No ingredient chosen',
    type: ''
  },
  method: {
    updateChosen: function() {
      console.log("In the method");
      ingredient: this.chosenIng;
      console.log(ingredient);
    //socket.emit('updateStock', { ingredient:chosenIng })
    //socket emit (meddelande till servern) updateStock,{ingredients:[chosenIng]+skicka med amount}
    }
  },
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

var saldoLetterList = [];

function changeSaldo(letterButton){
    console.log("changeSaldoFunction");
    var letterButton = letterButton.value;
    saldoLetterList.push(letterButton);
    document.getElementById("changeSaldoConsoleChild").innerHTML = saldoLetterList.join("");
}

function backSpaceLetter(){
    console.log('Remove letter');
    saldoLetterList.pop();
    document.getElementById("changeSaldoConsoleChild").innerHTML = saldoLetterList.join("");
}

function clearSaldoField(){
    saldoLetterList = [];
    document.getElementById("changeSaldoConsoleChild").innerHTML = saldoLetterList.join("");
}
