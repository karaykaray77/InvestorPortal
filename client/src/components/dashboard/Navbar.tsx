import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <i className="fas fa-chart-line me-2 text-primary"></i>
          <span>InvestorPortal</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Portfolio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Investments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Market</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Reports</a>
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
              <a className="d-flex align-items-center text-decoration-none dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                <img src="https://ui-avatars.com/api/?name=John+Doe&background=3498db&color=fff" className="rounded-circle me-2" width="32" height="32" alt="User" />
                <span>John Doe</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                <li><a className="dropdown-item" href="#"><i className="fas fa-user me-2"></i>Profile</a></li>
                <li><a className="dropdown-item" href="#"><i className="fas fa-cog me-2"></i>Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item text-danger" href="#"><i className="fas fa-sign-out-alt me-2"></i>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
