import React, { useState, useEffect } from "react";
import "./ProductCard.css";
import shopAdd from "./shopAdd.png";

const ProductCard = ({ product, onAddToCart }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/150";
        }}
      />
      <p className="product-brand">{product.brand}</p>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">NGN {product.price.toFixed(2)}</p>
      <button
        className={`add-to-cart-button ${isMobile ? "mobile" : ""}`}
        onClick={() => onAddToCart(product)}
      >
        {isMobile ? (
          <img src={shopAdd} alt="Add to cart" className="cart-icon" />
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
};

export default ProductCard;
