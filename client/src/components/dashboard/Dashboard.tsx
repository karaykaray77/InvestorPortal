import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Dashboard: React.FC = () => {
  const portfolioChartRef = useRef<HTMLCanvasElement>(null);
  const allocationChartRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Portfolio Performance Chart
    if (portfolioChartRef.current) {
      const ctx = portfolioChartRef.current.getContext('2d');
      if (ctx) {
        const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
        gradientFill.addColorStop(0, 'rgba(54, 162, 235, 0.3)');
        gradientFill.addColorStop(1, 'rgba(54, 162, 235, 0.0)');
        
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const data = [142000, 151000, 148000, 154000, 162000, 168000, 172000, 176000, 181000, 185000, 196000, 245678];
        
        new Chart(ctx, {
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
                usePointStyle: true
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
                    return '$' + (Number(value) / 1000) + 'k';
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
    }
    
    // Asset Allocation Chart
    if (allocationChartRef.current) {
      const ctx = allocationChartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
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
              }
            }
          }
        });
      }
    }
  }, []);

  return (
    <div className="container mt-4">
      {/* Dashboard Cards */}
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title text-primary mb-0">Portfolio Value</h5>
                <i className="fas fa-chart-line text-primary"></i>
              </div>
              <h2 className="mb-1">$<span id="portfolioValue">245,678</span></h2>
              <p className="text-success mb-0"><i className="fas fa-arrow-up me-1"></i><span id="portfolioGrowth">2.4</span>% today</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title text-info mb-0">Total Return</h5>
                <i className="fas fa-percentage text-info"></i>
              </div>
              <h2 className="mb-1"><span id="totalReturn">18.7</span>%</h2>
              <p className="text-muted mb-0">Since inception</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title text-warning mb-0">Active Investments</h5>
                <i className="fas fa-briefcase text-warning"></i>
              </div>
              <h2 className="mb-1"><span id="activeInvestments">12</span></h2>
              <p className="text-muted mb-0">Across 4 sectors</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title text-danger mb-0">Risk Score</h5>
                <i className="fas fa-shield-alt text-danger"></i>
              </div>
              <h2 className="mb-1"><span id="riskScore">65</span>/100</h2>
              <p className="text-muted mb-0">Moderate risk profile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row mt-4">
        <div className="col-md-8">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body">
              <h5 className="card-title">Portfolio Performance</h5>
              <div style={{ height: '300px' }}>
                <canvas ref={portfolioChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body">
              <h5 className="card-title">Asset Allocation</h5>
              <div style={{ height: '300px' }}>
                <canvas ref={allocationChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
