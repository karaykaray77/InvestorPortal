// Portfolio Performance Chart
function createPortfolioPerformanceChart() {
    const ctx = document.getElementById('portfolioPerformanceChart').getContext('2d');
    
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, 'rgba(54, 162, 235, 0.3)');
    gradientFill.addColorStop(1, 'rgba(54, 162, 235, 0.0)');
    
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [142000, 151000, 148000, 154000, 162000, 168000, 172000, 176000, 181000, 185000, 196000, 245678];
    
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Portfolio Value ($)',
          data: data,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: gradientFill,
          borderWidth: 3,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 12,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                return `Value: $${context.raw.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: false,
            grid: {
              borderDash: [3, 3]
            },
            ticks: {
              callback: function(value) {
                return '$' + (value / 1000) + 'k';
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'nearest'
        }
      }
    });
  }
  
  // Asset Allocation Chart
  function createAssetAllocationChart() {
    const ctx = document.getElementById('assetAllocationChart').getContext('2d');
    
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Stocks', 'Bonds', 'Real Estate', 'Crypto', 'Cash'],
        datasets: [{
          data: [45, 25, 15, 10, 5],
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(201, 203, 207, 0.8)'
          ],
          borderColor: 'white',
          borderWidth: 2,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}%`;
              }
            }
          }
        }
      }
    });
  }
  document.addEventListener('DOMContentLoaded', function() {
    if(document.getElementById('portfolioPerformanceChart')) {
      createPortfolioPerformanceChart();
    }
    if(document.getElementById('assetAllocationChart')) {
      createAssetAllocationChart();
    }
  });
  
  