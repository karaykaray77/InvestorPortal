import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Link } from 'wouter';

const HomePage = () => {
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
    <div className="bg-light min-vh-100">
      {/* Modern Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link href="/dashboard" className="navbar-brand d-flex align-items-center">
            <i className="fas fa-chart-line me-2 text-primary"></i>
            <span>InvestorPortal</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link href="/dashboard" className="nav-link active">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link href="/marketplace" className="nav-link">Marketplace</Link>
              </li>
              <li className="nav-item">
                <Link href="/community" className="nav-link">Community</Link>
              </li>
              <li className="nav-item">
                <Link href="/resources" className="nav-link">Resources</Link>
              </li>
              <li className="nav-item">
                <Link href="/events" className="nav-link">Events</Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <div className="dropdown me-3">
                <a className="btn btn-light btn-sm position-relative" href="#" role="button" id="notificationsDropdown" data-bs-toggle="dropdown">
                  <i className="fas fa-bell"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end shadow-sm" style={{ minWidth: '300px' }}>
                  <h6 className="dropdown-header">Notifications</h6>
                  <a className="dropdown-item d-flex align-items-center py-2" href="#">
                    <div className="me-3">
                      <div className="bg-primary text-white rounded-circle p-2" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fas fa-chart-bar"></i>
                      </div>
                    </div>
                    <div>
                      <p className="mb-0 fw-bold">Portfolio update</p>
                      <p className="text-muted small mb-0">Your portfolio has increased by 2.4% today</p>
                      <p className="text-muted small mb-0">10 minutes ago</p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item text-center small text-primary" href="#">View all notifications</a>
                </div>
              </div>
              <div className="dropdown">
                <Link href="/profile" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="userDropdown" role="button" data-bs-toggle="dropdown">
                  <img src="https://ui-avatars.com/api/?name=John+Doe&background=3498db&color=fff" className="rounded-circle me-2" width="32" height="32" alt="User" />
                  <span>John Doe</span>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li><Link href="/profile" className="dropdown-item"><i className="fas fa-user me-2"></i>Profile</Link></li>
                  <li><a className="dropdown-item" href="#"><i className="fas fa-cog me-2"></i>Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link href="/auth" className="dropdown-item text-danger"><i className="fas fa-sign-out-alt me-2"></i>Logout</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
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
                <h2 className="mb-1">$245,678</h2>
                <p className="text-success mb-0"><i className="fas fa-arrow-up me-1"></i>2.4% today</p>
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
                <h2 className="mb-1">18.7%</h2>
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
                <h2 className="mb-1">12</h2>
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
                <h2 className="mb-1">65/100</h2>
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

        {/* Recent Transactions */}
        <div className="row mt-4 mb-4">
          <div className="col-12">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Recent Transactions</h5>
                  <a href="#" className="btn btn-sm btn-outline-primary">View All</a>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Asset</th>
                        <th scope="col">Type</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                              <i className="fas fa-chart-pie text-primary"></i>
                            </div>
                            <div>
                              <p className="mb-0 fw-medium">S&P 500 ETF</p>
                              <small className="text-muted">VOO</small>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge bg-success bg-opacity-10 text-success">Buy</span></td>
                        <td>Apr 15, 2023</td>
                        <td>$5,750.00</td>
                        <td><span className="badge bg-success">Completed</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-info bg-opacity-10 p-2 rounded-circle me-2">
                              <i className="fas fa-building text-info"></i>
                            </div>
                            <div>
                              <p className="mb-0 fw-medium">Microsoft Corp</p>
                              <small className="text-muted">MSFT</small>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge bg-danger bg-opacity-10 text-danger">Sell</span></td>
                        <td>Apr 12, 2023</td>
                        <td>$3,200.00</td>
                        <td><span className="badge bg-success">Completed</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-warning bg-opacity-10 p-2 rounded-circle me-2">
                              <i className="fas fa-coins text-warning"></i>
                            </div>
                            <div>
                              <p className="mb-0 fw-medium">Bitcoin</p>
                              <small className="text-muted">BTC</small>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge bg-success bg-opacity-10 text-success">Buy</span></td>
                        <td>Apr 10, 2023</td>
                        <td>$1,500.00</td>
                        <td><span className="badge bg-success">Completed</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-secondary bg-opacity-10 p-2 rounded-circle me-2">
                              <i className="fas fa-money-bill-wave text-secondary"></i>
                            </div>
                            <div>
                              <p className="mb-0 fw-medium">Cash Deposit</p>
                              <small className="text-muted">Bank Transfer</small>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge bg-success bg-opacity-10 text-success">Deposit</span></td>
                        <td>Apr 8, 2023</td>
                        <td>$2,000.00</td>
                        <td><span className="badge bg-success">Completed</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-danger bg-opacity-10 p-2 rounded-circle me-2">
                              <i className="fas fa-exclamation-triangle text-danger"></i>
                            </div>
                            <div>
                              <p className="mb-0 fw-medium">Risk Alert</p>
                              <small className="text-muted">High volatility detected</small>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge bg-warning bg-opacity-10 text-warning">Alert</span></td>
                        <td>Apr 5, 2023</td>
                        <td>N/A</td>
                        <td><span className="badge bg-danger">Pending</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-success bg-opacity-10 p-2 rounded-circle me-2">
                              <i className="fas fa-check-circle text-success"></i>
                            </div>
                            <div>
                              <p className="mb-0 fw-medium">Dividend Payment</p>
                              <small className="text-muted">Apple Inc</small>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge bg-success bg-opacity-10 text-success">Credit</span></td>
                        <td>Apr 1, 2023</td>
                        <td>$150.00</td>
                        <td><span className="badge bg-success">Completed</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                              <i className="fas fa-chart-line text-primary"></i>
                            </div>
                            <div>
                              <p className="mb-0 fw-medium">Portfolio Rebalance</p>
                              <small className="text-muted">Automated</small>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge bg-info bg-opacity-10 text-info">Rebalance</span></td>
                        <td>Mar 30, 2023</td>
                        <td>N/A</td>
                        <td><span className="badge bg-success">Completed</span></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-dark bg-opacity-10 p-2 rounded-circle me-2">
                              <i className="fas fa-user-shield text-dark"></i>
                            </div>
                            <div>
                              <p className="mb-0 fw-medium">Security Alert</p>
                              <small className="text-muted">Unusual login detected</small>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge bg-danger bg-opacity-10 text-danger">Alert</span></td>
                        <td>Mar 28, 2023</td>
                        <td>N/A</td>
                        <td><span className="badge bg-danger">Pending</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;