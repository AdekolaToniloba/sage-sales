import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../Components/ProductCards/ProductCard";
import { Link } from "react-router-dom";
import Banner from "../ShopPage/images/Banner.png";
import "../ShopPage/ShopListingPage.css";
import Toast from "../../Components/Toast";
import { ChevronDown } from "lucide-react";

const ShoppingListPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://timbu-get-all-products.reavdev.workers.dev/",
        {
          params: {
            organization_id: "c5701daa223c4f43bdb26523fc43fac7",
            reverse_sort: false,
            page: page,
            size: productsPerPage,
            Appid: "NLE1PEZIXCKFOM8",
            Apikey: "a75b3319e8f9489b9a6625f10aa8495720240712121120645980",
          },
        }
      );

      if (
        !response.data ||
        !response.data.items ||
        !Array.isArray(response.data.items)
      ) {
        throw new Error("Invalid data structure received from API");
      }

      const fetchedProducts = response.data.items.map((product) => ({
        id: product.unique_id,
        brand: product.brand || "Unknown",
        name: product.name,
        price: parseFloat(product.price || 0),
        image: product.image_url,
      }));
      const shuffledProducts = shuffleArray(fetchedProducts);

      setProducts(shuffledProducts);
      setTotalPages(Math.ceil(response.data.total / productsPerPage));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
      setLoading(false);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast(`${product.name} has been added to your cart.`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="search">
        <div className="search_text">
          <h2>Express Yourself. Own Your Style</h2>
          <p>
            Discover the latest trends and hottest pieces to elevate your look.
            Shop now!
          </p>
        </div>

        <div className="search_bar">
          <input
            type="text"
            name="search_bar"
            id="search_bar"
            placeholder="Search Category, brand..."
          />
        </div>
      </div>

      <div className="header_img">
        <img src={Banner} alt="Banner for the header" />
        <div className="text-on-img">
          <h2>Fashion For Every You</h2>
          <p>Unleash your style</p>
        </div>
      </div>

      <div className="filters">
        <div className="filter_category">
          <p>Categories</p>
          <div className="filter_cat_btn">
            <ul>
              <li>
                <a href="#">Men</a>
              </li>
              <li>
                <a href="#">Women</a>
              </li>
              <li>
                <a href="#">All</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="filter_dropdowns">
          <ul>
            <li className="type">
              <p>Type</p>
              <div className="dropdown" id="dropdown_type">
                <button className="dropbtn">
                  All <ChevronDown size={20} />
                </button>
                <div className="dropdown-content">
                  <a href="#">All</a>
                  <a href="#">Accessory</a>
                  <a href="#">Bag</a>
                  <a href="#">Clothing</a>
                  <a href="#">Shoes</a>
                </div>
              </div>
            </li>

            <li className="brand">
              <p>Brand</p>
              <div className="dropdown" id="dropdown_brand">
                <button className="dropbtn">
                  All <ChevronDown size={20} />
                </button>
                <div className="dropdown-content">
                  <a href="#">All</a>
                  <a href="#">Brand 1</a>
                  <a href="#">Brand 2</a>
                  <a href="#">Brand 3</a>
                </div>
              </div>
            </li>

            <li className="price">
              <p>Price Filter</p>
              <div className="dropdown" id="dropdown_price">
                <button className="dropbtn">
                  All <ChevronDown size={20} />
                </button>
                <div className="dropdown-content">
                  <a href="#">All</a>
                  <a href="#">₤0.00 - ₤500.00</a>
                  <a href="#">₤500.01 - ₤1000.00</a>
                  <a href="#">₤1000.01+</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          // <Link to={`/product/${product.id}`} key={product.id}>
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
          />
          /* </Link> */
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ShoppingListPage;
