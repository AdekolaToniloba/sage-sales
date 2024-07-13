import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../src/Components/Header/Header";
import Footer from "../src/Components/Footer/Footer";
import ShoppingListPage from "../src/Pages/ShopPage/ShopListingPage";
import CheckoutPage from "../src/Pages/CheckoutPage/CheckoutPage";
import PaymentPage from "../src/Pages/FinalCheckout/PaymentPage";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems);
  };

  return (
    <Router>
      <div>
        <Header cartItemsCount={cartItems.length} />
        <Routes>
          <Route
            path="/"
            element={<ShoppingListPage addToCart={addToCart} />}
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cartItems={cartItems}
                updateCartItems={updateCartItems}
              />
            }
          />
          <Route
            path="/payment"
            element={<PaymentPage cartItems={cartItems} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
