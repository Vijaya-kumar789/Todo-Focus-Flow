import React, { useContext } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import userServices from "../../Services/userServies";
import { loginSchema } from "../../FormikSchema/schema";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
const Login = () => {

  const {dispatch} = useContext(AuthContext)

  const navigate = useNavigate();

  const onSubmit = (values,actions) => {

 dispatch({type:'LOGIN_START'})
    // perform user login
    try {

      userServices
      .login(values)
      .then((res) => {
        dispatch({type:'LOGIN_SUCCESS', payload:res.data.data});
        toast.success(res.data.message);
        // clear the form
        
        actions.resetForm()
        navigate("/");

      })
      .catch((error) => {
        toast.error(error.response.data.message);
        
      });
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
   
  };

  const { values, handleBlur, handleChange, touched, errors, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
    validationSchema:loginSchema,
      onSubmit,
    });

    
  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col d-flex justify-content-center align-items-center">
            <div className="login-box">
              <p>Login</p>
              <form onSubmit={handleSubmit}>
                <div className="user-box">
                  <input
                    required
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className={errors.email && touched.email ? 'email-error':""}
                  />
                 {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                  <label>Email</label>
                </div>
                <div className="user-box">
                  <input
                    required
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    type="password"
                    className={errors.password && touched.password ? 'password-error':""}
                />
                 {errors.password && touched.password && <p className='error'>{errors.password}</p>}
                  <label>Password</label>
                </div>
                <button type="submit" className="btn-31">
              <span className="text-container">
                <span className="text">Login</span>
              </span>
            </button>
              </form>
              <p className="mt-3">
                Don't have an account?{" "}
                <Link to="/register" className="a2 ">
                  Sign up!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
