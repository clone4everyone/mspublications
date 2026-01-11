import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import api from '../utils/api'
function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get(`/api/auth/verify-email/${token}`);
        
        if (response.data.success) {
          setVerificationStatus('success');
          setMessage('Your email has been verified successfully!');
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/IJPPI/login');
          }, 3000);
        }
      } catch (error) {
        setVerificationStatus('error');
        console.log(error)
        setMessage(error.response?.data?.message || 'Verification failed. The link may be invalid or expired.');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-outlook-blue to-outlook-darkBlue py-12 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-2xl text-center">
        {verificationStatus === 'verifying' && (
          <>
            <FaSpinner className="w-20 h-20 text-outlook-blue mx-auto animate-spin mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Verifying Your Email...
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {verificationStatus === 'success' && (
          <>
            <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Email Verified!
            </h2>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Redirecting to login page...
            </p>
            <Link
              to="/IJPPI/login"
              className="inline-block px-6 py-3 bg-outlook-blue text-white rounded-lg hover:bg-outlook-darkBlue transition-colors"
            >
              Go to Login
            </Link>
          </>
        )}

        {verificationStatus === 'error' && (
          <>
            <FaTimesCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            <div className="space-y-3">
              <Link
                to="/IJPPI/register"
                className="block w-full py-3 px-4 bg-outlook-blue text-white rounded-lg hover:bg-outlook-darkBlue transition-colors"
              >
                Register Again
              </Link>
              <Link
                to="/IJPPI/login"
                className="block w-full py-3 px-4 border border-outlook-blue text-outlook-blue rounded-lg hover:bg-outlook-blue hover:text-white transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;