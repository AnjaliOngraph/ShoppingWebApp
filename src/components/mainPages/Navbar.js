import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();

  return (
    <Disclosure as="nav" className="bg-lime-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-lime-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Dropdown />
                  </div>
                </div>
              </div>
              <button
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-700"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/active-orders");
                }}
              >
                My Orders
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/product/cart");
                }}
                className="ml-3 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-700"
              >
                Cart
                <p className="color-black px-2">{props.length}</p>
              </button>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
