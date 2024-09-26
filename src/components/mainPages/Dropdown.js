import "./dropdown.css";
import { useNavigate } from "react-router-dom";

export default function Dropdown() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="group inline-block">
        <button className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-700">
          <span className="pr-1 font-semibold flex-1">Categories</span>
        </button>
        <ul className="bg-white border rounded-lg transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-40 py-1 z-10">
          <li className="rounded-sm relative px-3 py-2 hover:bg-gray-100">
            <button className="w-full text-left flex items-center outline-none focus:outline-none">
              <span className="pr-1 flex-1">Edible oils and ghee </span>
            </button>
            <ul className="bg-white border rounded-lg absolute top-1 right-0 transition duration-150 ease-in-out origin-top-left min-w-32">
              <li className="px-3 py-1 hover:bg-gray-100">
                <a
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/subcategory/products/637f45b16d3cbb4fa25b72d7");
                  }}
                >
                  Oil
                </a>
              </li>
              <li className="px-3 py-1 hover:bg-gray-100">
                <a
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/subcategory/products/637f45be6d3cbb4fa25b72d9");
                  }}
                >
                  Ghee
                </a>
              </li>
            </ul>
          </li>
          <li className="rounded-sm relative px-3 py-2 hover:bg-gray-100">
            <button className="w-full text-left flex items-center outline-none focus:outline-none">
              <span className="pr-1 flex-1">Coffee and Tea</span>
            </button>
            <ul className="bg-white border rounded-lg absolute bottom-1 right-0 transition duration-150 ease-in-out origin-top-left min-w-32">
              <li className="px-3 py-1 hover:bg-gray-100">
                <a
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/subcategory/products/637f45e86d3cbb4fa25b72db");
                  }}
                >
                  Coffee
                </a>
              </li>
              <li className="px-3 py-1 hover:bg-gray-100">
                <a
                className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/subcategory/products/637f45f06d3cbb4fa25b72dd");
                  }}
                >
                  Tea
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
