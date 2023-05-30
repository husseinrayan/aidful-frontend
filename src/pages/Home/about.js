import React, { Component } from "react";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Home.css";
import image4 from "../../images/image4.png";
import image6 from "../../images/image6.png";
import image5 from "../../images/image5.png";
import { Link } from "react-router-dom";
import logo from "../../images/header-logo3.png";
import axios from "axios";
// import { AiFillCloseCircle } from 'react-icons';

// import image7 from "../../images/image7.png";
// import image41 from "../../images/image41.png";

const products = [
  {
    image: image4,
  },
  {
    image: image6,
  },
  {
    image: image5,
  },
];

export class Products extends Component {
  state = {
    isAdmin: false,
    showEdit: "hide-edit",
    isOpen: false,
  };

  toggleEdit = () => {
    if (this.state.isAdmin) {
      this.setState({
        showEdit: "show-edit",
      });
    } else {
      this.setState({
        showEdit: "hide-edit",
      });
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  toggleOff = () => {
    if (this.setState.isAdmin) {
      this.setState({
        showEdit: "show-edit",
      });
    } else {
      this.setState({
        showEdit: "hide-edit",
      });
    }
  };

  render() {
    return (
      <div className="home-page-about">
        <section className="home-page-about-section" id="products">
          <div className="home-page-about-content">
            <h2>About Us</h2>
            <div className="home-page-about-image-paragraph">
              <div className="home-page-about-image">
                <img
                  src={logo}
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="home-page-about-paragraph">
                "Our website serves as a dedicated platform for individuals and
                organizations to make a meaningful difference by donating
                clothes, toys, and medicines. We provide a convenient and
                user-friendly interface that connects donors with those in need,
                fostering a spirit of generosity and compassion. Through our
                platform, donors can list their items and recipients can request
                specific donations, ensuring a seamless match between surplus
                resources and those who require them. With secure communication
                and location-based matching, we strive to facilitate the
                donation process, making it easier for donors and recipients to
                connect and positively impact communities in need."
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Products;
