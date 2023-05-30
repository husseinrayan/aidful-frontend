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
import Spinner from "../../components/spinner/spinner.js";
function DashboardCategories() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryAddData, setCategoryAddData] = useState({
    name: "",
  });

  const [categoryEditData, setCategoryEditData] = useState({
    name: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  // const [categories, setCategories] = useState([]);

  const triggerEdit = () => {
    setIsEdit(true);
  };

  const getRowId = (row) => {
    return row._id;
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },

    { field: "name", headerName: "Name", width: 200 },
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
            onClick={() => deleteCategory(params.id)}
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

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/category`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleFormChange = (event) => {
    const value = event.target.value;
    setCategoryAddData({ ...categoryAddData, [event.target.name]: value });
  };

  const handleEditChange = (event) => {
    const value = event.target.value;
    setCategoryEditData({ ...categoryEditData, [event.target.name]: value });
  };

  const addCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const categoryAddForm = {
      name: categoryAddData.name,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/category`,
        categoryAddForm
      );

      setIsSubmitting(false);
      setOpenPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Category Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setCategoryAddData({
        name: "",
      });
      setError(response.data.message);
      getCategories();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      setIsSubmitting(false);
    }
  };

  const editCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const categoryEditForm = {
      name: categoryEditData.name,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/category/${editId}`,
        categoryEditForm
      );

      setIsSubmitting(false);
      setOpenPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Category Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setCategoryEditData({
        name: "",
      });
      setError(response.data.message);
      getCategories();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      setIsSubmitting(false);
    }
  };

  const deleteCategory = async (id) => {
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
            .delete(`${process.env.REACT_APP_API_URL}/api/category/${id}`)
            .then((response) => {
              getCategories();
            });
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
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

  return (
    <div className="dashboard-admins onLoad">
      <DashboardHeroSection title="Categories" />
      {openPopup && (
        <DashboardPopUp
          title={isEdit ? "Edit Category" : "Add Category"}
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
          onSubmit={isEdit ? editCategory : addCategory}
        >
          <div style={{ color: "var(--accent-color)" }}>{error}</div>
          <div>
            <TextField
              label="Name"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="name"
              autoFocus={true}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? categoryEditData.name : categoryAddData.name}
            />
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
            name="Add Category"
            style={{ padding: "1rem 2rem" }}
            onClick={() => {
              setOpenPopup(true);
            }}
          />
        </div>
        <DataGrid
          sx={{ width: "100%" }}
          rows={data}
          columns={columns}
          getRowId={getRowId}
          // pagination
          // pageSize={perPage}
          // rowCount={totalItems}
          // onPageChange={handlePageChange}
          // onPageSizeChange={handlePageSizeChange}
          rowSelection={false}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default DashboardCategories;
