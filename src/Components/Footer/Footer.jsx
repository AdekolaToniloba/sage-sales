import "./Footer.css";
import { Facebook } from "iconsax-react";
import { Instagram } from "iconsax-react";
import { Xrp } from "iconsax-react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-flex">
        <div className="footer-left">
          <div className="footer-logo">
            <h1>SAGE_SALES</h1>
          </div>
          <p>complete yourstyle with awesome fashion accesories from us</p>
          <div className="footer-socials">
            <Facebook size="24" color="#000" className="social-icon" />
            <Instagram size="24" color="#000" className="social-icon" />
            <Xrp size="24" color="#000" className="social-icon" />
          </div>
          <p className="copyright">© SageSales 2024</p>
        </div>

        <div className="footer-right">
          <p>Get an inside scoop on our latest offers and stocks!</p>
          <div className="footer-contact-form" id="contact-us">
            <label htmlFor="">Email Address</label>
            <div className="form-input">
              <input
                type="email"
                name="email"
                id="contact-email"
                placeholder="John_Doe@gmail.com"
              />
              <button type="submit" id="submit-contact">
                Submit
              </button>
            </div>
            <div className="quicklinks">
              <ul>
                <li>Men</li>
                <li>Women</li>
                <li>All</li>
                <li>Nike</li>
                <li>Addidas</li>
                <li>Versace</li>
              </ul>
            </div>
            <div className="Contact-details">
              <p>Contact Us</p>
              <div className="numbers">
                <p>+234-xxxxxxxxxx</p>
                <p>+234-xxxxxxxxxx</p>
                <p>sagesales@yahoo.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
