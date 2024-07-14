import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import "./PaymentPage.css";

const PaymentPage = ({ cartItems }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    state: "",
    city: "",
    zip: "",
    phoneNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //If we ever have to Process payment here later 😏
    navigate("/");
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = parseFloat(item.price);
    const itemQuantity = parseInt(item.quantity, 10);
    console.log(
      `Item: ${item.name}, Price: ${itemPrice}, Quantity: ${itemQuantity}`
    );
    return (
      sum +
      (isNaN(itemPrice) ? 0 : itemPrice) *
        (isNaN(itemQuantity) ? 1 : itemQuantity)
    );
  }, 0);

  const delivery = 9.99;
  const total = subtotal + delivery;

  return (
    <div className="payment-page">
      <Link to="/checkout" className="back-link">
        <ChevronLeft size={20} />
        <span>Checkout</span>
      </Link>

      <div className="payment-content">
        <div className="order-details">
          <h2>Order Details ({cartItems.length})</h2>
          {cartItems.map((item) => {
            const itemPrice = parseFloat(item.price);
            const itemQuantity = parseInt(item.quantity, 10);
            const totalItemPrice =
              (isNaN(itemPrice) ? 0 : itemPrice) *
              (isNaN(itemQuantity) ? 1 : itemQuantity);

            return (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Quantity: {isNaN(itemQuantity) ? 1 : itemQuantity}</p>
                  <p>
                    Unit Price: £{" "}
                    {isNaN(itemPrice) ? "N/A" : itemPrice.toFixed(2)}
                  </p>
                </div>
                <p>Total: £ {totalItemPrice.toFixed(2)}</p>
              </div>
            );
          })}
          <div className="order-summary">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>£ {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Delivery</span>
              <span>£ {delivery.toFixed(2)}</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>£ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <h2>Delivery Information</h2>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name*"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="text"
            name="address"
            placeholder="Address*"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <div className="form-row">
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            >
              <option value="">State*</option>
              <option value="FCT Abuja">FCT Abuja</option>
              {/* Add more states as needed */}
            </select>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            >
              <option value="">City*</option>
              <option value="Wuse">Wuse</option>
              {/* Add more cities as needed */}
            </select>
          </div>
          <div className="form-row">
            <input
              type="text"
              name="zip"
              placeholder="ZIP*"
              value={formData.zip}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number*"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <h2>Payment</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number*"
            value={formData.cardNumber}
            onChange={handleInputChange}
            required
          />
          <div className="form-row">
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date*"
              value={formData.expiryDate}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV*"
              value={formData.cvv}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="pay-now-btn">
            Pay Now £{total.toFixed(2)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
