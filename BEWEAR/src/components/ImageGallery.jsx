import { useState, useEffect } from "react";
import "./ImageGallery.css";

function ImageGallery({ images, selectedIndex, onSelectImage, productName }) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex || 0);

  useEffect(() => {
    setCurrentIndex(selectedIndex || 0);
  }, [selectedIndex]);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onSelectImage(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onSelectImage(newIndex);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    onSelectImage(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="ig-container">
        <div className="ig-no-image">No images available</div>
      </div>
    );
  }

  return (
    <div className="ig-container">
      {/* Main Image */}
      <div className="ig-main-wrapper">
        <img
          src={images[currentIndex]}
          alt={`${productName} view ${currentIndex + 1}`}
          className="ig-main-image"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="ig-nav-btn ig-nav-prev"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="ig-nav-btn ig-nav-next"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="ig-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="ig-thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              className={`ig-thumbnail ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1}`}
              aria-pressed={index === currentIndex}
            >
              <img src={image} alt={`${productName} thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
