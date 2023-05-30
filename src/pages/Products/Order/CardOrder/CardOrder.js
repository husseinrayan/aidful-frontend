import React from 'react';
import { FaRegTimesCircle } from "react-icons/fa";
import "./CardOrder.css";
 const CardOrder = (props) => {
  const product = props.cartData;
  const id = props.idProduct;
  return (
    <div className="main-card-order">
    
        <img className="image" src={`${process.env.REACT_APP_API_IMAGES}/${product.image}`} />

      <div className="info-product">
        <h3>{product.name}</h3>
        <span>{product.price}$</span>
      </div>
      <FaRegTimesCircle
        className="delete"
        onClick={() => props.removeProduct(id)}
      />
    </div>
  );
}

export default CardOrder;