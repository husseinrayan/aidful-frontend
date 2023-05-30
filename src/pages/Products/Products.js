import { React, useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card/Card";
import { FaChevronRight } from "react-icons/fa";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ShowProduct from "./ShowProduct/ShowProduct";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [numberPages, setNumberPages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addProducts, setAddProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openPagginationButton, setOpenPagginationButton] = useState(true);
  const [showProduct, setShowProduct] = useState(false);
  const [idProductShowed, setIdProductShowed] = useState();
  const [isMounted, setIsMounted] = useState(false);

  // let activeStyle ={
  //     color: "rgb(158, 62, 62)",
  //     backgroundColor: "white"
  // }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && localStorage.idProduct !== undefined) {
      setIdProductShowed(localStorage.idProduct);
      setShowProduct(true);
    }
  }, [isMounted]);

  console.log(showProduct);
  console.log(idProductShowed);

  localStorage.setItem("products", addProducts);

  //function to add the products to the cart
  const handleAddProducts = (element) => {
    setAddProducts([...addProducts, element]);
  };

  const countNUmberPages = (element) => {
    const e = parseInt(element);
    const pages = [];

    for (let i = 0; i < e; i++) {
      pages.push(i + 1);
    }
    setNumberPages(pages);
  };
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/product?page=${page}`)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.items);
          countNUmberPages(response.data.totalPages);
          setTotalPages(response.data.totalPages);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Fetching = () => {
    useEffect(() => {
      fetchData();
    }, [page]);
  };
  Fetching();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/category`)
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data)
          setCategories(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handelPageChange = (element) => {
    setPage(element);
  };

  const handelPlus = () => {
    setPage(page + 1);
  };

  const HandlechangeCategory = async (element) => {
    const allProducts = [];
    for (let i = 1; i <= totalPages; i++) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/product?page=${i}`
        );
        if (response.status === 200) {
          const data = response.data.items;
          if (data) {
            for (let y = 0; y < data.length; y++) {
              if (data[y].category[0].name === element) {
                allProducts.push(data[y]);
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    // allProducts array now contains all items with the specific category
    setProducts(allProducts);
    setOpenPagginationButton(false);
  };

  const HandleAllCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/product?page=${page}`)
      .then(
        (response) => {
          if (response.status === 200) {
            setProducts(response.data.items);
            countNUmberPages(response.data.totalPages);
            setTotalPages(response.data.totalPages);
            // console.log(response.data.items);
            // console.log(products[0]._id)
          }
        },
        [page]
      )
      .catch((error) => {
        console.log(error);
      });
    setOpenPagginationButton(true);
  };

  const handleShowProduct = (element, id) => {
    setShowProduct(element);
    setIdProductShowed(id);
    setIsMounted(element);
  };

  const setIsTaken = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/product/isTaken/${id}`,
        { isTaken: true }
      );
      console.log(response);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const setIsNotTaken = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/product/isTaken/${id}`,
        { isTaken: false }
      );
      console.log(response);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  //show product from the search bar
  // if (localStorage.nameProduct !== undefined) {
  //   handleShowPro
  // }

  return (
    <div className="hool-product-page">
      <Header className="fixed" />
      {!showProduct ? (
        <div className="product-container">
          <div className="categories-container">
            <h3 className="category-item" onClick={() => HandleAllCategory()}>
              All category
            </h3>
            {categories.map((element) => (
              <h3
                className="category-item"
                key={element._id}
                onClick={() => HandlechangeCategory(element.name)}
              >
                {element.name}
              </h3>
            ))}
          </div>
          <div className="products">
            {products.map((element) => (
              <Card
                image={`${process.env.REACT_APP_API_IMAGES}/uploads/${element.image}`}
                name={element.name}
                description={element.description}
                category={element.category.name}
                key={element._id}
                id={element._id}
                addProducts={handleAddProducts}
                show={handleShowProduct}
                onClickTake={() => setIsTaken(element._id)}
                onClickIsNotTake={() => setIsNotTaken(element._id)}
                taken={element.isTaken}
              />
            ))}
          </div>
          {openPagginationButton ? (
            <div className="paggination">
              {numberPages.map((element) => (
                <div
                  className="number-page"
                  key={element}
                  onClick={() => {
                    handelPageChange(element);
                  }}
                >
                  {element}
                </div>
              ))}
              {!(totalPages === page) ? (
                <FaChevronRight
                  className="next-button"
                  onClick={() => {
                    handelPlus(page);
                  }}
                />
              ) : null}
            </div>
          ) : null}
          {!openPagginationButton ? <div className="footer-space"></div> : null}
        </div>
      ) : (
        <ShowProduct
          id={idProductShowed}
          addProducts={handleAddProducts}
          show={handleShowProduct}
        />
      )}
    </div>
  );
};

export default Products;
