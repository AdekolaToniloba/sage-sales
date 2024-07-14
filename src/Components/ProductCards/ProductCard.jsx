import { useState, useEffect } from "react";
import "./ProductCard.css";
import shopAdd from "./shopAdd.png";

const ProductCard = ({ product, onAddToCart }) => {
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
      <p className="product-price">
        ₦ {(parseFloat(product.current_price || 0) / 100).toFixed(2)}
      </p>
      <button
        className="add-to-cart-button"
        onClick={(e) => {
          e.preventDefault(); // Prevent navigation when clicking the button
          onAddToCart(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
