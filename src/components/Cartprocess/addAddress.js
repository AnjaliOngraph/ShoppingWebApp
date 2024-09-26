import { Formik } from "formik";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
// import Address from "./address";
// import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  mobileNo: "",
  email: "",
  pinCode: "",
  address: "",
  city: "",
};

const validate = (values) => {
  let errors = {};
  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexPhoneNumber = /^[1-9]\d{2}\d{3}\d{4}/;
  const regexPinCode = /^[1-9][0-9]{5}$/;

  if (!values.name) {
    errors.name = "First name is required";
  }

  if (!values.mobileNo) {
    errors.mobileNo = "Phone number is required";
  } else if (!regexPhoneNumber.test(values.mobileNo)) {
    errors.mobileNo = "invalid format";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex_email.test(values.email)) {
    errors.email = "Invalid Email";
  }

  if (!values.pinCode) {
    errors.pinCode = "Pincode is required";
  } else if (!regexPinCode.test(values.pinCode)) {
    errors.pinCode = "Invalid format";
  }

  if (!values.address) {
    errors.address = "Address is required";
  }

  if (!values.city) {
    errors.city = "City is required";
  }

  return errors;
};

export default function DeliveryAddressForm() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState(
    !localStorage.getItem("userAddresses")
      ? []
      : JSON.parse(localStorage.getItem("userAddresses"))
  );

  const DeliveryAddress = async (values, { resetForm }) => {
    let add = [];
    const { name, mobileNo, email, pinCode, address, city } = values;
    try {
      const res = await fetch("/newAddress", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mobileNo,
          email,
          pinCode,
          address,
          city,
          UserId: localStorage.getItem("userId"),
        }),
      });
      const details = await res.json();
      console.log(details, "details");
      add.push(details);

      setAddresses([...addresses, add]);

      resetForm({ values: "" });

      if (res.status === 400) {
        console.log("Please fill all details. ");
      }
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  console.log(addresses, "its address here");
  localStorage.setItem("userAddresses", JSON.stringify(addresses));

 
  
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={DeliveryAddress}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          handleBlur,
          touched,
          resetForm
        } = formik;
        return (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden pt-4 px-4 pb-20 sm:block sm:p-0 shadow sm:rounded-md">
                <div className="inline-flex">
                  <div className="m-6 font-bold text-xl">
                    Add Delivery Address
                  </div>
                </div>

                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      />
                      {errors.name && touched.name && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="mobileNo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="mobileNo"
                        id="mobileNo"
                        value={values.mobileNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      />
                      {errors.mobileNo && touched.mobileNo && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.mobileNo}
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        autoComplete="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      />
                      {errors.email && touched.email && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="street-address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      />
                      {errors.address && touched.address && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.address}
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="address-level1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      />
                      {errors.city && touched.city && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.city}
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        PinCode
                      </label>
                      <input
                        type="text"
                        name="pinCode"
                        id="pinCode"
                        value={values.pinCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="postal-code"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      />
                      {errors.pinCode && touched.pinCode && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.pinCode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" py-3 sm:px-6">
                  <button
                    className=" items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-700 px-4 py-1 font-bold text-x  text-white shadow-sm hover:bg-lime-800 hover:shadow-md hover:shadow-lime-500"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    type="reset"
                    className=" ml-2 items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-700 px-4 py-1 font-bold text-x  text-white shadow-sm hover:bg-lime-800 hover:shadow-md hover:shadow-lime-500"
                    onClick={resetForm}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </form>
            <ToastContainer />
          </div>
        );
      }}
    </Formik>
  );
}
