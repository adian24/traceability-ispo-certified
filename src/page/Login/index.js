import { useState, useEffect } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from "react-router-dom";
import { useMedia } from "use-media";
import Swal from 'sweetalert2';
import { Button } from "../../component/ui/button";
import { Input } from "../../component/ui/input";
import { Label } from "../../component/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../component/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../component/ui/dialog";
import { Separator } from "../../component/ui/separator";
import { ikonsawit, google } from "../../assets";
import { auth, loginWithGoogle, login, resetPassword } from "../../config/services";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const mobileView = useMedia({ maxWidth: "767px" })
  const history = useHistory();

  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })

  // Mobile redirect
  useEffect(() => {
    if (window.innerWidth <= 767) {
      history.replace("/m/login")
    }
  }, [history])

  // Google login handler
  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await loginWithGoogle()
      history.push("/company")
    } catch (error) {
      console.error("Google login error:", error)
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Unable to sign in with Google. Please try again.',
      })
    }
    setLoading(false)
  }

  // Email/password login handler
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setLoading(true)
      await login(values.email, values.password)

      if (auth.currentUser.emailVerified) {
        history.push("/company")
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Email Not Verified',
          text: 'Please check your email to verify your account before signing in.',
        })
        history.push("/login")
      }
    } catch (error) {
      console.error("Login error:", error)
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password. Please try again.',
      })
    }
    setLoading(false)
    setSubmitting(false)
  }

  // Password reset handler
  const handlePasswordReset = async () => {
    if (!resetEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Email Required',
        text: 'Please enter your email address.',
      })
      return
    }

    setLoading(true)
    try {
      await resetPassword(resetEmail)
      Swal.fire({
        icon: 'success',
        title: 'Reset Link Sent',
        text: 'Please check your email for password reset instructions.',
      })
      setShowResetDialog(false)
      setResetEmail("")
    } catch (error) {
      console.error("Reset error:", error)
      Swal.fire({
        icon: 'error',
        title: 'Reset Failed',
        text: 'Unable to send reset link. Please check your email and try again.',
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen w-full bg-cover bg-center relative flex flex-col"
         style={{ backgroundImage: `url(${require("../../assets/images/MapsLogin.png")})` }}>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-12 py-6">
        <Link to="/" className="flex items-center">
          <img
            alt="Traceability ISPO"
            className="h-10 w-auto transition-transform hover:scale-105"
            src={ikonsawit}
          />
        </Link>
        <div className="flex items-center gap-3">
          <p className="text-white/90 text-sm font-medium">Don't have an account?</p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-white text-slate-900 hover:bg-white/90 px-5 py-2.5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-2xl bg-white">
            <CardHeader className="space-y-2 pb-6 text-center">
              <CardTitle className="text-3xl font-bold text-slate-900">
                Welcome back
              </CardTitle>
              <CardDescription className="text-base text-slate-600">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="space-y-6">
                    {/* Google Sign In Button */}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 gap-3 text-base"
                      onClick={handleGoogleLogin}
                      disabled={loading}
                    >
                      <img src={google} alt="Google" className="h-5 w-5" />
                      <span className="font-medium">Continue with Google</span>
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="bg-slate-200" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-3 text-slate-500 font-semibold">
                          Or continue with email
                        </span>
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 text-sm font-semibold">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="!pl-[2ex] h-12 border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                          
                          disabled={loading}
                        />
                      </div>
                      {errors.email && touched.email && (
                        <p className="text-sm text-red-500 font-medium flex items-center gap-1.5 mt-2">
                          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-slate-700 text-sm font-semibold">
                          Password
                        </Label>
                        <button
                          type="button"
                          onClick={() => setShowResetDialog(true)}
                          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          className="!pl-[2ex] h-12 border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                          
                          disabled={loading}
                        />
                      </div>
                      {errors.password && touched.password && (
                        <p className="text-sm text-red-500 font-medium flex items-center gap-1.5 mt-2">
                          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Sign In Button */}
                    <Button
                      type="submit"
                      className="!mt-[2ex] w-full h-12 bg-slate-900 hover:bg-slate-800 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                      disabled={loading || isSubmitting}
                    >
                      {loading || isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </span>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>

              {/* Sign Up Link */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-center text-sm text-slate-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-semibold text-slate-900 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Password Reset Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Reset Password</DialogTitle>
            <DialogDescription className="text-base">
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="reset-email" className="text-sm font-semibold">Email Address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="!pl-[2ex] h-12 text-base"
                  
                  disabled={loading}
                />
              </div>
            </div>
            <DialogFooter className="gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-11 text-base"
                onClick={() => {
                  setShowResetDialog(false)
                  setResetEmail("")
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1 h-11 bg-slate-900 hover:bg-slate-800 text-base font-semibold"
                onClick={handlePasswordReset}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Login
