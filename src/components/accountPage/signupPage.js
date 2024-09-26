import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  cpassword: "",
};

const validate = (values) => {
  let errors = {};
  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regex_password =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!values.first_name) {
    errors.first_name = "First name is required";
  }

  if (!values.last_name) {
    errors.last_name = "Last name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex_email.test(values.email)) {
    errors.email = "Invalid Email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (!regex_password.test(values.password)) {
    errors.password =
      "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number";
  }

  if (!values.cpassword) {
    errors.cpassword = "Password is required";
  } else if (!regex_password.test(values.cpassword)) {
    errors.cpassword =
      "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password doesnot match";
  }

  return errors;
};

export default function Signup() {
  const navigate = useNavigate();

  const submitForm = async (values) => {
    const { first_name, last_name, email, password, cpassword } = values;

    try {
      const res = await fetch("/signup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          cpassword,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (res.status === 400) {
        console.log("Please fill all details. ");
      } else if (res.status === 401) {
        console.log("Account for this email already exists");
      } else {
        localStorage.setItem("userId", data._id);
        console.log("registration successfull");
        navigate("/product/cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8  ">
        <div className="w-full max-w-md space-y-8 ">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Signup
            </h2>
          </div>

          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
          >
            {(formik) => {
              const {
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
              } = formik;
              return (
                <form
                  className="mt-8 space-y-8 "
                  action="#"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <div className="-space-y-px rounded-md">
                    <div>
                      <label htmlFor="first_name" className="sr-only ">
                        First name
                      </label>
                      <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        autoComplete="first_name"
                        required
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-600 focus:outline-none focus:ring-lime-600  sm:text-sm my-4  shadow-sm "
                        placeholder="Enter your first name"
                      />
                      {errors.first_name && touched.first_name && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.first_name}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="last_name" className="sr-only">
                        Last name
                      </label>
                      <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        autoComplete="last_name"
                        required
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-600 focus:outline-none focus:ring-lime-600 sm:text-sm my-4"
                        placeholder="Enter your last name"
                      />
                      {errors.last_name && touched.last_name && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.last_name}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-600 focus:outline-none focus:ring-lime-600 sm:text-sm my-4"
                        placeholder="Email address"
                      />
                      {errors.email && touched.email && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-600 focus:outline-none focus:ring-lime-600 sm:text-sm my-4"
                        placeholder="Password"
                      />
                      {errors.password && touched.password && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.password}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="cpassword" className="sr-only">
                        Confirm Password
                      </label>
                      <input
                        id="cpassword"
                        name="cpassword"
                        type="password"
                        required
                        value={values.cpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-600 focus:outline-none focus:ring-lime-600 sm:text-sm my-4"
                        placeholder="Confirm Password"
                      />
                      {errors.cpassword && touched.cpassword && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.cpassword}
                        </span>
                      )}
                    </div>
                    <div className="text-sm">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/signin");
                        }}
                        className="font-medium cursor-pointer text-lime-600 hover:text-lime-500"
                      >
                        Already have an account?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-lime-600 py-2 px-4 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
