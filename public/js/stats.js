'use strict';

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Type of drink', 'Amount ordered'],
    ['Smoothie',     11],
    ['Juice',      2]
  ]);

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
console.log(sharedVueStuff.Data().getAllOrders());

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
