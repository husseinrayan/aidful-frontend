import {React , useState , useEffect} from 'react'
import axios from "axios";
import { FaCartPlus, FaRegTimesCircle } from "react-icons/fa";
import "./ShowProduct.css"
const ShowProduct = (props) => {
  const [dataProduct, setDataProduct] = useState([]);
  const [categoryname, setCategoryname] = useState("");

  
useEffect(() => {
axios.get(`${process.env.REACT_APP_API_URL}/api/product/${props.id}`)
.then((response) => {
  setDataProduct(response.data);
  setCategoryname(response.data.category[0].name)
});
})
const handelCancel = () => {
props.show(false)
if(localStorage.idProduct !== undefined){
  localStorage.removeItem("idProduct");
}
}

    return (
      <div>
        {/* <div className="main-show-product">
          <div className="card-show-product">
            <FaRegTimesCircle
              className="cancel-show-product"
              onClick={handelCancel}
            />
            <div className="info-show-product">
              <h2>{categoryname}</h2>
              <h3>{dataProduct.name}</h3>
              <p>{dataProduct.description}</p>
              <div className="price-cart">
                <span>{dataProduct.price}$</span>
                <FaCartPlus
                  className="cart-button-show-product"
                  onClick={() => props.addProducts(props.id)}
                />
              </div>
            </div>
            <img
              src={`${process.env.REACT_APP_API_IMAGES}/${dataProduct.image}`}
              className="image-show-product"
            ></img>
          </div> */}
        {/* </div> */}
      </div>
    );
}

export default ShowProduct;