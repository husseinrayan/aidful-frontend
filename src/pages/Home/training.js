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
              RMZNA is a distinguished Palestinian Hand Embroidery Brand that
              proudly showcases the rich cultural heritage of Palestine through
              its personalized and modern designs. While keeping true to
              traditional embroidery techniques, RMZNA intertwines the struggles
              and identity of Palestine within each piece, creating a powerful
              narrative that pays homage to the past while propelling towards
              the future. Through cross-stitched motifs and intricate designs,
              RMZNA shares the compelling story of Palestinian culture and its
              deep-rooted connection to the land and people. With a focus on
              attention to detail and quality, each piece is lovingly crafted to
              tell a unique story. As a brand, RMZNA is committed to keeping
              Palestinian heritage alive by introducing it to the modern fashion
              world. Through the use of contemporary fashion styles and
              innovative design concepts, RMZNA invites people from all over the
              world to embrace and wear the Palestinian identity with pride.
              Overall, RMZNA's dedication to the preservation of Palestinian
              culture and identity through its hand-embroidered designs is a
              true testament to its commitment to excellence and creativity.
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
