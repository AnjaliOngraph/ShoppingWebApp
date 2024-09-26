import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useNavigate } from "react-router-dom";

if (typeof window !== "undefined") {
  injectStyle();
}

const initialValues = {
  email: "",
  password: "",
};

const validate = (values) => {
  let errors = {};
  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regex_password =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

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

  return errors;
};

export default function Signin() {
const navigate = useNavigate();

  const PostData = async (values) => {
    const { email, password } = values;

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      console.log(data,"data");

      if (res.status === 200) {
        console.log("login successfull");
        localStorage.setItem("userId", data.user._id);
        navigate("/product/cart")

      } else if (res.status === 401) {
        console.log("wrong password");
        toast.error("wrong password!", {
          position: "top-center",
        });
      }else if (res.status === 400) {
        console.log("user not found");
        toast.error("user not found", {
          position: "top-center",
        });
      }
       else {
        console.log("Invalid credentials");
        toast.error("Invalid credentials", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 my-20">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={PostData}
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
                <div>
                  <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
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
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm my-4"
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
                          autoComplete="current-password"
                          required
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm my-4"
                          placeholder="Password"
                        />
                        {errors.password && touched.password && (
                            <span className="text-red-600 text-xs mt-2">
                              {errors.password}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <a
                          className="font-medium text-lime-600 hover:text-lime-500"
                        >
                          Forgot your password?
                        </a>
                      </div>

                      <div className="text-sm">
                        <a
                         onClick={(e)=>{e.preventDefault();
                        navigate("/signup")}}
                          className="font-medium text-lime-600 hover:text-lime-500 cursor-pointer"
                        >
                         Don't have an account? Signup 
                        </a>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-lime-600 py-2 px-4 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                      >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <LockClosedIcon
                            className="h-5 w-5 text-lime-500 group-hover:text-lime-400"
                            aria-hidden="true"
                          />
                        </span>
                        Sign in
                      </button>
                    </div>
                  </form>
                  <ToastContainer />
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
