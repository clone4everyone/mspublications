import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword, reset } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { FaEnvelope, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import loginImg from '../../public/assests/login.jpg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Password reset link sent to your email!');
      setEmail('');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    dispatch(forgotPassword(email.trim().toLowerCase()));
  };

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-gradient-to-br from-outlook-blue to-outlook-darkBlue overflow-hidden py-10">
      <div className='relative w-full h-full max-w-7xl mx-auto flex items-center justify-center'>
        {/* Background Image - Hidden on mobile */}
        <div className='hidden lg:block absolute inset-0'>
          <img src={loginImg} className='w-full h-full object-cover rounded-lg' alt="Forgot password background"/>
        </div>
        
        {/* Forgot Password Form Container */}
        <div className="relative z-10 w-full lg:w-[60%] lg:ml-auto border h-full bg-white p-6 sm:p-8 md:p-10 lg:rounded-tl-[50px] lg:rounded-bl-[50px] rounded-l-lg shadow-2xl flex flex-col items-center justify-center overflow-y-auto">
          <div className='w-full max-w-md lg:max-w-lg'>
            <div className='mb-6 lg:mb-8'>
              <h3 className="font-sans font-semibold text-4xl sm:text-5xl lg:text-6xl">
                Forgot Password
              </h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>
            
            <form className="space-y-4 sm:space-y-6" onSubmit={onSubmit}>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-outlook-blue focus:border-transparent text-sm sm:text-base"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-outlook-blue hover:bg-outlook-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-outlook-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link
                  to="/IJPPI/login"
                  className="flex items-center font-medium text-outlook-blue hover:text-outlook-darkBlue"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Login
                </Link>
                <Link
                  to="/IJPPI/register"
                  className="font-medium text-outlook-blue hover:text-outlook-darkBlue"
                >
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;