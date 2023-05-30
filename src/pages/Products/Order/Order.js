import { React, useEffect, useState } from "react";
import axios from "axios";
import CardOrder from "./CardOrder/CardOrder";
import { FaRegTimesCircle } from "react-icons/fa";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import {NavLink} from "react-router-dom";
import cookies  from "js-cookie";
import "./Order.css";
const Order = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [triggerFetchData, setTriggerFetchData] = useState(false);
  const [productsOrder, setProductsOrder] = useState([]);
  const [stringOrder, setStringOrder] = useState("");
  const [fakeData, setFakeData] = useState([]);
  const [isLoged , setIsLoged] = useState(false);


  // useEffect(() => {
  //   // Call the removeCookie function to delete a cookie by name
  //   cookies.remove("user-id");
  // }, []);

  useEffect(() => {
    if(localStorage.products !== undefined) {
      setStringOrder(localStorage.products);
    }
  }, []);

  useEffect(() => {
    if(stringOrder !== ""){
    setProductsOrder(stringOrder.split(","));
    }
  }, [stringOrder]);

  useEffect(() => {
    const fetchData = async () => {
      const addProducts = [];
      for (let i = 0; i < productsOrder.length; i++) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/product/${productsOrder[i]}`
          );
          addProducts.push(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      setCartProducts(addProducts);
    };
    fetchData();
    setTriggerFetchData(false);
  }, [productsOrder, triggerFetchData]);

  const handleRemoveProduct = (element) => {
    for (let i = 0; i < productsOrder.length; i++) {
      if (productsOrder[i] === element) {
        productsOrder.splice(i, 1);
        // console.log(productsOrder);
      }
    }
    localStorage.setItem("products", productsOrder);
    setTriggerFetchData(true);
  };
  const idUser = cookies.get("user-id")

  const addOrder = async() => {
    try{
      const user = idUser;
      const products = productsOrder;

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/order`,
       {user,products},
            {
        headers: {
          Authorization: `Bearer ${cookies.get("user-token")}`,
        },
      })
      console.log(response);
    if(response.status === 201){
      window.alert("your order match successfuly")
      localStorage.removeItem("products");
      setProductsOrder([])
    }

    }catch(error){
      console.error(error.message);
    }
  }

    const handleCheckIfLogedin = () => {
      if (productsOrder.length > 0){
        if (idUser) {
          addOrder();
        } else {
          setIsLoged(true);
        }
      }
    };

  return (
    <div>
      <Header />
      <div className="main-order">
        <div className="order">
          {cartProducts.map((element) => (
            <CardOrder
              key={element._id}
              cartData={element}
              removeProduct={handleRemoveProduct}
              idProduct={element._id}
            />
          ))}
          <div className="div-confirme">
            <div className="confirme" onClick={handleCheckIfLogedin}>
              Confirm
            </div>
            {isLoged ? (
                 <NavLink className="link" to="/user-login" href="#hero">
                <p>please login first</p>
              </NavLink>
            ) : (
           ""
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Order;
