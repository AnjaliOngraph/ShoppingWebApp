import axios from "axios";
import Navbar from "../mainPages/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get(`/orders/${id}`)
      .then((a) => {
        setOrders(a.data);
      })
      .catch((b) => {
        console.log(Error);
      });
  }, [id]);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  console.log(orders, "orders");
  const cartItems = JSON.parse(localStorage.getItem("cart"));

  return (
    <div>
      <Navbar length={cartItems?.length} />
      <div className=" relative m-8 p-6">
        <div className="col-span-2 font-bold pb-4 text-2xl ">My Orders</div>

        {orders.length === 0 ? (
          <div>No item Ordered yet</div>
        ) : (
          <div>
            {orders.map((order) => {
              return (
                <div key={order._id} className="mt-4 ">
                  <table className="table-auto w-full  bg-gray-100  ">
                    <thead className="">
                      <tr className="border-b-2  border-gray-400">
                        <th className="p-3 pl-8 w-5/12 text-left">
                          ITEM DESCRIPTION
                        </th>
                        <th className="text-left w-52">DeliveryAddress</th>
                        <th className="text-center">Total Quanity</th>
                        <th className="text-center">Total Amount</th>
                        <th className="text-center">Order Placed</th>
                      </tr>
                    </thead>

                    <tbody className="text-left ">
                      <tr className="border-b-2 border-gray-200">
                        <td className="p-2 pl-8 ">
                          {order.Products.map((product) => {
                            return (
                              <div
                                key={product.itemdetail._id}
                                className="flex py-2"
                              >
                                <img
                                  alt={"product"}
                                  src={product.itemdetail.imageSrc}
                                  className="w-16 rounded-md"
                                ></img>
                                <div>
                                  <div className="pl-4 font-semibold">
                                    {product.itemdetail.name}
                                  </div>
                                  <div className="pl-4">
                                    &#8377; {product.itemdetail.price}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </td>
                        <td className="text-left">
                          <div>{order.DeliveryAddress.address}</div>
                          <div>{order.DeliveryAddress.city}</div>
                          <div>{order.DeliveryAddress.pinCode}</div>
                        </td>

                        <td className="text-center">{order.productQuantity}</td>

                        <td className="text-center font-semibold">
                          {" "}
                          &#8377;{order.orderAmount}
                        </td>

                        <td className="bg-gray-100 rounded-t-xl w-52 text-center ">
                          {formatter.format(Date.parse(order.createdAt))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        )}

        <div className="m-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className=" items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-600  mt-6 p-2 text-x font-bold  text-white shadow-sm hover:bg-lime-700 hover:shadow-md hover:shadow-lime-400"
          >
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
}
