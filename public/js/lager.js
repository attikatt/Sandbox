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
            console.log("Valt ingrediens")
//refs -föräldrar kan inte komma åt barnelements datastrukturer
          }
        } //emit
});

var saldo = '';

var vm = new Vue({
  el: '#lagerDiv',
  mixins: [sharedVueStuff], // include stuff that is used both in the ordering system and in the kitchen
  data: {
    chosenIng: 'No ingredient chosen',
    type: ''
  },
  methods: {
    updateChosen: function() {
      console.log("In the method");
      socket.emit('updateStock', {ingredient:this.chosenIng}, saldo)
      console.log('Efter socket emit')
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
    var letterButton = letterButton.value;
    saldoLetterList.push(letterButton);
    saldo = '';
    for (var i =0; i < saldoLetterList.length; i++){
      saldo = Number(saldo + saldoLetterList[i]);
    };
    document.getElementById("changeSaldoConsoleChild").innerHTML = saldoLetterList.join("");
    console.log(saldo)
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
