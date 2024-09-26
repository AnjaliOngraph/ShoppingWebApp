import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

import bgimage from "../images/shopping-cart-grocery-store.jpg";
import logo from "../images/grocessies_logo.jpg";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <Popover className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <span className="sr-only">Your Company</span>
              <img className="h-10 w-auto sm:h-16" src={logo} alt="" />
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signin");
                }}
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                Sign in
              </a>
              <a
                
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-600 px-4 py-2 cursor-pointer  text-base font-medium text-white shadow-sm hover:bg-lime-700"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            indigo
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="space-y-6 py-6 px-5">
                <div>
                  <a
                    href="/signup"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-700"
                  >
                    Sign up
                  </a>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{" "}
                    <a
                      href="/signin"
                      className="text-lime-600 hover:text-lime-700"
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
        <Navbar />
      </Popover>
      <img className="bg-local w-screen h-screen" src={bgimage} alt="" />
    </div>
  );
}
