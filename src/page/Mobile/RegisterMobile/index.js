import { useState, useEffect } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from "react-router-dom";
import { useMedia } from "use-media";
import Swal from 'sweetalert2';
import { TextFields } from "../../../component/molecule/TextField";
import { labelmapLogo, google, } from "../../../assets";
import { loginWithGoogle, signup, emailVerification } from "../../../config/services";
import "./registerMobile.css"

const RegisterMobile = () => {

  const [ loading, setLoading ] = useState(false);
  const [modal, setModal]       = useState(false);
  const isMobile                = useMedia({ minWidth: "768px" })
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

  // desktop responsive
  useEffect(() => {
    if (window.innerWidth > 767) return history.replace("/register")
  }, [])

  //desktop responsive
  useEffect(() => {
    if (!modal) setModal(isMobile)
  }, [isMobile])


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
    <div className="bg-map-signup-mobile">
      <div className="d-flex justify-content-around ">
        <p className="account-signup-mobile">Don't have an Account ?</p>
        <Link to="/login">
          <p className="create-account-signup-mobile">Sign In</p>
        </Link>
      </div>
      <Link to="/" className="d-flex justify-content-center">
        <img alt="logo label maps"
          className="logo-label-maps-signup-mobile"
          src={labelmapLogo}
        />
      </Link>
      <div className="d-flex justify-content-center">
        <div className="wrap-signup-mobile">
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={validate}
            onSubmit={async values => {
              setLoading(true);
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
              <div >
                <p className="title-signup-page-mobile" >Sign Up to Label Maps</p>
                <div className="d-flex justify-content-center">
                  <div onClick={handleLoginWithGoogle} disabled={loading} className="row signupGoogle-mobile d-flex justify-content-center">
                    <img className="logo-google-mobile" src={google}/>
                    <p className="title-signupGoogle-mobile">Sign Up with Google</p>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="col-3 line-signup-mobile"></div>
                  <p className="col-6 title-option-signup-mobile text-center ">or Sign Up with Email</p>
                  <div className="col-3 line-signup-mobile"></div>
                </div>
                <Form >
                  <TextFields label="Email Address" name="email" type="email" placeholder="Enter your email"/>
                  <TextFields label="Password" name="password" type="password" placeholder="Enter your password"/>
                  <TextFields label="Confirm Password" name="confirmPassword" type="password" placeholder="Enter your confirm password"/>
                  <button 
                    className="btn-signup-mobile" 
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

export default RegisterMobile