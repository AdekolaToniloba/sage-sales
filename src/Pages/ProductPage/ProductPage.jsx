import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import "./ProductPage.css";

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://timbu-get-single-product.reavdev.workers.dev/${id}`,
          {
            params: {
              // id: product.id,
              organization_id: "c5701daa223c4f43bdb26523fc43fac7",
              Appid: "NLE1PEZIXCKFOM8",
              Apikey: "a75b3319e8f9489b9a6625f10aa8495720240712121120645980",
            },
          }
        );

        if (!response.data || !response.data.item) {
          throw new Error("Invalid data structure received from API");
        }

        setProduct(response.data.item);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product. Please try again later.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: parseFloat(product.current_price || 0),
        image: `https://api.timbu.cloud/images/${product.photos?.url}`,
      });
      navigate("/checkout");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-page">
      <Link to="/" className="back-to-shop">
        <ChevronLeft size={20} />
        <span>Back to Shop</span>
      </Link>

      <div className="product-details">
        <div className="product-image">
          <img
            src={`https://api.timbu.cloud/images/${product.photos?.url}`}
            alt={product.name}
          />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="brand">{product.brand}</p>
          <p className="price">
            £ {parseFloat(product.current_price || 0).toFixed(2)}
          </p>
          <p className="description">{product.description}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
