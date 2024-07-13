import { Link } from "react-router-dom";
import "./Header.css";
import { ShoppingCart } from "iconsax-react";

const Header = ({ cartItemsCount }) => {
  return (
    <header className="header">
      <div className="navbar">
        <div className="fixed-content">
          <Link to="/" className="logo">
            SAGE_SALES
          </Link>

          <nav className="navbar_links">
            <ul>
              <li>
                <Link to="/">Shop</Link>
              </li>
              <li>
                <Link to="/#contact-us">Contact Us</Link>
              </li>
              <li className="cart">
                <Link to="/checkout">
                  <ShoppingCart size="18" color="#000" />
                  Cart ({cartItemsCount})
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
