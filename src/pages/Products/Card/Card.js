import React, { useState, useEffect } from "react";
import "./Card.css";
import { FaCartPlus } from "react-icons/fa";

const Card = (props) => {
  const [showProduct, setShowProduct] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    const getToken =localStorage.getItem("user-token");
setToken(getToken)
  }, []);
  console.log(token)

  console.log(props.image);
  console.log(token);

  return (
    <div className="container" style={props.style}>
      <div className="header-card">
        <div
          className="transparent-div"
          onClick={() => props.show(true, props.id)}
        ></div>
        <img src={props.image} alt="product-card" />
      </div>
      <div className="body-card">
        <div className="info-card">
          <h3>{props.name}</h3>
        </div>
        {token ? (
          <div className="product-take-btn">
            {props.taken ? (
              <button onClick={props.onClickIsNotTake}>Revert</button>
            ) : (
              <button onClick={props.onClickTake}>Take</button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
