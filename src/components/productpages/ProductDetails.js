import Navbar from "../mainPages/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Productdetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const [cart, setCart] = useState(
    !localStorage.getItem("cart")
      ? []
      : JSON.parse(localStorage.getItem("cart"))
  );

  useEffect(() => {
    axios
      .get(`/product-details/${id}`)
      .then((a) => {
        // console.log(a.data);
        setProduct(a.data);
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

      <div className="m-4 mt-8">
        <a
          className="  hover:text-gray-900 font-semibold cursor-pointer text-gray-700 inline"
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
      </div>

      <div>
        <nav aria-label="product">
          <li
            role="list"
            className="text-sm mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <a
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              {product.name}
            </a>
          </li>
        </nav>

        {/* Image gallery */}

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-4 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-0 lg:pb-24">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl  lg:col-span-1 lg:col-start-1 lg:gap-x-8 lg:px-8">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-auto w-auto object-cover object-center"
            />
          </div>

          <div className=" lg:col-span-1 lg:col-start-2 lg:border-r lg:border-gray-200 lg:pt-0 lg:pb-16 lg:pr-8">
            {/* Description and details */}

            <div className="lg:col-span-2  lg:border-gray-200 lg:pr-8 pb-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>

            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>

              {/* Options */}
              <div className="pt-10 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  &#x20B9;
                  {product.price}
                </p>

                <form className="mt-10">
                  <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-lime-600 py-3 px-8 text-base font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product._id);
                    }}
                  >
                    Add To Cart
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
