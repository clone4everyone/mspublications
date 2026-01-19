import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import {useNavigate} from 'react-router-dom'
const Navbar = ({ transparent = true, currentPage = 'home', onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
const navigate=useNavigate();
  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Current issue", id: "current" },
    { name: "Archives", id: "archives" },
    { name: "Instructions to Author", id: "instructions" },
    { name: "Contact Us", id: "contact" },
    { name: "Editorial board", id: "editorial" },
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  };

  const handleNavClick = (pageId) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginClick = () => {
    window.location.href = '/IJPPI/login';
  };

  const handleSubmitClick = () => {
    if (isAuthenticated) {
      window.location.href = '/IJPPI/author/new-submission';
    } else {
      window.location.href = '/IJPPI/login';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleDashboardClick = () => {
    if (user?.role) {
      window.location.href = user.role === 'author'?`/IJPPI/${user.role}/dashboard`:`/IJPPI/${user.role}/journal/pharma`;
    }
  };

 return (
    <>
    <div>
      <div className='w-full h-[40px] sm:h-[45px] md:h-[50px] flex justify-end items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-[101px] bg-[#1946DA]'>
        <div className='flex gap-4 sm:gap-6 md:gap-8 text-white font-sans font-[400] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] leading-[100%] items-center'>
          <p className='hover:cursor-pointer' onClick={()=>{window.open('https://mspublication.com/','_blank')}}>MaxoSmith Publications</p>
          <p className='hidden sm:block cursor-pointer' onClick={()=>handleNavClick('subscription')}>Subscription</p>
           <div className="hidden md:flex gap-2 sm:gap-3 lg:gap-4 items-center">
        {isAuthenticated ? (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-bold">
                {user?.firstName?.[0] || 'U'}
              </div>
              <span className="font-[500] text-[14px] lg:text-[16px] xl:text-[18px] whitespace-nowrap">{user?.firstName || 'User'}</span>
            </div>
            <div className="absolute right-0 top-full mt-2 w-40 lg:w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            
              <button
                onClick={handleDashboardClick}
                className="w-full text-left px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-50 text-gray-700 text-[12px] lg:text-[14px] font-[500]"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 lg:px-4 py-2 lg:py-3 hover:bg-red-50 text-red-600 text-[12px] lg:text-[14px] font-[500]"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p 
            onClick={handleLoginClick}
            className="font-[500] text-[12px] lg:text-[13px] xl:text-[14px] hover:cursor-pointer whitespace-nowrap"
          >
            Sign in
          </p>
        )}
      </div>
        </div>

      </div>
<nav
      className={`relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[90px] w-full h-[70px] sm:h-[75px] md:h-[80px] lg:h-[85px] xl:h-[91px] flex items-center justify-between
        ${transparent ? "bg-transparent text-white" : "bg-white text-gray-900"}`}
    >
      <div 
        className="w-[180px] h-[38px] sm:w-[200px] sm:h-[42px] md:w-[220px] md:h-[47px] lg:w-[240px] lg:h-[52px] xl:w-[267px] xl:h-[57px] font-bold cursor-pointer"
        onClick={() => handleNavClick('home')}
      >
      <img src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767786487/mslogo_gqwxzo.png' className='w-full h-full object-contain'/>
      </div>

      <div className="hidden xl:flex items-center gap-4 lg:gap-5 xl:gap-6 2xl:gap-10">
        {navItems.map((item) => (
          <div key={item.id} className="relative">
            <p
              onClick={() => handleNavClick(item.id)}
              className={`font-[500] text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px] hover:cursor-pointer hover:opacity-80 whitespace-nowrap transition-opacity pb-1
                ${currentPage === item.id ? 'font-bold' : ''}`}
            >
              {item.name}
            </p>
            {currentPage === item.id && (
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${transparent ? 'bg-white' : 'bg-blue-600'}`}></div>
            )}
          </div>
        ))}
      </div>
<button
  className="
    bg-[#0257EE] text-white font-medium
    rounded-full
    hidden xl:block
    h-[38px] px-[16px] text-[13px]
    lg:h-[42px] lg:px-[20px] lg:text-[14px] lg:w-[145px]
    xl:h-[44px] xl:px-[22px] xl:text-[15px] xl:w-[155px]
    2xl:h-[46px] 2xl:w-[162px] 2xl:text-[16px]

    hover:bg-[#0146c4] transition-all duration-300
  " onClick={()=>handleSubmitClick()}
>
  Submit Article
</button>

     

      <button 
        className="xl:hidden text-current"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 w-full shadow-lg xl:hidden z-50 ${transparent ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
          <div className="flex flex-col p-4 sm:p-6 gap-3 sm:gap-4">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <p
                  onClick={() => handleNavClick(item.id)}
                  className={`font-[500] text-[13px] sm:text-[14px] hover:cursor-pointer hover:opacity-80 py-2
                    ${currentPage === item.id ? `font-bold ${transparent ? 'text-blue-400' : 'text-blue-600'}` : ''}`}
                >
                  {item.name}
                </p>
                {currentPage === item.id && (
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full ${transparent ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                )}
              </div>
            ))}
            <hr className={`my-2 ${transparent ? 'border-gray-700' : 'border-gray-200'}`} />
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                    {user?.firstName?.[0] || 'U'}
                  </div>
                  <span className="font-[500] text-[13px] sm:text-[14px]">{user?.firstName || 'User'}</span>
                </div>
                <button
                  onClick={handleDashboardClick}
                  className="text-left font-[500] text-[13px] sm:text-[14px] hover:cursor-pointer py-2"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="text-left font-[500] text-[13px] sm:text-[14px] hover:cursor-pointer py-2 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <p 
                onClick={handleLoginClick}
                className="font-[500] text-[13px] sm:text-[14px] hover:cursor-pointer py-2"
              >
                Sign in
              </p>
            )}
            <button 
              onClick={handleSubmitClick}
              className="px-[18px] sm:px-[20px] py-[10px] sm:py-[12px] font-[500] text-[13px] sm:text-[14px] rounded-[12px] bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Submit article
            </button>
           
          </div>
        </div>
      )}
       
      
    
    </nav>
    </div>
    </>
    
  );
};

export default Navbar;