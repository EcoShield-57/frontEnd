const ctx = document.getElementById('chart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets: [{
      label: 'Delhi AQI',
      data: [300,320,310,330,350,340,320],
      borderColor: 'purple',
      fill: false
    }]
  }
});

if (data.message === "Login success") 
{
   window.location.href = "'index.html";
}

