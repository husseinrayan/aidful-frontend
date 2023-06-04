import { React, useState, useEffect } from "react";
import "./Card.css";
import { FaCartPlus } from "react-icons/fa";

const Card = (props) => {
  const [showProduct, setShowProduct] = useState(false);
  console.log(props.image);
  return (
    <div className="container" style={props.style}>
      <div className="header-card">
        <div
          className="transparent-div"
          onClick={() => props.show(true, props.id)}
        ></div>
        <img src={props.image} alt="product-card" />
        {/* <FaCartPlus
          className="add-button"
          onClick={() => props.addProducts(props.id)}
        /> */}
      </div>
      <div className="body-card">
        <div className="info-card">
          <h3>{props.name}</h3>
          
        </div>
        <div className="product-take-btn">
          {props.taken ? (
            <button onClick={props.onClickIsNotTake}>Revert</button>
            ) : (
              <button onClick={props.onClickTake}>Take</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
