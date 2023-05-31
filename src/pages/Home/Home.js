import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Home.css";
import image1 from "../../images/rayan.jpeg";
import image7 from "../../images/image.webp";
import image14 from "../../images/image3.png";
import Training from "./training.js";
import About from "./about.js";
import Card from "../Products/Card/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

function HomePage() {
  const [productData, setProductData] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/product?limit=3`
      );
      console.log(response);
      setProductData(response.data.items);
    } catch (e) {
      console.log(e);
      alert(e)
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const productResponsive = {
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="home">
      <div className="sub-home">

      </div>
      <div className="hero-text"><h1>Have something you want to donate we are here to help make sure it reaches the right person</h1></div>
      <Carousel
        className="carousel"
        responsive={responsive}
        showDots={true}
        autoPlay={true}
        infinite={true}
        autoPlaySpeed={5000}
        swipeable={true}
      >
        <div className="carousel__item">
          <img
            src={image1}
            alt="Skin Care Product"
            className="carousel__image"
            width="100%"
            height="100%"
          />
        </div>
        <div className="carousel__item">
          <img
            src={image7}
            alt="Skin Care Product"
            className="carousel__image"
            width="100%"
            height="100%"
          />
        </div>
        <div className="carousel__item">
          <img
            src={image14}
            alt="Skin Care Product"
            className="carousel__image"
            width="100%"
            height="100%"
          />
        </div>
      </Carousel>

      <div className="home__content">
        <About />
        <div
          style={{
            // background: "var(--secondary-color)",
            padding: "40px 0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="home-page-product-section-heading">
            <h2>Products</h2>
          </div>
          <div className="home-product-show-more">
            <Link to="/products" className="home-product-show-more-btn">
              Show More <ArrowRightAltRoundedIcon />
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              columnGap: "80px",
            }}
          >
            {productData.map((product) => (
              <Card
                key={product.id}
                image={`http://localhost:5001/uploads/${product.image}`}
                name={product.name}

                // price={product.price}
                style={{ width: "500px" }}
              />
            ))}
          </div>
        </div>

        <Training />
      </div>
    </div>
  );
}

export default HomePage;
