'use strict';

Vue.component('ingredient', {
  name: 'ingredient',
  props: ['item','lang','name'],
  template: ' <div v-bind:class="[{highlight: chosen}, \'ingredient\']" v-on:click="putToChosen()">\
                  <label id="ing_tit">\
                  {{item["ingredient_sv"]}}\
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
        putToChosen: function() {
            vm.unmarkOtherIngredients();
            this.chosen = !this.chosen;
            this.$emit('ingredientchosen');
          }
        }
});//refs($)- föräldrar kan inte komma åt barnelements datastrukturer

var vm = new Vue({
  el: '#lagerDiv',
  mixins: [sharedVueStuff], // include stuff that is used both in the ordering system and in the kitchen
  data: {
    chosenIng: 'No ingredient chosen',
    type: ''
  },
  methods: {
    updateChosen: function() {
      var saldo = Number(saldoLetterList.join(''))
      if (saldoLetterList.length > 0){
      socket.emit('updateStock', {ingredient:this.chosenIng}, saldo)
      vm.chosenIng.stock = saldo;
      clearSaldoField()
    }
      //socket emit (meddelande till servern) updateStock,{ingredients:[chosenIng]+skicka med amount}
    },
    unmarkOtherIngredients: function() {
      for (var i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].chosen = false; //unmark other Ingredients
      }
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

function numberPressed(letterButton){
    if (vm.chosenIng == "No ingredient chosen");
    var letterButton = letterButton.value;
    saldoLetterList.push(letterButton);
    document.getElementById("changeSaldoConsoleChild").innerHTML = saldoLetterList.join("");
}

function backSpaceLetter(){
    saldoLetterList.pop();
    document.getElementById("changeSaldoConsoleChild").innerHTML = saldoLetterList.join("");
}

function clearSaldoField(){
    saldoLetterList = [];
    document.getElementById("changeSaldoConsoleChild").innerHTML = saldoLetterList.join("");
}

function scrollFunction(value){
  //divideIngredientsIntoCategories()
  for (var i=0; i<vm.ingredients.length; i++){
    if (vm.ingredients[i].ingredient_sv[0].toUpperCase() === value){
      var element = document.getElementById(vm.ingredients[i].ingredient_id);
      element.scrollIntoView();
      break;
    }
}
}
