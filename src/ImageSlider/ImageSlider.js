import React from "react";
// import "./ImageSlider.css";

function ImageSlider({slides}) {
  
    return (
      <div className="slider">
        {slides.map((slide, index) => {
          const align = index % 2 === 0 ? "right" : "left";
          return (
            <div key={index} className={`slide align-${align}`}>
              <img src={slide.image} alt={slide.title} />
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          );
        })}
      </div>
    );
  }

export default ImageSlider;
