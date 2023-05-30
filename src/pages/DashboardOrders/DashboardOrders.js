//
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import axios from "axios";
import Swal from "sweetalert2";
import DashboardHeroSection from "../../components/DashboardHeroSection/DashboardHeroSection";
import Tooltip from "@mui/material/Tooltip";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";

function DashboardOrders() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [isLoading, setIsLoading] = useState(false);

  const getRowId = (row) => {
    return row._id;
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "user.fullName",
      headerName: "Full Name",
      width: 260,
      valueGetter: (params) => {
        return params.row.user[0].fullName;
      },
    },
    {
      field: "user.email",
      headerName: "Email",
      width: 260,
      valueGetter: (params) => {
        return params.row.user[0].email;
      },
    },
    {
      field: "user.phoneNumber",
      headerName: "Phone Number",
      width: 200,
      valueGetter: (params) => {
        return params.row.user[0].phoneNumber;
      },
    },
    {
      field: "user.address",
      headerName: "Address",
      width: 200,
      valueGetter: (params) => {
        return params.row.user[0].address;
      },
    },
    {
      field: "products",
      headerName: "Products",
      width: 200,
      valueGetter: (params) => {
        return params.row.products.map((product) => product.name).join(", ");
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          {/* <IconButton
            color="secondary"
            aria-label="delete"
            onClick={() => softDelete(params.id)}
          >
            <DeleteIcon style={{ color: "var(--accent-color)" }} />
          </IconButton> */}
          {params.row.status == "pending" ? (
            <IconButton
              color="secondary"
              aria-label="delete"
              onClick={() => approveOrder(params.id)}
            >
              <Tooltip title="approve" placement="top">
                <DoneRoundedIcon style={{ color: "green" }} />
              </Tooltip>
            </IconButton>
          ) : (
            <IconButton
              color="secondary"
              aria-label="delete"
              onClick={() => undoApproveOrder(params.id)}
            >
              <Tooltip title="undo" placement="top">
                <UndoRoundedIcon style={{ color: "#222" }} />
              </Tooltip>
            </IconButton>
          )}
        </>
      ),
    },
  ];

  const approveOrder = async (id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/order/${id}`,
        { status: "approved" }
      );
      getOrders();
    } catch (e) {
      console.log(e);
    }
  };

  const undoApproveOrder = async (id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/order/${id}`,
        { status: "pending" }
      );
      getOrders();
    } catch (e) {
      console.log(e);
    }
  };

  // const softDelete = async (id) => {
  //   try {
  //     const response = await axios.patch(
  //       `${process.env.REACT_APP_API_URL}/api/order/${id}`,
  //       { isHidden: "true" }
  //     );
  //     getOrders();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/order?limit=25`
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
    getOrders();
  }, []);

  const deleteOrder = async (id) => {
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
            .delete(`${process.env.REACT_APP_API_URL}/api/order/${id}`)
            .then((response) => {
              console.log(response.data);
              getOrders();
            });
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Donate has been deleted.", "success");
      }
    });
  };

  return (
    <div className="dashboard-admins onLoad">
      <DashboardHeroSection title="Donate" />
      <div
        className="dashboard-admin-data-grid"
        style={{ width: "100%", overflow: "hidden" }}
      >
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

export default DashboardOrders;
