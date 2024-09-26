import Navbar from "../mainPages/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SubcategoryProducts() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(
    !localStorage.getItem("cart")
      ? []
      : JSON.parse(localStorage.getItem("cart"))
  );
  useEffect(() => {
    axios
      .get(`/subcategory-products/${id}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((b) => {
        console.log(Error);
      });
  }, [id]);

  const addToCart = (productId) => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    console.log(cartItems, "cartItems");
    let item;
    if (cartItems?.length !== 0) {
      for (let i = 0; i < cartItems?.length; i++) {
        console.log(cartItems[i], "cartitems");
        if (cartItems[i].productId === productId) {
          cartItems[i].count++;
          setCart(cartItems);
          break;
        }
        if (i === cartItems.length - 1) {
          item = { productId: productId, count: 1 };
          console.log(item, "item");
          setCart([...cart, item]);
        }
      }
    } else {
      item = { productId: productId, count: 1 };
      console.log(item, "item");
      setCart([...cart, item]);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="bg-white">
      <Navbar length={cart?.length} />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <a
          className="m-4 hover:text-gray-900 font-semibold cursor-pointer text-gray-700 inline"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <svg
            className="inline w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back to Home
        </a>
        <div className="grid grid-cols-1 gap-y-10 gap-x-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-5   ">
          {products.map((product) => (
            <div
              key={"div" + product._id}
              className="hover:shadow-gray-400 hover:shadow-lg p-3  border-r-2 "
            >
              <a
                key={product._id}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/product/${product._id}`);
                }}
                className="group"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 ">
                  <img
                    src={product.imageSrc}
                    alt="product"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <p className="mt-4 h-6 overflow-auto text-sm text-gray-700">
                  {product.name}
                </p>

                <p className="mt-1 text-lg font-medium text-gray-900">
                  &#x20B9;
                  {product.price}
                </p>
              </a>

              <button
                type="submit"
                className="
                    rounded-md border border-transparent bg-lime-600  px-4 text-base font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                onClick={() => {
                  addToCart(product._id);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
