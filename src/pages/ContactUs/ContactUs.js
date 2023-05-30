import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";
import "./ContactUs.css";
import TextField from "../../components/text-field/text-field.js";
import Swal from "sweetalert2";

const ContactUs = () => {
  const form = useRef();
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (!isSubmitting) {
      return;
    }

    const timer = setTimeout(() => {
      setData({
        email: "",
        name: "",
        message: "",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [isSubmitting, data]);

  return (
    <div className="contact-us-page-container">
      <div className="main-hero-section-contact">
        <h2>Contact Us</h2>
      </div>
      <div className="contact-us-container">
        <div className="contact-us-form-container">
          <form 
          // ref={form} onSubmit={sendEmail}
          >
            <fieldset>
              <legend>Contact Us</legend>
              <p className="error-message">{err}</p>
              <div>
                <TextField
                  type="text"
                  id="name"
                  label="Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  placeholder="Enter your name"
                  required={false}
                />
              </div>
              <div>
                <TextField
                  type="email"
                  label="Email"
                  id="email"
                  name="email"
                  style={{ width: "100%" }}
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required={false}
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleChange}
                  placeholder="Your Message"
                  value={data.message}
                />
              </div>
            </fieldset>
            <div className="contact-us-form-submit-btn">
              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-us-page-submit-button"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
        <div className="get-in-touch">
          <h2>Get in touch!</h2>
          <p>
            <a href="mailto:aidfulleban@gmail.com">
              <i>
                <FaEnvelope />
              </i>
              aidfulleban@gmail.com
            </a>
          </p>
          <p>
            <a href="tel:+96181294140">
              <i>
                <FaPhone />
              </i>
              +961-81294140
            </a>
          </p>
          <p>
            <a href="https://wa.me/96181294140">
              <i>
                <FaWhatsapp />
              </i>
              whatsapp.com/Aidful
            </a>
          </p>
          <p>
            <a href="https://www.facebook.com/profile.php?id=100092553177679">
              <i>
                <FaFacebook />
              </i>
              facebook.com/Aidful
            </a>
          </p>
          <p>
            <a href="https://www.instagram.com/aidfulleb/tagged/">
              <i>
                <FaInstagram />
              </i>
              instagram.com/Aidful
            </a>
          </p>
          {/* <p>
            <i>
              <FaMapMarkerAlt />
            </i>
            Tripoli, Lebanon
          </p> */}
        </div>
      </div>
      {/* <div className="map-container">
     
      </div> */}
    </div>
  );
};

export default ContactUs;
