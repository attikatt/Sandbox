'use strict';

Vue.component('ingredient', {
  props: ['item', 'lang'],
  template: ' <div class="ingredient">\
                  <label id="ing_tit">\
                    {{item["ingredient_"+ lang]}}\
                  </label>\
                  <label id="ing_stock">\
                  {{item.stock}}\
                  </label>\
              </div>'
});

var nvm = new Vue({
  el: '#lagerList',
  mixins: [sharedVueStuff], // include stuff that is used both in the ordering system and in the kitchen
  data: {
    type: ''
  }

});
