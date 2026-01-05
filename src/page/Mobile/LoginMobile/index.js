import { useState, useEffect} from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from "react-router-dom";
import { useMedia } from "use-media";
import Swal from 'sweetalert2';
import { TextFields } from "../../../component/molecule/TextField";
import { Modal } from "react-bootstrap";
import { ikonsawit, google } from "../../../assets";
import { auth, loginWithGoogle, login, resetPassword } from "../../../config/services";
import "./loginMobile.css"

const LoginMobile = () => {
  const [ loading, setLoading ]     = useState(false);
  const [modal, setModal]           = useState(false)
  const [show, setShow]             = useState(false);
  const [emailReset, setEmailReset] = useState("");
  const isMobile                    = useMedia({ minWidth: "768px" })
  const history                     = useHistory();
  const handleClose                 = () => setShow(false);
  const handleShow                  = () => setShow(true);

  //form validation
  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
  })

  // desktop responsive
  useEffect(() => {
    if (window.innerWidth > 767) return history.replace("/login")
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
      alert("Error!");
    }
    setLoading(false);
  }

  // forgot password
  async function handleResetPassword() {
    setLoading(true);
    try {
      await resetPassword(emailReset);
      Swal.fire({
        icon: 'success',
        title: 'reset password success',
        text: 'please check your email!'
      })
      // console.log(emailReset, 'mhgf')
    } catch {
      alert("Error!"); 
    }
    setLoading(false);
  }

return (
  <>
    <div className="bg-map-signup-mobile">
      <div className="d-flex justify-content-around ">
        <p className="account-signup-mobile">Don't have an Account ?</p>
        <Link to="/register">
          <p className="create-account-signup-mobile">Create Account</p>
        </Link>
      </div>
      <Link to="/" className="d-flex justify-content-center">
        <img alt="logo Traceability ISPO"
          className="logo-label-maps-signup-mobile"
          src={ikonsawit}
        />
      </Link>
      <div className="d-flex justify-content-center">
        <div className="wrap-signup-mobile">
          <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validate}
          onSubmit={async values => {
            // console.log(values.email, 'valllll')
            setLoading(true);
            // await login(values.email, values.password)
            await login(values.email, values.password);
            if(auth.currentUser.emailVerified == true) {
              history.push("/company")
            } else {
              Swal.fire({
                icon: 'error',
                text: 'please check your email to verify',
              })
              history.push("/login")
            }
          }}
          
        >
          {formik => (
            <div >
              <p className="title-signup-page-mobile" >Sign In to Traceability ISPO</p>
              <div className="d-flex justify-content-center">
                <div onClick={handleLoginWithGoogle} disabled={loading} className="row signupGoogle-mobile d-flex justify-content-center">
                  <img className="logo-google-mobile" src={google}/>
                  <p className="title-signupGoogle-mobile">Sign In with Google</p>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-3 line-signup-mobile"></div>
                <p className="col-6 title-option-signup-mobile text-center ">or Sign In with Email</p>
                <div className="col-3 line-signup-mobile"></div>
              </div>
              <Form >
                <TextFields label="Email Address" name="email" type="email" placeholder="Enter your email"/>
                <div className="d-flex justify-content-between">
                  <label>Password</label>
                  <label onClick={handleShow} className="text-primary">Forgot Password ?</label>
                </div>
                <TextFields name="password" type="password" placeholder="Enter your password"/>
                <button 
                  className="btn-signup-mobile" 
                  type="submit">
                    Sign In
                </button>
              </Form>
              <Modal
                show={show}
                onHide={handleClose}
                animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title className="title-modal-forgot-pass-mobile">Forgot Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                  <label className="label-input">Email Address</label>
                    <input
                      className={`text-field`}
                      onChange={(e) => setEmailReset(e.target.value)}
                      autoComplete="off"
                    />
                    <button 
                      onClick={handleResetPassword}
                      className="btn-signup-mobile" 
                      type="submit">
                        Submit
                    </button>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          )}
          </Formik>
      </div>
      </div>
    </div>
  </>
)
}

export default LoginMobile