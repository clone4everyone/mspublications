import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { resetPassword, reset } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { FaLock, FaSpinner, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import loginImg from '../../public/assests/login.jpg';

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false
  });

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState(null);

  const { password, confirmPassword } = formData;
  const { token } = useParams();
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
      toast.success('Password reset successful! Please login with your new password.');
      navigate('/IJPPI/login');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  // Validate password requirements
  useEffect(() => {
    setPasswordValidation({
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    });
  }, [password]);

  // Check if passwords match
  useEffect(() => {
    if (confirmPassword.length > 0) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(null);
    }
  }, [password, confirmPassword]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const isPasswordValid = () => {
    return Object.values(passwordValidation).every((value) => value === true);
  };

  const isFormValid = () => {
    return isPasswordValid() && passwordsMatch === true;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setTouched({
      password: true,
      confirmPassword: true
    });

    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isPasswordValid()) {
      toast.error('Please meet all password requirements');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    dispatch(resetPassword({ token, password }));
  };

  const RequirementItem = ({ met, text }) => (
    <div className={`flex items-center space-x-2 text-sm ${met ? 'text-green-600' : 'text-gray-500'}`}>
      {met ? (
        <FaCheck className="w-4 h-4" />
      ) : (
        <FaTimes className="w-4 h-4" />
      )}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-gradient-to-br from-outlook-blue to-outlook-darkBlue overflow-hidden py-10">
      <div className='relative w-full h-full max-w-7xl mx-auto flex items-center justify-center'>
        {/* Background Image - Hidden on mobile */}
        <div className='hidden lg:block absolute inset-0'>
          <img src={loginImg} className='w-full h-full object-cover rounded-lg' alt="Reset password background"/>
        </div>
        
        {/* Reset Password Form Container */}
        <div className="relative z-10 w-full lg:w-[60%] lg:ml-auto border h-full bg-white p-6 sm:p-8 md:p-10 lg:rounded-tl-[50px] lg:rounded-bl-[50px] rounded-l-lg shadow-2xl flex flex-col items-center justify-center overflow-y-auto">
          <div className='w-full max-w-md lg:max-w-lg'>
            <div className='mb-6 lg:mb-8'>
              <h3 className="font-sans font-semibold text-4xl sm:text-5xl lg:text-6xl">
                Reset Password
              </h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Enter your new password below.
              </p>
            </div>
            
            <form className="space-y-4 sm:space-y-6" onSubmit={onSubmit}>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={onChange}
                      onFocus={() => setShowPasswordRequirements(true)}
                      onBlur={() => onBlur('password')}
                      className="appearance-none relative block w-full pl-10 pr-10 py-2.5 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-outlook-blue focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  
                  {showPasswordRequirements && password.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Password Requirements:</p>
                      <RequirementItem 
                        met={passwordValidation.minLength} 
                        text="At least 8 characters" 
                      />
                      <RequirementItem 
                        met={passwordValidation.hasUpperCase} 
                        text="One uppercase letter (A-Z)" 
                      />
                      <RequirementItem 
                        met={passwordValidation.hasLowerCase} 
                        text="One lowercase letter (a-z)" 
                      />
                      <RequirementItem 
                        met={passwordValidation.hasNumber} 
                        text="One number (0-9)" 
                      />
                      <RequirementItem 
                        met={passwordValidation.hasSpecialChar} 
                        text="One special character (!@#$%)" 
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={onChange}
                      onBlur={() => onBlur('confirmPassword')}
                      className={`appearance-none relative block w-full pl-10 pr-10 py-2.5 sm:py-3 border rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent text-sm sm:text-base ${
                        passwordsMatch === null || !touched.confirmPassword
                          ? 'border-gray-300 focus:ring-outlook-blue'
                          : passwordsMatch
                          ? 'border-green-500 focus:ring-green-500'
                          : 'border-red-500 focus:ring-red-500'
                      }`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                    {passwordsMatch !== null && touched.confirmPassword && (
                      <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                        {passwordsMatch ? (
                          <FaCheck className="text-green-500 w-4 h-4" />
                        ) : (
                          <FaTimes className="text-red-500 w-4 h-4" />
                        )}
                      </div>
                    )}
                  </div>
                  {touched.confirmPassword && passwordsMatch === false && (
                    <p className="mt-2 text-sm text-red-600">
                      Passwords do not match
                    </p>
                  )}
                  {touched.confirmPassword && passwordsMatch === true && (
                    <p className="mt-2 text-sm text-green-600">
                      Passwords match!
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid()}
                  className="group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-outlook-blue hover:bg-outlook-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-outlook-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>

              <div className="text-center">
                <Link
                  to="/IJPPI/login"
                  className="text-sm font-medium text-outlook-blue hover:text-outlook-darkBlue"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;