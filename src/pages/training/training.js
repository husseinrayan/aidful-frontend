import "./training.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/spinner/spinner.js";

const Training = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTrainings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/training`
      );
      setIsLoading(false);
      setData(response.data.items);
      console.log(response);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrainings();
  }, []);

  return (
    <>
      <section className="training">
        <div className="main-hero-section">
          <h2>Donation</h2>
        </div>
        <div className="training-cards">
          {isLoading && (
            <div>
              <Spinner />
            </div>
          )}
          {data.map((training) => {
            return (
              <div className="training-card" key={training._id}>
                <div className="training-card-img">
                  <img
                    src={`https://aidfull-app-api.onrender.com${training.image}`}
                    alt="training card image"
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="training-card-desc">
                  <h2>{training.title}</h2>
                  <p>{training.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Training;
