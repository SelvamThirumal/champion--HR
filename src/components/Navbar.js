import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo4.jpg';

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'about' or 'services'

  const aboutDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (showSearch) setShowSearch(false);
    closeAllDropdowns();
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    closeAllDropdowns();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    closeAllDropdowns();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close mobile menu
      if (isMobileMenuOpen && 
          !e.target.closest('.navbar-collapse') && 
          !e.target.closest('.navbar-toggler')) {
        closeMobileMenu();
      }
      
      // Close dropdowns
      if (openDropdown && 
          !e.target.closest('.dropdown') &&
          !e.target.closest('.dropdown-toggle')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen, openDropdown]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  // Custom Dropdown Component
  const CustomDropdown = ({ title, items, icon, dropdownName }) => (
    <li className="nav-item dropdown" ref={dropdownName === 'about' ? aboutDropdownRef : servicesDropdownRef}>
      <button
        className="nav-link dropdown-toggle text-dark custom-hover-red btn btn-link p-0 border-0"
        onClick={() => toggleDropdown(dropdownName)}
        aria-expanded={openDropdown === dropdownName}
        style={{ background: 'none', textDecoration: 'none' }}
      >
        <i className={`fas ${icon} me-1`}></i> {title}
      </button>
      <ul 
        className={`dropdown-menu ${openDropdown === dropdownName ? 'show' : ''}`}
        style={{
          display: openDropdown === dropdownName ? 'block' : 'none',
          position: 'absolute',
          zIndex: 1000
        }}
      >
        {items.map((item, index) => (
          <li key={index}>
            <Link 
              className="dropdown-item" 
              to={item.path}
              onClick={() => {
                closeMobileMenu();
                closeAllDropdowns();
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );

  const aboutItems = [
    { path: "/about/mission", label: "Mission & Values" },
    { path: "/about/company", label: "Our Company" }
  ];

  const servicesItems = [
    { path: "/services/staffing", label: "Staffing Solutions" },
    { path: "/services/compliance", label: "HR & Statutory Compliance" },
    { path: "/services/industries", label: "Industries We Serve" }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar sticky-top bg-white">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMobileMenu}>
          <img src={logo} alt="Logo" width="100" height="100" className="me-2" />
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon-custom">
            {isMobileMenuOpen ? (
              <i className="fas fa-times fs-4"></i>
            ) : (
              <i className="fas fa-bars fs-4"></i>
            )}
          </span>
        </button>

        {/* Mobile Search */}
        {showSearch && (
          <div className="w-100 py-2 d-lg-none">
            <form className="d-flex px-3" onSubmit={handleSearchSubmit}>
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
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link 
                className="nav-link text-dark custom-hover-red" 
                to="/"
                onClick={closeMobileMenu}
              >
                <i className="fas fa-home me-1"></i>HOME
              </Link>
            </li>

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
            <CustomDropdown 
              title="ABOUT"
              items={aboutItems}
              icon="fa-user"
              dropdownName="about"
            />

            {/* Services Dropdown */}
            <CustomDropdown 
              title="SERVICES"
              items={servicesItems}
              icon="fa-cogs"
              dropdownName="services"
            />

            <li className="nav-item">
              <Link 
                className="nav-link text-dark custom-hover-red" 
                to="/contact"
                onClick={closeMobileMenu}
              >
                <i className="fas fa-phone-alt me-1"></i> CONTACT
              </Link>
            </li>

            {/* Desktop Search */}
            <li className="nav-item d-none d-lg-block">
              <button
                className="btn btn-link nav-link text-dark custom-hover-red"
                onClick={toggleSearch}
                aria-label="Search"
              >
                <i className="fas fa-search"></i>
              </button>
            </li>

            {/* Mobile Search */}
            <li className="nav-item d-lg-none">
              <button
                className="btn btn-link nav-link text-dark custom-hover-red w-100 text-start"
                onClick={toggleSearch}
              >
                <i className="fas fa-search me-1"></i> SEARCH
              </button>
            </li>
          </ul>

          {/* Desktop Search Box */}
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

      <style>{`
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
        
        .dropdown-toggle::after {
          display: inline-block;
          margin-left: 0.255em;
          vertical-align: 0.255em;
          content: "";
          border-top: 0.3em solid;
          border-right: 0.3em solid transparent;
          border-bottom: 0;
          border-left: 0.3em solid transparent;
        }
        
        .dropdown-menu {
          background: #343a40;
          border: none;
          border-radius: 0.375rem;
        }
        
        .dropdown-item {
          color: #fff !important;
          padding: 0.5rem 1rem;
        }
        
        .dropdown-item:hover {
          background: #495057;
          color: #fff !important;
        }
        
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
            background: #f8f9fa;
            margin-left: 1rem;
            position: static !important;
            float: none;
            width: auto;
            box-shadow: none;
          }
          
          .dropdown-item {
            color: #212529 !important;
            padding: 0.5rem 1rem;
          }
          
          .nav-link {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            align-items: center;
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