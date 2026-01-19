import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaSpinner, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import loginImg from '../../public/assests/login.jpg'

function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { emailOrUsername, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      // Redirect based on role
      if (user.role === 'author') {
        navigate('/IJPPI/author/dashboard');
      } else if (user.role === 'editor') {
        navigate('/IJPPI/editor/journal/pharma');
      } else if (user.role === 'reviewer') {
        navigate('/IJPPI/reviewer/journal/pharma');
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const userData = {
      emailOrUsername: emailOrUsername.trim(),
      password,
    };

    dispatch(login(userData));
  };
const navItems=[
  {
    name:'MaxoSmith Publications',
    link:'https://mspublication.com/'
  },

]
  return (
    <>
    <nav
          className={`relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[90px] w-full h-[70px] sm:h-[75px] md:h-[80px] lg:h-[85px] xl:h-[91px] flex items-center justify-between bg-white text-gray-900"}`}
        >
          <div 
            className="w-[180px] h-[38px] sm:w-[200px] sm:h-[42px] md:w-[220px] md:h-[47px] lg:w-[240px] lg:h-[52px] xl:w-[267px] xl:h-[57px] font-bold cursor-pointer"
            onClick={() => {navigate('/IJPPI')}}
          >
          <img src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767786487/mslogo_gqwxzo.png' className='w-full h-full object-contain'/>
          </div>
    
          <div className="hidden xl:flex items-center gap-4 lg:gap-5 xl:gap-6 2xl:gap-10">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <p
                  onClick={() => {window.open(item.link,'_blank')}}
                  className={`font-[500] text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px] hover:cursor-pointer hover:opacity-80 whitespace-nowrap transition-opacity pb-1
                  `}
                >
                  {item.name}
                </p>
              
              </div>
            ))}
          </div>
 
           
          
        
        </nav>
    <div className="min-h-screen h-screen flex items-center justify-center bg-gradient-to-br from-outlook-blue to-outlook-darkBlue overflow-hidden py-10">
      <div className='relative w-full h-full max-w-7xl  mx-auto flex items-center justify-center '>
        {/* Background Image - Hidden on mobile */}
        <div className='hidden lg:block absolute inset-0'>
          <img src={loginImg} className='w-full h-full object-cover rounded-lg' alt="Login background"/>
        </div>
        
        {/* Login Form Container */}
        <div className="relative z-10 w-full lg:w-[60%] lg:ml-auto border  h-full bg-white p-6 sm:p-8 md:p-10 lg:rounded-tl-[50px] lg:rounded-bl-[50px] rounded-l-lg shadow-2xl flex flex-col items-center justify-center overflow-y-auto">
          <div className='w-full max-w-md lg:max-w-lg'>
            <div className='mb-6 lg:mb-8'>
              <h3 className="font-sans font-semibold text-4xl sm:text-5xl lg:text-6xl">
                Sign-in 
              </h3>
            </div>
            
            <form className="space-y-4 sm:space-y-6" onSubmit={onSubmit}>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="emailOrUsername" className="sr-only">
                    Email or Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      id="emailOrUsername"
                      name="emailOrUsername"
                      type="text"
                      autoComplete="username"
                      required
                      value={emailOrUsername}
                      onChange={onChange}
                      className="appearance-none relative block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-outlook-blue focus:border-transparent text-sm sm:text-base"
                      placeholder="Email or Username"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={onChange}
                      className="appearance-none relative block w-full pl-10 pr-10 py-2.5 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-outlook-blue focus:border-transparent text-sm sm:text-base"
                      placeholder="Password"
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
                </div>
              
                <div className="flex items-center justify-end">
                  <Link
                    to="/IJPPI/forgot-password"
                    className="text-sm font-medium text-outlook-blue hover:text-outlook-darkBlue"
                  >
                    Forgot password?
                  </Link>
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
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/IJPPI/register"
                    className="font-medium text-outlook-blue hover:text-outlook-darkBlue"
                  >
                    Register as Author
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default Login;