import Navbar from "../mainPages/Navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaymentPage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const addresses = location.state.address;
  const deliveryAddressId = localStorage.getItem("addressId");

  const address = addresses.filter((e) => {
    return e._id === deliveryAddressId;
  });

  const placeOrderHandler = async () => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const itemdetail = [];
    const count = [];
    let totalCount = 0;

    for (let i = 0; i < cartItems.length; i++) {
      itemdetail.push({ itemdetail: cartItems[i].productId });
      count.push(cartItems[i].count);
      totalCount += cartItems[i].count;
    }

    try {
      const res = await fetch("/placeOrder", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          Products: itemdetail,
          count: count,
          productQuantity: totalCount,

          orderAmount: localStorage.getItem("totalAmount"),
          DeliveryAddress: localStorage.getItem("addressId"),
        }),
      });

      if (res.status === 201) {
        console.log("order placed successfully");
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar length={location.state.length} />
      <div className="m-10 grid grid-cols-3 grid-rows-5 gap-3  font-semibold">
        <div className=" grid col-span-2 row-span-5 gap-3">
          <div className=" col-span-2 row-span-1 border-gray-200 border dotted">
            <div className=" p-5 ">
              <span className="inline-flex text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>{" "}
                <div className="flex">
                  {" "}
                  Delivery Address
                  <div key={address[0]._id} className="ml-32">
                    <div className="text-sm text-gray-400">
                      <div>{address[0].address}</div>
                      {address[0].city}
                      {", "}
                      {address[0].pinCode}
                    </div>
                  </div>
                </div>
              </span>
              <button
                className=" text-center border solid border-slate-700 px-14  p-1 rounded-sm ml-44 "
                onClick={() => {
                  navigate("/cart/address");
                }}
              >
                CHANGE
              </button>
            </div>
          </div>

          <div className="col-span-2 row-span-1 border solid border-gray-200 ">
            <span className="inline-flex p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-gray-400 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
              <label className="ml-1 text-gray-400">
                {" "}
                Is this a gift order?{" "}
              </label>
            </span>
            <button className=" cursor-text text-center border solid border-slate-700 px-14  p-2 rounded-sm ml-96  ">
              ADD MESSAGE
            </button>
          </div>

          <div className="col-span-2 row-span-2 border solid border-gray-200">
            <span className=" text-gray-900 inline-flex p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              <div className="ml-1 font-semibold">Delivery Options</div>
            </span>
            <div className="grid grid-cols-3 ">
              <div></div>
              <div></div>
              <button
                className=" border solid  border-lime-500 bg-lime-500 shadow-md shadow-lime-400 rounded-sm mx-7 px-7 p-2"
                onClick={() => {
                  placeOrderHandler();
                }}
              >
                PROCEED TO PAYMENT
              </button>

              {showModal ? (
                <>
                  <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-1 z-50 outline-none focus:outline-none backdrop-blur-sm ">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-lime-600 shadow-lime-500 outline-none focus:outline-none p-4">
                        <button
                          className="bg-transparent flex self-end "
                          onClick={() => setShowModal(false)}
                        >
                          <span className="text-bold opacity-7 h-6 w-6 text-xl ">
                            x
                          </span>
                        </button>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-12 h-12 text-white mx-40 "
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center p-2 ">
                          <h3 className="text-2xl font-semibold text-white">
                            Order Placed Successfully
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className="col-span-2 row-span-1 border solid border-gray-200">
            <div className="p-6 text-gray-400">Payment Options</div>
          </div>
        </div>

        <div className=" col-span-1 row-span-5 ">
          <div className="row-span-1 col-span-1 p-10"></div>

          <div className="row-span-1 col-span-1 p-10"></div>

          <div className=" col-span-1 row-span-2 border solid border-gray-200 p-4">
            Order Summary
            <div className="grid grid-rows-1 border-8  solid border-gray-300 rounded-sm mt-3 mx-4 ">
              <div className="row-span-1 border solid border-gray-300">
                <div className="p-2 inline-flex">
                  Basket Value
                  <div className="ml-36">
                    &#8377;{localStorage.getItem("totalAmount")}
                  </div>{" "}
                </div>
                <div className="p-2 inline-flex">
                  Delivery Charge
                  <div className="ml-32 text-lime-500">FREE</div>
                </div>
              </div>
              <div>
                <div className="row-span-1 border solid border-gray-300 p-2 flex">
                  Total Amount Payable
                  <div className="ml-20 text-xl">
                    &#8377;{localStorage.getItem("totalAmount")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row-span-1 col-span-1  p-10"></div>
        </div>
      </div>
    </div>
  );
}
