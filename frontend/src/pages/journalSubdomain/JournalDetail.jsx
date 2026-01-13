import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import api from "../../utils/api"
import Navbar from '../../components/Navbar';

import { AboutPage } from '../homepage/AboutPage';
import { CurrentIssuePage } from '../homepage/CurrentIssuePage';
import { ArchivesPage } from '../homepage/ArchivesPage';
import { InstructionsPage } from '../homepage/InstructionsPage';
import { ContactPage } from '../homepage/ContactPage';
import { EditorialBoardPage } from '../homepage/EditorialBoardPage';
import { FaGreaterThan } from 'react-icons/fa';
import { FileText, Globe, Zap, Database, Award } from 'lucide-react';
import Footer from '../../components/Footer';
import LandingPage from '../homepage/LandingPage';

function JournalDetail() {
  // const { journalId } = useParams();
   const dispatch = useDispatch();
  const journalId='J-PHARMA-001'
  const navigate = useNavigate();
  const [journal, setJournal] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    fetchJournalDetails();
    checkAuth();

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [journalId]);

  const fetchJournalDetails = async () => {
    try {
      const response = await api.get(`/api/journals/${journalId}`);
      if (response.data.success) {
        setJournal(response.data.data.journal);
      }
    } catch (error) {
      console.error('Error fetching journal:', error);
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsAuthenticated(false);
    setUser(null);
    navigate('/IJPPI/login');
  };

  if (!journal) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-teal-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-[#1B7A9C] rounded-full animate-spin border-t-transparent absolute top-0"></div>
        </div>
      </div>
    );
  }
  const benefits = [
    { icon: FileText, text: "Double-Blind Peer Review for fair evaluation." },
    { icon: Globe, text: "Open Access Policy ensuring global visibility." },
    { icon: Zap, text: "Rapid Processing with timely publication." },
    { icon: Database, text: "Indexing and Abstracting opportunities in major databases." },
    { icon: Award, text: "DOI assignment for each published article." }
  ];

  return (
    <div className="font-sans">
      {/* Hero Section - Only on Home Page */}
      {/* {currentPage === 'home' && (
        <div className="relative w-full min-h-screen overflow-hidden">
          <img
            src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767785108/hero-section_mc81n7.png'
            alt="Cloud background"
            className="absolute inset-0 w-full h-full object-cover z-0 blur-[2px]"
          />
          <div className="absolute inset-0 bg-[#00000099]  z-0" />
          
          
          <section className="relative z-10 px-6 sm:px-8 md:pl-12 lg:px-20 xl:pl-[120px] xl:pr-[120px] pt-12 sm:pt-16 md:pt-20 lg:pt-[80px] pb-20 md:pb-24 lg:pb-[125px] flex items-center justify-between min-h-[calc(100vh-80px)]">
            <div className="max-w-full md:max-w-[500px] lg:max-w-[650px] text-white text-[42px] leading-[90px] z-20 font-inria ">
             <h3>A Trusted Journal Partner</h3>
              <h1 className='font-[700] text-[120px] leading-[70px]'>International</h1>
              <h3 className=" font-[700] text-[64px] leading-[85px] w-[916px] mt-6">
               Journal of Pharmacological &
               <br/>
                Pharmaceutical Innovations.
              </h3>
            </div>

          </section>
        </div>
      )} */}

      {/* Non-Home Pages - White Background with Regular Navbar */}
     
        <div className="bg-white">
          <Navbar transparent={false} currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>
     

      {/* Page Content */}
      <div className="bg-white">
        {currentPage === 'home' && (
          <>
      <LandingPage/>
       
          </>
        )}

        {currentPage === 'about' && (
          <div className="">
            <AboutPage journal={journal}  onNavigate={setCurrentPage}/>
          </div>
        )}

        {currentPage === 'current' && (
          <div className="">
            <CurrentIssuePage   />
          </div>
        )}

        {currentPage === 'archives' && (
          <div className="">
            <ArchivesPage   />
          </div>
        )}

        {currentPage === 'instructions' && (
          <div className="px-4 sm:px-8 lg:px-[120px] py-16">
            <InstructionsPage   />
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="px-4 sm:px-8 lg:px-[120px] ">
            <ContactPage  journal/>
          </div>
        )}

        {currentPage === 'editorial' && (
          <div className="">
            <EditorialBoardPage  journal />
          </div>
        )}
      </div>

      <Footer onNavigate={setCurrentPage}/>
    </div>
   

  );
}






export default JournalDetail;
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};
const AnimatedCard = ({ children, direction = 'left', className = '', delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();

  const getTransform = () => {
    if (direction === 'left') return 'translateX(-100px)';
    if (direction === 'right') return 'translateX(100px)';
    return 'translateY(50px)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getTransform(),
        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};