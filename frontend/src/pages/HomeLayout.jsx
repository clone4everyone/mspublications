import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomeLayout = ({ children }) => {
  const location = useLocation();
  
  // Determine if we're on the landing page for transparent navbar
  const isLandingPage = location.pathname === '/';

  return (
    <div className="font-sans">
      {/* Navbar - transparent only on landing page */}
      <div className={isLandingPage ? '' : 'bg-white'}>
        <Navbar transparent={false} />
      </div>

      {/* Page Content */}
      <div className="bg-white">
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLayout;