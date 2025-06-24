import { Link } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../assets/icons/logo-black.svg'; 

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="wrapper">
      <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo">
            <img src={Logo} alt="Logo" className="header__logo-img" />
          </Link>

          <div 
            className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="burger-menu__icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <nav className={`header__navigation nav ${isMenuOpen ? 'active' : ''}`}>
            <div className="nav__container">
              <Link to="/characters" className="nav__link" onClick={() => setIsMenuOpen(false)}>
                Characters
              </Link>
              <Link to="/locations" className="nav__link" onClick={() => setIsMenuOpen(false)}>
                Locations
              </Link>
              <Link to="/episodes" className="nav__link" onClick={() => setIsMenuOpen(false)}>
                Episodes
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="footer__container">
          <h3 className="footer__text">Make with ❤️ for the MobProgramming team</h3>
        </div>
      </footer>
    </div>
  );
}