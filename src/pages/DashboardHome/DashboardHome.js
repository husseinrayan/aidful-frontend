import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashboardHome.css";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

function DashboardHome() {
  const navigate = useNavigate();

  const [countUsers, setCountUsers] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [countOrders, setCountOrders] = useState(0);
  const [countTrainings, setCountTrainings] = useState(0);

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const users = countUsers;
  const products = countProducts;
  const Donate = countOrders;
  const Donations = countTrainings;

  const data = {
    labels: ["Users", "Products", "Donate", "Donations"],
    datasets: [
      {
        // label: "# of Votes",
        data: [users, products, Donate, Donations],
        backgroundColor: ["#55a", "#55bbbc", "#669bbc", "#55cb"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const VerticalBarData = {
    labels,
    datasets: [
      {
        label: "Users",
        data: labels.map(() => users),
        backgroundColor: "#55a",
      },
      {
        label: "Products",
        data: labels.map(() => products),
        backgroundColor: "#55bbbc",
      },
      {
        label: "Donate",
        data: labels.map(() => Donate),
        backgroundColor: "#669bbc",
      },
      {
        label: "Donations",
        data: labels.map(() => Donations),
        backgroundColor: "#55cb",
      },
    ],
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user`
      );
      setCountUsers(response.data.totalItems);
    } catch (e) {
      console.log(e);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product`
      );
      setCountProducts(response.data.totalItems);
    } catch (e) {
      console.log(e);
    }
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/order`
      );
      setCountOrders(response.data.totalItems);
    } catch (e) {
      console.log(e);
    }
  };

  const getTrainings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/training`
      );
      setCountTrainings(response.data.totalItems);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
    getProducts();
    getOrders();
    getTrainings();
  }, []);

  return (
    <div className="dashboard-home onLoad">
      <div className="dashboard-home-stats">
        <DashboardCard
          title="Users"
          dataCount={countUsers}
          style={{ flexGrow: 1 }}
        />
        <DashboardCard
          title="Products"
          dataCount={countProducts}
          onClick={() => navigate("/dashboard-products")}
          style={{ flexGrow: 1 }}
        />
        <DashboardCard
          title="Donate"
          dataCount={countOrders}
          onClick={() => navigate("/dashboard-orders")}
          style={{ flexGrow: 1 }}
        />
        <DashboardCard
          title="Donations"
          dataCount={countTrainings}
          onClick={() => navigate("/dashboard-trainings")}
          style={{ flexGrow: 1 }}
        />
      </div>
      <div className="dashboard-home-charts">
        <div className="dashboard-home-chart">
          <Doughnut data={data} />
        </div>
        <div className="dashboard-home-chart">
          <Bar options={options} data={VerticalBarData} />
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
