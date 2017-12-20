'use strict';

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

 var dataVm = new Vue({
   el: '#VueDiv',
   mixins: [sharedVueStuff], // include stuff that is used both in the ordering system and in the kitchen
   data: {
     amountSmoothies: 0,
     amountJuices: 0
   },
   methods: {
     createOrderData: function() {
      // console.log(this.orders[1].type);
       //console.log(this.orders)
     for (var i = 1; i < 4; i += 1) {
       console.log(i + " " + this.orders[i].type);
       if (this.orders[i].type === 'juice'){
         this.amountJuices += 1;
       }
       else if (this.orders[i].type === 'smoothie'){
         this.amountSmoothies += 1;
       }
     }
     return ([
       ['Type of drink', 'Amount ordered'],
       ['Smoothie',     this.amountSmoothies],
       ['Juice',      this.amountJuices]
     ])
   }
 }
});

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable(dataVm.createOrderData()/*[
    ['Type of drink', 'Amount ordered'],
    ['Smoothie',     11],
    ['Juice',      2]
  ]*/);
  //dataVm.createData();

  var options = {
    title: 'Distribution of orders',
    pieHole: 0.4,
    colors: ['blue', 'green'],
    'backgroundColor':'transparent',
    'titleTextStyle': {color:'white', fontName: 'champagne__limousinesregular', fontSize:'20', bold:'false'},
    legend: {textStyle: {color: 'white', fontName: 'champagne__limousinesregular', fontSize:'16'}}
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}
