import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ transparent = true, currentPage = 'home', onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Current issue", id: "current" },
    { name: "Archives", id: "archives" },
    { name: "Instructions to Author", id: "instructions" },
    { name: "Contact", id: "contact" },
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
      window.location.href = `/IJPPI/${user.role}/dashboard`;
    }
  };

  return (
    <>
    <div>
      <div className='w-full h-[50px] flex justify-end items-center px-[101px] bg-[#1946DA]'>
        <div className='flex gap-8 text-white font-sans font-[400] text-[16px] leading-[100%]'>
          <p className='hover:cursor-pointer ' onClick={()=>{window.open('https://mspublication.com/','_blank')}}>MaxoSmith PUBLICATIONS</p>
          <p>Subscription</p>
        </div>

      </div>
<nav
      className={`relative z-50 px-4 sm:px-8 lg:px-[90px]  w-full h-[91px] sm:h-[89px] flex items-center justify-between
        ${transparent ? "bg-transparent text-white" : "bg-white text-gray-900"}`}
    >
      <div 
        className="w-[267px] h-[57px] font-bold cursor-pointer"
        onClick={() => handleNavClick('home')}
      >
      <img src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767786487/mslogo_gqwxzo.png' className='w-full h-full'/>
      </div>

      <div className="hidden xl:flex items-center gap-6 2xl:gap-10">
        {navItems.map((item) => (
          <div key={item.id} className="relative">
            <p
              onClick={() => handleNavClick(item.id)}
              className={`font-[500] text-[18px] hover:cursor-pointer hover:opacity-80 whitespace-nowrap transition-opacity pb-1
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
    h-[40px] px-[20px] text-[14px]
    md:h-[42px] md:px-[24px] md:text-[15px]
    lg:h-[44px] lg:w-[172px] lg:px-0 lg:text-[15px]
    xl:h-[46px] xl:w-[181px] xl:text-[16px]

    hover:bg-[#0146c4] transition-all duration-300
  "
>
  Submit Article
</button>

      <div className="hidden md:flex gap-3 sm:gap-5 items-center">
        {isAuthenticated ? (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.firstName?.[0] || 'U'}
              </div>
              <span className="font-[500] text-[18px] whitespace-nowrap">{user?.firstName || 'User'}</span>
            </div>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            
              <button
                onClick={handleDashboardClick}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 text-[14px] font-[500]"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 text-[14px] font-[500]"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p 
            onClick={handleLoginClick}
            className="font-[500] text-[14px] hover:cursor-pointer whitespace-nowrap"
          >
            Sign in
          </p>
        )}
        {/* <button 
          onClick={handleSubmitClick}
          className={`px-[16px] sm:px-[20px] py-[10px] sm:py-[12px] font-[500] text-[12px] sm:text-[14px] rounded-[12px] transition-colors whitespace-nowrap
          ${transparent ? 'bg-white text-black hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Submit article
        </button> */}
      </div>

      <button 
        className="xl:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-black shadow-lg xl:hidden">
          <div className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <p
                  onClick={() => handleNavClick(item.id)}
                  className={`font-[500] text-[14px] hover:cursor-pointer hover:opacity-80 py-2
                    ${currentPage === item.id ? 'font-bold text-blue-600' : ''}`}
                >
                  {item.name}
                </p>
                {currentPage === item.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-600 rounded-full"></div>
                )}
              </div>
            ))}
            <hr className="my-2" />
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.firstName?.[0] || 'U'}
                  </div>
                  <span className="font-[500] text-[14px]">{user?.firstName || 'User'}</span>
                </div>
                <button
                  onClick={handleDashboardClick}
                  className="text-left font-[500] text-[14px] hover:cursor-pointer py-2"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="text-left font-[500] text-[14px] hover:cursor-pointer py-2 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <p 
                onClick={handleLoginClick}
                className="font-[500] text-[14px] hover:cursor-pointer py-2"
              >
                Sign in
              </p>
            )}
            <button 
              onClick={handleSubmitClick}
              className="px-[20px] py-[12px] font-[500] text-[14px] rounded-[12px] bg-blue-600 text-white hover:bg-blue-700"
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