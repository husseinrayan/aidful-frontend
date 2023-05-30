import React from "react";
import "./footer.css";
import RMZNA from "../../../src/images/header-logo3.png";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="holl-footer">
      {/* <div className="right-space-footer"></div> */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-logo">
            <img src={RMZNA} alt="Logo" />
            <div className="logo-text">
              <p>Help others | Clothing Games , Medicines</p>
            </div>
          </div>
          <div className="footer-responsive-top-side">
            <div className="footer-links">
              <h3>Navigation</h3>
              <NavLink exact to="/" className="footer-link">
                Home
              </NavLink>
              <a href="#about-section" className="footer-link">
                About Us
              </a>
              <NavLink to="contact" className="footer-link">
                Contact Us
              </NavLink>
            </div>

            <div className="footer-categories">
              <h3>Categories</h3>
              <ul>
                <li>
                  <NavLink to="/category1" className="footer-link">
                    Category 1
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category2" className="footer-link">
                    Category 2
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category3" className="footer-link">
                    Category 3
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category4" className="footer-link">
                    Category 4
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-responsive-bottom-side">
            <div className="footer-social-media">
              <h3>Follow Us</h3>
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=100092553177679"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/aidfulleb/tagged/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/96181294140"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp />
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-contact">
              <h3>Contact Us</h3>
              <ul>
                {/* <li>
                  <FaMapMarkerAlt />
                  <span>Address</span>
                </li> */}
                <li>
                  <a
                    href="mailto:aidfulleban@gmail.com"
                    className="contact-link"
                  >
                    <FaEnvelope />
                    <span>aidfulleban@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+81294140" className="contact-link">
                    <FaPhone />
                    <span>81294140</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <p>
            &copy; {new Date().getFullYear()} Your Website Name. All rights
            reserved.
          </p>
        </div>
      </footer>
      {/* <div className="left-space-footer"></div> */}
    </div>
  );
};

export default Footer;
