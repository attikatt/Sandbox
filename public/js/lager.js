'use strict';

Vue.component('ingredient', {
  name: 'ingredient',
  props: ['item', 'lang','name'],
  template: ' <div class="{highlight:chosen}, ingredient" v-on:click="changeSaldo(item)">\
                  <label id="ing_tit">\
                  {{item["ingredient_"+ lang]}}\
                  </label>\
                  <label id="ing_stock">\
                  {{item.stock}}\
                  </label>\
              </div>',
    data: function(){
    return{
    chosen:false
}
},
    methods:{
        changeSaldo: function(item){
            this.chosen = !this.chosen
            document.getElementById(item.ingredient_id).style.color = "black"
            var chosenIng = [item.ingredient_en.toUpperCase() + "<br>" + 'STOCK : ' + item.stock]
            document.getElementById("chosenIngredient").innerHTML = chosenIng;
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

function sortIngredients(){
    
}

function getChosen(){
    
}
