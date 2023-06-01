import React from "react";
import "./Home.css";
import image from "../../images/image3.png";
import { Link } from "react-router-dom";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

function Training() {
  return (
    <div className="home-page-training">
      <h2 className="training-heading">Donation</h2>
      <div className="home-product-show-more">
        <Link to="/training" className="home-product-show-more-btn">
          Show More <ArrowRightAltRoundedIcon />
        </Link>
      </div>

      <div className="training-container">
        <div className="training-text">
          <div>
            <p className="training">
            Your contribution can make a difference in someone's life.
    Donate today and help us create positive change in our community.
    Together, we can build a brighter future through your generous support.
    By donating, you can help provide essential resources to those in need.
    Your generosity can transform lives and inspire hope.
    Every donation counts, no matter how big or small.
    Join us in our mission to make a meaningful impact through your contribution.
    With your support, we can make a lasting difference in the lives of countless individuals.
    Your donation will directly support our efforts to create a better world.
    Together, let's empower those who are less fortunate and create a more equitable society.
    Your kindness can bring joy and relief to those facing difficult circumstances.
    Donate today and be a catalyst for positive change in our community.
   Your financial support can help us continue our vital work and reach even more people in need.

Please let me know if you need any further assistance or if there's anything else I can help you with!
            </p>
            {/* <Link to="/training">
              <button className="training-button">View Training</button>
            </Link> */}
          </div>
          <div className="training-image">
            <img src={image} alt="Training" width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Training;
