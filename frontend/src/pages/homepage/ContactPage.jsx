import { useState, useEffect } from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import msgSend from '../../../public/assests/letter_send.png'
import api from '../../utils/api';
export const ContactPage = ({ journal }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Please login to send a message');
      setLoading(false);
      // setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      // Get journal name from journal.acronym (e.g., "IJPS" -> "pharma")
      const journalMap = {
        'IJPS': 'pharma',
        'JHS': 'history',
        'IJCR': 'chemistry',
        'IJSR': 'science',
        'JAT': 'ayurvedic'
      };
      
      const journalName = journalMap[journal?.acronym] || 'pharma';

     const response = await api.post('/api/author/contact', {
        ...formData,
        journal: journalName
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setFormData({ subject: '', message: '' });
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center font-sans w-full px-4 sm:px-6 lg:px-8 py-8'>
      {/* Header Section */}
      <div className={`flex gap-3 sm:gap-5 items-center justify-between flex-col text-center max-w-3xl transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}>
        <h1 className='font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0461F0] leading-tight'>
          Contact Us
        </h1>
        <p className='font-medium text-base sm:text-lg text-[#717171]'>
          Any question or remarks? Just write us a message!
        </p>
      </div>

      {/* Main Content Section */}
      <div className='flex flex-col lg:flex-row gap-6 lg:gap-0 mt-8 sm:mt-10 w-full max-w-7xl relative'>
        {/* Contact Information Card - Slides from LEFT */}
        <div className={`w-full lg:w-[491px] min-h-[500px] lg:h-[647px] rounded-[10px] bg-[#0461F0] relative p-6 sm:p-8 lg:pl-[40px] lg:pt-[40px] lg:pr-[60px] flex flex-col text-white gap-12 sm:gap-20 lg:gap-28 overflow-hidden transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
        }`}>
          <div className='flex flex-col gap-3'>
            <h2 className='font-semibold text-2xl sm:text-[28px] leading-tight'>
              Contact Information
            </h2>
            <p className='font-normal text-base sm:text-[18px] leading-tight text-[#C9C9C9]'>
              Editorial Office
            </p>
          </div>
          
          <div className='flex flex-col gap-8 sm:gap-12 lg:gap-16 z-40'>
            <p className='flex gap-4 sm:gap-5 font-normal text-sm sm:text-[16px] leading-tight items-center'>
              <Phone className='text-xl sm:text-[24px] flex-shrink-0'/>
              <span>+91-82730-66581</span>
            </p>
            
            <p className='flex gap-4 sm:gap-5 font-normal text-sm sm:text-[16px] leading-tight items-center break-all'>
              <Mail className='text-xl sm:text-[24px] flex-shrink-0'/>
              <span className='break-words'>mspublication@gmail.com</span>
            </p>
            
            <p className='flex gap-4 sm:gap-5 font-normal text-sm sm:text-[16px] leading-tight'>
              <MapPin className='text-2xl sm:text-[34px] flex-shrink-0 mt-1'/>
              <span className='leading-relaxed'>
                85, Sangam Vihar Colony, Jamal Pur Kala, Jwalapur, Jagjeetpur, Haridwar, Uttarakhand - 249401, India
              </span>
            </p>
          </div>
          
          {/* Decorative circles */}
          <div className='absolute w-[100px] h-[100px] sm:w-[138px] sm:h-[138px] rounded-full z-20 opacity-[66%] bg-[#FFFFFFA8] bottom-10 left-[60%] border border-none animate-pulse'></div>
          <div className='absolute w-[200px] h-[200px] sm:w-[269px] sm:h-[269px] z-10 -right-10 bg-[#3F82EA] rounded-full -bottom-24 sm:-bottom-36 animate-pulse'></div>
        </div>

        {/* Form Section - Slides from RIGHT */}
        <div className={`pt-6 sm:pt-8 lg:pt-[40px] px-6 sm:px-8 lg:pl-[40px] lg:pr-[40px] flex flex-col gap-5 w-full lg:w-[690px] relative transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
        }`}>
          <div className='flex flex-col gap-3'>
            <label className='font-medium text-sm sm:text-base'>Subject*</label>
            <input 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder='How can we help' 
              className='border border-gray-300 p-3 sm:p-4 rounded focus:outline-none focus:border-[#0461F0] w-full transition-colors'
            />
          </div>
          
          <div className='flex flex-col gap-3'>
            <label className='font-medium text-sm sm:text-base'>Message*</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder='Write your message...' 
              className='border border-gray-300 p-3 sm:p-4 h-32 sm:h-36 rounded focus:outline-none focus:border-[#0461F0] w-full resize-none transition-colors'
            />
          </div>
          
          {/* Success/Error Messages */}
          {successMessage && (
            <div className='text-green-600 font-medium text-sm sm:text-base bg-green-50 p-3 rounded animate-fade-in'>
              {successMessage}
            </div>
          )}
          
          {errorMessage && (
            <div className='text-red-600 font-medium text-sm sm:text-base bg-red-50 p-3 rounded animate-fade-in'>
              {errorMessage}
            </div>
          )}
          
          <div className='flex w-full justify-end mt-2'>
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className='px-8 sm:px-[48px] py-3 sm:py-[15px] font-medium text-sm sm:text-[16px] text-white bg-[#0461F0] rounded hover:bg-[#0351d0] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95'
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          
          {/* Decorative image - hidden on mobile */}
          <div className='hidden lg:block absolute bottom-0 right-[100px] animate-pulse'>
            <img src={msgSend} className='w-full' alt="Message send decoration" />
          </div>
        </div>
      </div>
    </div>
  );
};