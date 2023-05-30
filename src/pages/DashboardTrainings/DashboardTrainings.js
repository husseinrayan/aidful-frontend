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

function DashboardTrainings() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [trainingAddData, setTrainingAddData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [trainingEditData, setTrainingEditData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [isEdit, setIsEdit] = useState(false);

  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
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
            alt="Training"
            width="100%"
            height="100%"
            style={{ borderRadius: "5px", objectFit: "contain" }}
          />
        </div>
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
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
            onClick={() => deleteTraining(params.id)}
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

  const getTrainings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/training?page=${page}&limit=${perPage}`
      );
      setData(response.data.items);
      setTotalItems(response.data.totalItems);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrainings();
  }, [page, perPage]);

  const handleFormChange = (event) => {
    const value = event.target.value;
    setTrainingAddData({ ...trainingAddData, [event.target.name]: value });
  };

  const handleEditChange = (event) => {
    const value = event.target.value;
    setTrainingEditData({ ...trainingEditData, [event.target.name]: value });
  };

  const handleAddImageChange = (e) => {
    setTrainingAddData({ ...trainingAddData, image: e.target.files[0] });
  };

  const handleEditImageChange = (e) => {
    setTrainingEditData({ ...trainingEditData, image: e.target.files[0] });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const trainingAddForm = new FormData();
    trainingAddForm.append("title", trainingAddData.title);
    trainingAddForm.append("description", trainingAddData.description);
    trainingAddForm.append("image", trainingAddData.image);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/training`,
        trainingAddForm,
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
        title: "Donation Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setTrainingAddData({
        title: "",
        description: "",
        image: null,
      });
      setError(response.data.message);
      getTrainings();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      setIsSubmitting(false);
    }
  };

  const editProduct = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const trainingEditForm = new FormData();
    trainingEditForm.append("title", trainingEditData.title);
    trainingEditForm.append("description", trainingEditData.description);
    trainingEditForm.append("image", trainingEditData.image);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/training/${editId}`,
        trainingEditForm,
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
        title: "Donation Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setTrainingEditData({
        title: "",
        description: "",
        image: null,
      });
      setError(response.data.message);
      getTrainings();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      setIsSubmitting(false);
    }
  };

  const deleteTraining = async (id) => {
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
            .delete(`${process.env.REACT_APP_API_URL}/api/training/${id}`)
            .then((response) => {
              getTrainings();
            });
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Your Donation has been deleted.", "success");
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
      <DashboardHeroSection title="Trainings" />
      {openPopup && (
        <DashboardPopUp
          title={isEdit ? "Edit Donation" : "Add Donation"}
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
              label="Title"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="title"
              autoFocus={true}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? trainingEditData.title : trainingAddData.title}
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
                  ? trainingEditData.description
                  : trainingAddData.description
              }
            />
          </div>
          <div>
            <input
              type="file"
              name="image"
              id="file-input"
              onChange={isEdit ? handleEditImageChange : handleAddImageChange}
              // value={isEdit ? trainingEditData.image : trainingAddData.image}
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
              onClick={() => setIsEdit(false)}
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
            name="Add Donation"
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
          pagination
          pageSize={perPage}
          rowCount={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          rowSelection={false}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default DashboardTrainings;
