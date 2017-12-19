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
    'backgroundColor':'transparent',
    'titleTextStyle': {color:'white', font: 'champagne__limousinesregular', bold:'false'},
    legend: {textStyle: {color: 'white'}}
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}
