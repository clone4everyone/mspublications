import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import loginImg from '../../public/assests/login.jpg'
import { FaUser, FaEnvelope, FaCheckCircle, FaLock, FaUniversity, FaSpinner, FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

import api from '../utils/api';

function Register() {
  const [formData, setFormData] = useState({
    prefix: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    affiliation: '',
      username: '',
  });
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  
  const [validation, setValidation] = useState({
    firstName: { isValid: null, message: '' },
    lastName: { isValid: null, message: '' },
    email: { isValid: null, message: '' },
    affiliation: { isValid: null, message: '' },
     username: { isValid: null, message: '' },
  });

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState(null);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [touched, setTouched] = useState({});

  const { prefix, firstName, lastName, username, email, password, password2, affiliation } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
useEffect(() => {
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  document.addEventListener('contextmenu', handleContextMenu);

  return () => {
    document.removeEventListener('contextmenu', handleContextMenu);
  };
}, []);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/IJPPI/author/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Validate first name
  useEffect(() => {
    if (firstName.length === 0) {
      setValidation(prev => ({
        ...prev,
        firstName: { isValid: null, message: '' }
      }));
      return;
    }

    const nameRegex = /^[a-zA-Z\s'-]+$/;
    const hasNumber = /\d/.test(firstName);
    const hasSpecialChar = /[^a-zA-Z\s'-]/.test(firstName);
    const isValidLength = firstName.trim().length >= 2 && firstName.trim().length <= 50;
    const startsWithLetter = /^[a-zA-Z]/.test(firstName);

    let isValid = true;
    let message = '';

    if (hasNumber) {
      isValid = false;
      message = 'Name cannot contain numbers';
    } else if (hasSpecialChar) {
      isValid = false;
      message = 'Only letters, spaces, hyphens and apostrophes allowed';
    } else if (!startsWithLetter) {
      isValid = false;
      message = 'Name must start with a letter';
    } else if (!isValidLength) {
      isValid = false;
      message = firstName.trim().length < 2 ? 'Name must be at least 2 characters' : 'Name must not exceed 50 characters';
    } else if (!nameRegex.test(firstName)) {
      isValid = false;
      message = 'Please enter a valid name';
    }

    setValidation(prev => ({
      ...prev,
      firstName: { isValid, message: isValid ? 'Valid name' : message }
    }));
  }, [firstName]);

  // Validate last name
  useEffect(() => {
    if (lastName.length === 0) {
      setValidation(prev => ({
        ...prev,
        lastName: { isValid: null, message: '' }
      }));
      return;
    }

    const nameRegex = /^[a-zA-Z\s'-]+$/;
    const hasNumber = /\d/.test(lastName);
    const hasSpecialChar = /[^a-zA-Z\s'-]/.test(lastName);
    const isValidLength = lastName.trim().length >= 2 && lastName.trim().length <= 50;
    const startsWithLetter = /^[a-zA-Z]/.test(lastName);

    let isValid = true;
    let message = '';

    if (hasNumber) {
      isValid = false;
      message = 'Name cannot contain numbers';
    } else if (hasSpecialChar) {
      isValid = false;
      message = 'Only letters, spaces, hyphens and apostrophes allowed';
    } else if (!startsWithLetter) {
      isValid = false;
      message = 'Name must start with a letter';
    } else if (!isValidLength) {
      isValid = false;
      message = lastName.trim().length < 2 ? 'Name must be at least 2 characters' : 'Name must not exceed 50 characters';
    } else if (!nameRegex.test(lastName)) {
      isValid = false;
      message = 'Please enter a valid name';
    }

    setValidation(prev => ({
      ...prev,
      lastName: { isValid, message: isValid ? 'Valid name' : message }
    }));
  }, [lastName]);

  useEffect(() => {
  if (username.length === 0) {
    setValidation(prev => ({
      ...prev,
      username: { isValid: null, message: '' }
    }));
    return;
  }

  const usernameRegex = /^[a-zA-Z0-9._-]+$/;
  const startsWithLetter = /^[a-zA-Z]/.test(username);
  const hasConsecutiveSpecialChars = /[._-]{2,}/.test(username);
  const endsWithSpecialChar = /[._-]$/.test(username);
  const isValidLength = username.length >= 3 && username.length <= 30;

  let isValid = true;
  let message = '';

  if (!isValidLength) {
    isValid = false;
    message = username.length < 3 ? 'Username must be at least 3 characters' : 'Username must not exceed 30 characters';
  } else if (!startsWithLetter) {
    isValid = false;
    message = 'Username must start with a letter';
  } else if (endsWithSpecialChar) {
    isValid = false;
    message = 'Username cannot end with a special character';
  } else if (hasConsecutiveSpecialChars) {
    isValid = false;
    message = 'No consecutive special characters allowed';
  } else if (!usernameRegex.test(username)) {
    isValid = false;
    message = 'Only letters, numbers, dots, hyphens and underscores allowed';
  }

  setValidation(prev => ({
    ...prev,
    username: { isValid, message: isValid ? 'Valid username' : message }
  }));
}, [username]);
  // Validate email
  useEffect(() => {
    if (email.length === 0) {
      setValidation(prev => ({
        ...prev,
        email: { isValid: null, message: '' }
      }));
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const hasConsecutiveDots = /\.\./.test(email);
    const hasValidStart = /^[a-zA-Z0-9]/.test(email);
    const hasValidDomain = /@[a-zA-Z0-9]/.test(email);
    const isValidLength = email.length >= 5 && email.length <= 254;

    let isValid = true;
    let message = '';

    if (!isValidLength) {
      isValid = false;
      message = 'Email length must be between 5 and 254 characters';
    } else if (!hasValidStart) {
      isValid = false;
      message = 'Email must start with a letter or number';
    } else if (hasConsecutiveDots) {
      isValid = false;
      message = 'Email cannot have consecutive dots';
    } else if (!hasValidDomain) {
      isValid = false;
      message = 'Invalid domain format';
    } else if (!emailRegex.test(email)) {
      isValid = false;
      message = 'Please enter a valid email address';
    }

    setValidation(prev => ({
      ...prev,
      email: { isValid, message: isValid ? 'Valid email format' : message }
    }));
  }, [email]);


  // Validate affiliation (optional but if filled, validate it)
  useEffect(() => {
    if (affiliation.length === 0) {
      setValidation(prev => ({
        ...prev,
        affiliation: { isValid: null, message: '' }
      }));
      return;
    }

    const affiliationRegex = /^[a-zA-Z0-9\s.,&()-]+$/;
    const isValidLength = affiliation.trim().length >= 2 && affiliation.trim().length <= 200;
    const hasExcessiveSpecialChars = /[^a-zA-Z0-9\s.,&()-]/.test(affiliation);

    let isValid = true;
    let message = '';

    if (hasExcessiveSpecialChars) {
      isValid = false;
      message = 'Contains invalid special characters';
    } else if (!isValidLength) {
      isValid = false;
      message = affiliation.trim().length < 2 ? 'Must be at least 2 characters' : 'Must not exceed 200 characters';
    } else if (!affiliationRegex.test(affiliation)) {
      isValid = false;
      message = 'Please enter a valid affiliation';
    }

    setValidation(prev => ({
      ...prev,
      affiliation: { isValid, message: isValid ? 'Valid affiliation' : message }
    }));
  }, [affiliation]);

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
    if (password2.length > 0) {
      setPasswordsMatch(password === password2);
    } else {
      setPasswordsMatch(null);
    }
  }, [password, password2]);

 const onChange = (e) => {
  const { name, value } = e.target;
  
  let sanitizedValue = value;
  
  if (name === 'firstName' || name === 'lastName') {
    sanitizedValue = value.replace(/^\s+/, '');
  } else if (name === 'email') {
    sanitizedValue = value.replace(/\s/g, '').toLowerCase();
  } else if (name === 'username') {
    // Remove spaces and convert to lowercase
    sanitizedValue = value.replace(/\s/g, '').toLowerCase();
  }
  
  setFormData((prevState) => ({
    ...prevState,
    [name]: sanitizedValue,
  }));
};
  const onBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const isPasswordValid = () => {
    return Object.values(passwordValidation).every((value) => value === true);
  };

 const isFormValid = () => {
  return (
    validation.firstName.isValid === true &&
    validation.lastName.isValid === true &&
    validation.username.isValid === true &&
    validation.email.isValid === true &&
    (affiliation.length === 0 || validation.affiliation.isValid === true) &&
    isPasswordValid() &&
    passwordsMatch === true
  );
};

const onSubmit = async(e) => {
  e.preventDefault();

  setTouched({
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    password: true,
    password2: true,
    affiliation: true,
  });

  if (!firstName || !lastName || !username || !email || !password) {
    toast.error('Please fill in all required fields');
    return;
  }

  if (validation.firstName.isValid !== true) {
    toast.error('Please enter a valid first name');
    return;
  }

  if (validation.lastName.isValid !== true) {
    toast.error('Please enter a valid last name');
    return;
  }

  if (validation.username.isValid !== true) {
    toast.error('Please enter a valid username');
    return;
  }

  if (validation.email.isValid !== true) {
    toast.error('Please enter a valid email address');
    return;
  }

  if (affiliation.length > 0 && validation.affiliation.isValid !== true) {
    toast.error('Please enter a valid affiliation');
    return;
  }

  if (!isPasswordValid()) {
    toast.error('Please meet all password requirements');
    return;
  }

  if (password !== password2) {
    toast.error('Passwords do not match');
    return;
  }

try {
      const userData = {
        prefix: prefix.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password,
        affiliation: affiliation.trim(),
      };

      const response = await api.post('/api/auth/register', userData);

      if (response.data.success) {
        setRegisteredEmail(email);
        setShowSuccessMessage(true);
        toast.success('Registration successful! Please check your email.');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
    }
};
 const handleResendVerification = async () => {
    setIsResending(true);
    try {
      const response = await api.post('/api/auth/resend-verification', {
        email: registeredEmail
      });

      if (response.data.success) {
        toast.success('Verification email sent! Please check your inbox.');
      }
    } catch (error) {
      toast.error('Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  // Show success message after registration
  if (showSuccessMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-outlook-blue to-outlook-darkBlue py-12 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-2xl text-center">
          <div className="mb-6">
            <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Check Your Email!
          </h2>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <FaEnvelope className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <p className="text-gray-700">
              We've sent a verification link to:
            </p>
            <p className="font-semibold text-outlook-blue mt-2">
              {registeredEmail}
            </p>
          </div>
          <p className="text-gray-600 mb-6">
            Please click the verification link in the email to activate your account.
            The link will expire in 24 hours.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleResendVerification}
              disabled={isResending}
              className="w-full py-3 px-4 border border-outlook-blue text-outlook-blue rounded-lg hover:bg-outlook-blue hover:text-white transition-colors disabled:opacity-50"
            >
              {isResending ? 'Sending...' : 'Resend Verification Email'}
            </button>
            <Link
              to="/IJPPI/login"
              className="block w-full py-3 px-4 bg-outlook-blue text-white rounded-lg hover:bg-outlook-darkBlue transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
 if (showSuccessMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-outlook-blue to-outlook-darkBlue py-12 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-2xl text-center">
          <div className="mb-6">
            <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Check Your Email!
          </h2>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <FaEnvelope className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <p className="text-gray-700">
              We've sent a verification link to:
            </p>
            <p className="font-semibold text-outlook-blue mt-2">
              {registeredEmail}
            </p>
          </div>
          <p className="text-gray-600 mb-6">
            Please click the verification link in the email to activate your account.
            The link will expire in 24 hours.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleResendVerification}
              disabled={isResending}
              className="w-full py-3 px-4 border border-outlook-blue text-outlook-blue rounded-lg hover:bg-outlook-blue hover:text-white transition-colors disabled:opacity-50"
            >
              {isResending ? 'Sending...' : 'Resend Verification Email'}
            </button>
            <Link
              to="/IJPPI/login"
              className="block w-full py-3 px-4 bg-outlook-blue text-white rounded-lg hover:bg-outlook-darkBlue transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
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

  const getInputClassName = (fieldName, validationState) => {
    const baseClass = "appearance-none block w-full px-3 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent";
    
    if (validationState === null || !touched[fieldName]) {
      return `${baseClass} border-gray-300 focus:ring-outlook-blue`;
    }
    
    return validationState === true
      ? `${baseClass} border-green-500 focus:ring-green-500`
      : `${baseClass} border-red-500 focus:ring-red-500`;
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
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-4 lg:p-6">
  <div className="relative w-full max-w-7xl h-[90vh]">
    {/* Background Image */}
    <img 
      src={loginImg} 
      alt="Registration background"
      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
    />
    
    {/* Form overlay on the right */}
    <div className="absolute right-0 top-0 w-full lg:w-[58%] h-full bg-white rounded-2xl lg:rounded-tl-[50px] lg:rounded-bl-[50px] lg:rounded-tr-none lg:rounded-br-none shadow-2xl overflow-y-auto">
      <div className="p-6 lg:p-8">
        <div className="mb-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center">
            Register as Author
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your account to submit articles
          </p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="prefix" className="block text-xs font-medium text-gray-700 mb-1">
                Prefix
              </label>
              <select
                id="prefix"
                name="prefix"
                value={prefix}
                onChange={onChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              >
                <option value="">Select...</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Mx.">Mx.</option>
              </select>
            </div>

            <div>
              <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <div className="relative">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={onChange}
                  onBlur={() => onBlur('firstName')}
                  className={getInputClassName('firstName', validation.firstName.isValid)}
                  placeholder="John"
                />
                {validation.firstName.isValid !== null && touched.firstName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {validation.firstName.isValid ? (
                      <FaCheck className="text-green-500 w-4 h-4" />
                    ) : (
                      <FaTimes className="text-red-500 w-4 h-4" />
                    )}
                  </div>
                )}
              </div>
              {touched.firstName && validation.firstName.message && (
                <p className={`mt-1 text-xs ${validation.firstName.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {validation.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <div className="relative">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={onChange}
                  onBlur={() => onBlur('lastName')}
                  className={getInputClassName('lastName', validation.lastName.isValid)}
                  placeholder="Doe"
                />
                {validation.lastName.isValid !== null && touched.lastName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {validation.lastName.isValid ? (
                      <FaCheck className="text-green-500 w-4 h-4" />
                    ) : (
                      <FaTimes className="text-red-500 w-4 h-4" />
                    )}
                  </div>
                )}
              </div>
              {touched.lastName && validation.lastName.message && (
                <p className={`mt-1 text-xs ${validation.lastName.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {validation.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-1">
                Username *
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={onChange}
                  onBlur={() => onBlur('username')}
                  className={getInputClassName('username', validation.username.isValid)}
                  placeholder="johndoe123"
                />
                {validation.username.isValid !== null && touched.username && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {validation.username.isValid ? (
                      <FaCheck className="text-green-500 w-4 h-4" />
                    ) : (
                      <FaTimes className="text-red-500 w-4 h-4" />
                    )}
                  </div>
                )}
              </div>
              {touched.username && validation.username.message && (
                <p className={`mt-1 text-xs ${validation.username.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {validation.username.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={onChange}
                onBlur={() => onBlur('email')}
                className={getInputClassName('email', validation.email.isValid)}
                placeholder="your.email@example.com"
              />
              {validation.email.isValid !== null && touched.email && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validation.email.isValid ? (
                    <FaCheck className="text-green-500 w-4 h-4" />
                  ) : (
                    <FaTimes className="text-red-500 w-4 h-4" />
                  )}
                </div>
              )}
            </div>
            {touched.email && validation.email.message && (
              <p className={`mt-1 text-xs ${validation.email.isValid ? 'text-green-600' : 'text-red-600'}`}>
                {validation.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="affiliation" className="block text-xs font-medium text-gray-700 mb-1">
              Affiliation / Institution
            </label>
            <div className="relative">
              <input
                id="affiliation"
                name="affiliation"
                type="text"
                value={affiliation}
                onChange={onChange}
                onBlur={() => onBlur('affiliation')}
                placeholder="University or Organization"
                className={getInputClassName('affiliation', validation.affiliation.isValid)}
              />
              {validation.affiliation.isValid !== null && touched.affiliation && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validation.affiliation.isValid ? (
                    <FaCheck className="text-green-500 w-4 h-4" />
                  ) : (
                    <FaTimes className="text-red-500 w-4 h-4" />
                  )}
                </div>
              )}
            </div>
            {touched.affiliation && validation.affiliation.message && (
              <p className={`mt-1 text-xs ${validation.affiliation.isValid ? 'text-green-600' : 'text-red-600'}`}>
                {validation.affiliation.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
  <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
    Password *
  </label>
  <div className="relative">
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
      className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center"
    >
      {showPassword ? (
        <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600" />
      ) : (
        <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
      )}
    </button>
  </div>
  
  {showPasswordRequirements && password.length > 0 && (
    <div className="mt-2 p-2 bg-gray-50 rounded-lg space-y-1">
      <p className="text-xs font-semibold text-gray-700 mb-1">Requirements:</p>
      <RequirementItem 
        met={passwordValidation.minLength} 
        text="8+ characters" 
      />
      <RequirementItem 
        met={passwordValidation.hasUpperCase} 
        text="Uppercase (A-Z)" 
      />
      <RequirementItem 
        met={passwordValidation.hasLowerCase} 
        text="Lowercase (a-z)" 
      />
      <RequirementItem 
        met={passwordValidation.hasNumber} 
        text="Number (0-9)" 
      />
      <RequirementItem 
        met={passwordValidation.hasSpecialChar} 
        text="Special (!@#$%)" 
      />
    </div>
  )}
</div>

      <div>
  <label htmlFor="password2" className="block text-xs font-medium text-gray-700 mb-1">
    Confirm Password *
  </label>
  <div className="relative">
    <input
      id="password2"
      name="password2"
      type={showConfirmPassword ? 'text' : 'password'}
      autoComplete="new-password"
      required
      value={password2}
      onChange={onChange}
      onBlur={() => onBlur('password2')}
      className={`appearance-none block w-full px-3 py-2 pr-20 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm ${
        passwordsMatch === null || !touched.password2
          ? 'border-gray-300 focus:ring-blue-600'
          : passwordsMatch
          ? 'border-green-500 focus:ring-green-500'
          : 'border-red-500 focus:ring-red-500'
      }`}
    />
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center"
    >
      {showConfirmPassword ? (
        <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600" />
      ) : (
        <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
      )}
    </button>
    {passwordsMatch !== null && touched.password2 && (
      <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
        {passwordsMatch ? (
          <FaCheck className="text-green-500 w-4 h-4" />
        ) : (
          <FaTimes className="text-red-500 w-4 h-4" />
        )}
      </div>
    )}
  </div>
  {touched.password2 && passwordsMatch === false && (
    <p className="mt-1 text-xs text-red-600">
      Passwords do not match
    </p>
  )}
  {touched.password2 && passwordsMatch === true && (
    <p className="mt-1 text-xs text-green-600">
      Passwords match!
    </p>
  )}
</div>
          </div>

          <div className="pt-2">
            <button
              onClick={onSubmit}
              disabled={isLoading || !isFormValid()}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/IJPPI/login"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
 
  );
}

export default Register;