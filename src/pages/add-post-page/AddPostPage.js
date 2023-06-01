//
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import TextField from "../../components/text-field/text-field";
import MainButton from "../../components/button/button";
import Swal from "sweetalert2";
import DashboardHeroSection from "../../components/DashboardHeroSection/DashboardHeroSection";
import DashboardPopUp from "../../components/DashboardPopUp/DashboardPopUp";
import Spinner from "../../components/spinner/spinner";
import Cookies from "js-cookie";

function DashboardProducts() {
    const USER_ID = Cookies.get('user-id')
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(USER_ID)
  const [productAddData, setProductAddData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    category: [],
    user: userId
  });

  const [productEditData, setProductEditData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    category: "",
    user: userId
  });
  const [isEdit, setIsEdit] = useState(false);

  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const triggerEdit = () => {
    setIsEdit(true);
  };

  const getRowId = (row) => {
    return row._id;
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "image",
      headerName: "Image",
      width: 260,
      renderCell: (params) => (
        <div
          style={{
            width: "120px",
            height: "100%",
            padding: "5px",
          }}
        >
          <img
            src={`${process.env.REACT_APP_API_URL}/${params.value}`}
            alt="Product"
            width="100%"
            height="100%"
            style={{ borderRadius: "5px", objectFit: "contain" }}
          />
        </div>
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price", width: 60 },
    {
      field: "category",
      headerName: "Category",
      width: 260,
      valueGetter: (params) => {
        return params.row.category.map((cat) => cat.name).join(", ");
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="secondary"
            aria-label="delete"
            onClick={() => deleteProduct(params.id)}
          >
            <DeleteIcon style={{ color: "var(--accent-color)" }} />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="edit"
            onClick={() => {
              triggerEdit();
              setOpenPopup(true);
              setEditId(params.id);
            }}
          >
            <EditIcon style={{ color: "var(--accent-color)" }} />
          </IconButton>
        </>
      ),
    },
  ];

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product?limit=${25}`
      );
      console.log(response);
      setData(response.data.items);
      setTotalItems(response.data.totalItems);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();

    const userId = Cookies.get('user-id')
    setUserId(userId)
    const filteredProducts = data.filter((prod) => 
        prod.user._id === userId   
    )
    setFilteredData(filteredProducts)

  }, []);

  const handleFormChange = (event) => {
    const value = event.target.value;
    setProductAddData({ ...productAddData, [event.target.name]: value });
    console.log(productAddData);
  };

  const handleEditChange = (event) => {
    const value = event.target.value;
    setProductEditData({ ...productEditData, [event.target.name]: value });
  };

  const handleAddImageChange = (e) => {
    setProductAddData({ ...productAddData, image: e.target.files[0] });
  };

  const handleEditImageChange = (e) => {
    setProductEditData({ ...productEditData, image: e.target.files[0] });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const productAddForm = new FormData();
    productAddForm.append("name", productAddData.name);
    productAddForm.append("description", productAddData.description);
    productAddForm.append("price", productAddData.price);
    productAddForm.append("image", productAddData.image);
    productAddForm.append("category", productAddData.category._id);
    productAddForm.append("user", productAddData.user);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/product`,
        productAddForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsSubmitting(false);
      setOpenPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setProductAddData({
        fullName: "",
        email: "",
        password: "",
      });
      setError(response.data.message);
      getProducts();
      getCategories();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      setIsSubmitting(false);
    }
  };

  const editProduct = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const productEditForm = new FormData();
    productEditForm.append("name", productEditData.name);
    productEditForm.append("description", productEditData.description);
    productEditForm.append("price", productEditData.price);
    productEditForm.append("image", productEditData.image);
    productEditForm.append("category", productEditData.category._id);
    productEditForm.append("user", productEditData.user);


    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/product/${editId}`,
        productEditForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsSubmitting(true);
      setOpenPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setProductEditData({
        fullName: "",
        email: "",
        password: "",
      });
      setError(response.data.message);
      getProducts();
      getCategories();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      setIsSubmitting(false);
    }
  };

  const deleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--secondary-color)",
      cancelButtonColor: "var(--accent-color)",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios
            .delete(`${process.env.REACT_APP_API_URL}/api/product/${id}`)
            .then((response) => {
              console.log(response.data);
              getProducts();
              getCategories();
            });
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    });
  };

  const handlePageChange = (params) => {
    setPage(params.page);
    console.log(page);
  };

  const handlePageSizeChange = (params) => {
    setPerPage(params.perPage);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/category`
      );
      console.log(response.data);
      setCategories(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="dashboard-admins onLoad">
        {console.log(filteredData)}
      <DashboardHeroSection title="Products" />
      {openPopup && (
        <DashboardPopUp
          title={isEdit ? "Edit Product" : "Add Product"}
          onClick={
            isEdit
              ? () => {
                  setOpenPopup(false);
                  setIsEdit(false);
                }
              : () => {
                  setOpenPopup(false);
                }
          }
          onSubmit={isEdit ? editProduct : addProduct}
        >
          <div style={{ color: "var(--accent-color)" }}>{error}</div>
          <div>
            <TextField
              label="Name"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="name"
              autoFocus={isEdit ? true : false}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? productEditData.name : productAddData.name}
            />
          </div>
          <div>
            <TextField
              label="Description"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="description"
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={
                isEdit
                  ? productEditData.description
                  : productAddData.description
              }
            />
          </div>
          <div>
            <TextField
              label="price"
              type="number"
              style={{ width: "100%", fontSize: "1rem" }}
              name="price"
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? productEditData.price : productAddData.price}
            />
          </div>
          <div>
            <label>
              Category
              <select
                className="dashboard-admin-select"
                name="category"
                value={
                  isEdit
                    ? productEditData.category.name
                    : productAddData.category.name
                } // or formData.category.name
                onChange={
                  isEdit
                    ? (e) =>
                        setProductEditData({
                          ...productEditData,
                          category: { _id: e.target.value },
                        })
                    : (e) =>
                        setProductAddData({
                          ...productAddData,
                          category: { _id: e.target.value },
                        })
                }
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <input
              type="file"
              name="image"
              id="file-input"
              onChange={isEdit ? handleEditImageChange : handleAddImageChange}
              // value={isEdit ? productEditData.image : productAddData.image}
              className="file-input__input"
            />
            <label className="file-input__label" htmlFor="file-input">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="upload"
                class="svg-inline--fa fa-upload fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                ></path>
              </svg>
              <span>Upload image</span>
            </label>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <MainButton
              name={isEdit ? "Edit" : "Add"}
              style={{ width: "100%", padding: "1rem 0" }}
              type="submit"
            />
            {isSubmitting && (
              <Spinner
                style={{ width: "20px", height: "20px", marginTop: "10px" }}
              />
            )}
          </div>
        </DashboardPopUp>
      )}
      <div
        className="dashboard-admin-data-grid"
        style={{ width: "100%", overflow: "hidden" }}
      >
        <div className="dashboard-admin-add-button">
          <MainButton
            name="Add Product"
            style={{ padding: "1rem 2rem" }}
            onClick={async () => {
              await getCategories();
              setOpenPopup(true);
            }}
          />
        </div>
        <DataGrid
          sx={{ width: "100%" }}
          rows={data}
          columns={columns}
          getRowId={getRowId}
          pagination
          pageSize={25}
          rowCount={totalItems}
          // onPageChange={handlePageChange}
          // onPageSizeChange={handlePageSizeChange}
          rowSelection={false}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default DashboardProducts;
