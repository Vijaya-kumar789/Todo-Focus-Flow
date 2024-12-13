import React, { useContext } from "react";
import "./login.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import userServices from "../../Services/userServies";
import { registerSchema } from "../../FormikSchema/schema";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext)

  const onSubmit = (values, actions) => {
    try {
      
      userServices
      .register(values)
      .then((response) => {
        dispatch({type:"REGISTER_SUCCESS"})
          toast.success('Registered Successfully')
        // clear the form
        actions.resetForm();
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      });

    } catch (error) {
      toast.error(error.message)
    }
   
  };

  const { values, handleBlur, handleChange, touched, errors, handleSubmit } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        password: "",
      },
    validationSchema:registerSchema,

      onSubmit,
    });

  return (
    <div className="container">
      <div className="row ">
        <div className="col d-flex justify-content-center align-items-center">
          <div className="login-box">
            <p>Register</p>
            <form onSubmit={handleSubmit}>
              <div className="user-box">
                <input
                  required
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  className={errors.userName && touched.userName ? 'name-error':""}
                />
                 {errors.userName && touched.userName && <p className='error'>{errors.userName}</p>}

                <label>Name</label>
              </div>
              <div className="user-box">
                <input
                  required
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? 'email-error':""}
                  type="text"
                />
                 {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                <label>Email</label>
              </div>
              <div className="user-box">
                <input
                  required
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  className={errors.password && touched.password ? 'password-error':""}
                />
                 {errors.password && touched.password && <p className='error'>{errors.password}</p>}
                <label>Password</label>
              </div>
              <button className="btn-31">
                <span className="text-container">
                  <span className="text">Register</span>
                </span>
              </button>
            </form>
            <p className="mt-3">
              Do you have an account?{" "}
              <Link to="/login" className="a2">
                Sign in!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
