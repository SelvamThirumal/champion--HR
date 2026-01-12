import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo4.jpg';

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close search if open
    if (showSearch) {
      setShowSearch(false);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.navbar-collapse') && !e.target.closest('.navbar-toggler')) {
        closeMobileMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <nav className="navbar navbar-expand-lg navbar sticky-top bg-white">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMobileMenu}>
          <img src={logo} alt="Logo" width="100" height="100" className="me-2" />
        </Link>

        {/* Single Toggle Button for Mobile Menu */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="navbar-toggler-icon-custom">
            {isMobileMenuOpen ? (
              // X icon when menu is open
              <i className="fas fa-times fs-4"></i>
            ) : (
              // Hamburger icon when menu is closed
              <i className="fas fa-bars fs-4"></i>
            )}
          </span>
        </button>

        {/* Search Box for Mobile (appears when toggled) */}
        {showSearch && (
          <div className="w-100 py-2 d-lg-none">
            <form
              className="d-flex px-3"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn btn-primary ms-2">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        )}

        {/* Navbar Links */}
        <div 
          className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} 
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Home */}
            <li className="nav-item">
              <Link 
                className="nav-link text-dark custom-hover-red" 
                to="/"
                onClick={closeMobileMenu}
              >
                <i className="fas fa-home me-1"></i>HOME
              </Link>
            </li>

            {/* Jobs */}
            <li className="nav-item">
              <Link 
                className="nav-link text-dark custom-hover-red" 
                to="/jobs"
                onClick={closeMobileMenu}
              >
                <i className="fas fa-briefcase me-1"></i> JOBS
              </Link>
            </li>

            {/* About Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark custom-hover-red"
                href="#"
                id="aboutDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user me-1"></i> ABOUT
              </a>
              <ul 
                className="dropdown-menu dropdown-menu-dark" 
                aria-labelledby="aboutDropdown"
              >
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/about/mission"
                    onClick={closeMobileMenu}
                  >
                    Mission & Values
                  </Link>
                </li>
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/about/company"
                    onClick={closeMobileMenu}
                  >
                    Our Company
                  </Link>
                </li>
              </ul>
            </li>

            {/* Services Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark custom-hover-red"
                href="#"
                id="servicesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-cogs me-1"></i> SERVICES
              </a>
              <ul 
                className="dropdown-menu dropdown-menu-dark" 
                aria-labelledby="servicesDropdown"
              >
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/services/staffing"
                    onClick={closeMobileMenu}
                  >
                    Staffing Solutions
                  </Link>
                </li>
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/services/compliance"
                    onClick={closeMobileMenu}
                  >
                    HR & Statutory Compliance
                  </Link>
                </li>
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/services/industries"
                    onClick={closeMobileMenu}
                  >
                    Industries We Serve
                  </Link>
                </li>
              </ul>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link 
                className="nav-link text-dark custom-hover-red" 
                to="/contact"
                onClick={closeMobileMenu}
              >
                <i className="fas fa-phone-alt me-1"></i> CONTACT
              </Link>
            </li>

            {/* Search for Desktop */}
            <li className="nav-item d-none d-lg-block">
              <button
                className="btn btn-link nav-link text-dark custom-hover-red"
                onClick={toggleSearch}
                aria-label="Search"
              >
                <i className="fas fa-search"></i>
              </button>
            </li>

            {/* Search for Mobile inside menu */}
            <li className="nav-item d-lg-none">
              <button
                className="btn btn-link nav-link text-dark custom-hover-red w-100 text-start"
                onClick={toggleSearch}
                aria-label="Search"
              >
                <i className="fas fa-search me-1"></i> SEARCH
              </button>
            </li>
          </ul>

          {/* Search Box for Desktop */}
          {showSearch && !isMobileMenuOpen && (
            <div className="d-none d-lg-block">
              <form
                className="d-flex ms-2 mt-2"
                onSubmit={handleSearchSubmit}
                style={{ maxWidth: '200px' }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="btn btn-primary ms-2">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar-toggler {
          border: none;
          padding: 0.5rem;
        }
        
        .navbar-toggler:focus {
          box-shadow: none;
          outline: none;
        }
        
        .navbar-toggler-icon-custom {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
        }
        
        .navbar-toggler-icon-custom i {
          color: #000;
          transition: color 0.3s ease;
        }
        
        /* Mobile menu improvements */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: white;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            z-index: 1000;
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            max-height: 80vh;
            overflow-y: auto;
          }
          
          .dropdown-menu {
            border: none;
            background: #f8f9fa;
            margin-left: 1rem;
          }
          
          .dropdown-item {
            color: #212529 !important;
            padding: 0.5rem 1rem;
          }
          
          .nav-link {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #f0f0f0;
          }
          
          .nav-link:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;