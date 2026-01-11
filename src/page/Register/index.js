import { useState, useEffect } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from "react-router-dom";
import { useMedia } from "use-media";
import Swal from 'sweetalert2';
import { TextFields } from "../../component/molecule/TextField";
import {  signup, loginWithGoogle, emailVerification } from "../../config/services";
import { ikonsawit, google } from "../../assets";
import "./register.css";


const Register = () => {
  const [ loading, setLoading ] = useState(false);
  const [modal, setModal]       = useState(false);
  const mobileView              = useMedia({ maxWidth: "767px" });
  const [data, setData]         = useState("");
  const history                 = useHistory();

  //form validation
  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  })

  //mobile responsive
  useEffect(() => {
    if (window.innerWidth <= 767) return history.replace("/m/register")
  },[])

  //mobile responsive
  useEffect(() => {
    if (!modal) setModal(mobileView)
  }, [mobileView])

  //sign in / sign up with google 
  async function handleLoginWithGoogle(){
    setLoading(true);
    try {
      await loginWithGoogle();
      history.push("/company")
    } catch {
      console.log("Error!");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="bg-map-signup">
        <div className="d-flex justify-content-around">
          <Link to="/">
            <img alt="logo Traceability ISPO"
              className="logo-label-maps-signup"
              src={ikonsawit}
            />
          </Link>
          <div className="row">
            <p className="account-signup">Don't have an Account ?</p>
            <Link to="/login">
              <p className="create-account-signup">Sign In</p>
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="wrap-signup">
            <Formik
              initialValues={{
                email: '',
                password: '',
                confirmPassword: ''
              }}
              validationSchema={validate}
              onSubmit={async values => {
                setLoading(true);
                setData(values)
                await signup(values.email, values.confirmPassword)
                await emailVerification()
                Swal.fire({
                  icon: 'success',
                  title: 'register success',
                  text: 'please check your email!'
                })
              }}
            >
              {formik => (
                <div style={{marginTop: -10}}>
                  <p className="title-signup-page" >Sign Up to Traceability ISPO</p>
                  <div className="d-flex justify-content-center">
                    <div onClick={handleLoginWithGoogle} disabled={loading} className="row signupGoogle d-flex justify-content-center">
                      <img className="logo-google-signup" src={google}/>
                      <p className="title-signupGoogle">Sign Up with Google</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="col-3 line-signup"></div>
                    <p className="col-6 title-option-signup text-center ">or Sign Up with Email</p>
                    <div className="col-3 line-signup"></div>
                  </div>
                  <Form >
                    <TextFields label="Email Address" name="email" type="email" placeholder="Enter your email"/>
                    <TextFields label="Password" name="password" type="password" placeholder="Enter your password"/>
                    <TextFields label="Confirm Password" name="confirmPassword" type="password" placeholder="Enter your confirm password"/>
                    <button 
                      className="btn-signup" 
                      type="submit">
                        Sign Up
                    </button>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register