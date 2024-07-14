import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import "./CheckoutPage.css";

const CheckoutPage = ({ cartItems, updateCartItems }) => {
  const navigate = useNavigate();

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    updateCartItems(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    updateCartItems(updatedItems);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * (item.quantity || 1),
    0
  );

  const clearCart = () => {
    updateCartItems([]);
  };

  return (
    <div className="checkout-page">
      <Link to="/" className="continue-shopping">
        <ChevronLeft size={20} />
        <span>Continue shopping</span>
      </Link>

      <div className="checkout-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="quantity-control">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, (item.quantity || 1) - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, (item.quantity || 1) + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="item-price">
                <p>
                  ₦{" "}
                  {(
                    (parseFloat(item.price) || 0) * (item.quantity || 1)
                  ).toFixed(2)}
                </p>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <div className="order-summary2">
            <h2>Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>
                  x{item.quantity || 1} {item.name}
                </span>
                <span>
                  ₦{" "}
                  {(
                    (parseFloat(item.price) || 0) * (item.quantity || 1)
                  ).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="total-price">
              <span>Order Total</span>
              <span>₦ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            className="proceed-to-payment"
            onClick={() => navigate("/payment")}
          >
            Proceed to Payment
          </button>

          <button className="clear-cart" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className="button-pay"></div>
      </div>
    </div>
  );
};

export default CheckoutPage;
