import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import "./DashboardAdmins.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import TextField from "../../components/text-field/text-field";
import MainButton from "../../components/button/button";
import Swal from "sweetalert2";
import DashboardHeroSection from "../../components/DashboardHeroSection/DashboardHeroSection";
import DashboardPopUp from "../../components/DashboardPopUp/DashboardPopUp";
// import { FontAwesomeIcon } from "@fortawesome/";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
function DashboardAdmins() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [adminAddData, setAdminAddData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [adminEditData, setAdminEditData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const triggerEdit = () => {
    setIsEdit(true);
  };

  const getRowId = (row) => {
    return row._id;
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 420 },
    { field: "fullName", headerName: "Full name", width: 260 },
    { field: "email", headerName: "Email", width: 400 },
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
            onClick={() => deleteAdmin(params.id)}
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

  const getAdmins = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin?page=${page}&limit=${perPage}`
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
    getAdmins();
  }, [page, perPage]);

  const handleFormChange = (event) => {
    const value = event.target.value;
    setAdminAddData({ ...adminAddData, [event.target.name]: value });
  };

  const handleEditChange = (event) => {
    const value = event.target.value;
    setAdminEditData({ ...adminEditData, [event.target.name]: value });
    console.log(adminEditData);
  };

  const addAdmin = async (e) => {
    e.preventDefault();
    const adminAddForm = {
      fullName: adminAddData.fullName,
      email: adminAddData.email,
      password: adminAddData.password,
    };
    console.log(adminAddData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/register`,
        adminAddForm
      );

      console.log(response);
      setOpenPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Admin Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setAdminAddData({
        fullName: "",
        email: "",
        password: "",
      });
      setError(response.data.message);
      getAdmins();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
    }
  };

  const editAdmin = async (e) => {
    e.preventDefault();

    const adminEditForm = {
      fullName: adminEditData.fullName,
      email: adminEditData.email,
      password: adminEditData.password,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/admin/${editId}`,
        adminEditForm
      );

      console.log(response);
      setOpenPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Admin Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setAdminEditData({
        fullName: "",
        email: "",
        password: "",
      });
      setError(response.data.message);
      getAdmins();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
    }
  };

  const deleteAdmin = async (id) => {
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
            .delete(`${process.env.REACT_APP_API_URL}/api/admin/${id}`)
            .then((response) => {
              console.log(response.data);
              getAdmins();
            });
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Your admin has been deleted.", "success");
      }
    });
  };

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setPerPage(params.perPage);
  };

  return (
    <div className="dashboard-admins onLoad">
      <DashboardHeroSection title="Admins" />
      {openPopup && (
        <DashboardPopUp
          title={isEdit ? "Edit Admin" : "Add Admin"}
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
          onSubmit={isEdit ? editAdmin : addAdmin}
        >
          <div style={{ color: "var(--accent-color)" }}>{error}</div>
          <div>
            <TextField
              label="Full Name"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="fullName"
              autoFocus={isEdit ? true : false}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? adminEditData.fullName : adminAddData.fullName}
            />
          </div>
          <div>
            <TextField
              label="Email"
              type="email"
              style={{ width: "100%", fontSize: "1rem" }}
              name="email"
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? adminEditData.email : adminAddData.email}
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              style={{ width: "100%", fontSize: "1rem" }}
              name="password"
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? adminEditData.password : adminAddData.password}
            />
          </div>
          <div>
            <MainButton
              name={isEdit ? "Edit" : "Add"}
              style={{ width: "100%", padding: "1rem 0" }}
              type="submit"
            />
          </div>
        </DashboardPopUp>
      )}
      <div
        className="dashboard-admin-data-grid"
        style={{ width: "100%", overflow: "hidden" }}
      >
        <div className="dashboard-admin-add-button">
          <MainButton
            name="Add Admin"
            style={{ padding: "1rem 2rem" }}
            onClick={() => setOpenPopup(true)}
          />
        </div>
        <DataGrid
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

export default DashboardAdmins;
