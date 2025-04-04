
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  BarChart3, 
  BookOpen, 
  Calendar as CalendarIcon, 
  LineChart, 
  Users, 
  Home, 
  User, 
  LogOut,
  FileText 
} from 'lucide-react';
import NotificationIcon from './NotificationIcon';
import UserAvatar from './UserAvatar';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/courses', label: 'Courses', icon: <BookOpen className="h-5 w-5" /> },
    { path: '/studentanalytics', label: 'Analytics', icon: <LineChart className="h-5 w-5" /> },
    { path: '/reports', label: 'Reports', icon: <FileText className="h-5 w-5" /> },
    { path: '/calendar', label: 'Calendar', icon: <CalendarIcon className="h-5 w-5" /> },
    { path: '/admin', label: 'Admin', icon: <BarChart3 className="h-5 w-5" /> },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between p-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/e837c76a-f20c-4215-b385-a87dd3a9f7ee.png" 
              alt="ASBM University" 
              className="h-8 w-auto mr-2"
            />
            <span className={`font-bold text-lg hidden sm:inline ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              ASBM University
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`nav-link px-3 py-2 rounded-md text-sm font-medium ${
                pathname === item.path
                  ? isScrolled 
                    ? 'text-primary bg-primary/10' 
                    : 'text-white bg-white/20'
                  : isScrolled
                    ? 'text-gray-600 hover:text-primary hover:bg-primary/5'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
              } transition-all duration-200`}
            >
              <div className="flex items-center space-x-1">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
        
        {/* User Controls */}
        <div className="flex items-center space-x-2">
          <NotificationIcon isScrolled={isScrolled} />
          
          <Link to="/user/profile">
            <UserAvatar />
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className={`md:hidden ${
                  isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[75vw] max-w-xs p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 flex items-center justify-between border-b">
                  <div className="flex items-center">
                    <img 
                      src="/lovable-uploads/e837c76a-f20c-4215-b385-a87dd3a9f7ee.png" 
                      alt="ASBM University" 
                      className="h-8 w-auto mr-2"
                    />
                    <span className="font-bold text-lg">ASBM</span>
                  </div>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetTrigger>
                </div>
                
                <div className="p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <UserAvatar />
                    <div>
                      <p className="font-medium">Admin User</p>
                      <p className="text-sm text-muted-foreground">admin@asbm.ac.in</p>
                    </div>
                  </div>
                </div>
                
                <nav className="flex-1 p-4 space-y-1">
                  {navItems.map((item) => (
                    <SheetTrigger key={item.path} asChild>
                      <Link 
                        to={item.path} 
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                          pathname === item.path 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </SheetTrigger>
                  ))}
                  
                  <Separator className="my-2" />
                  
                  <SheetTrigger asChild>
                    <Link to="/user/profile" className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                  </SheetTrigger>
                  
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-3 py-2 h-auto font-normal text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => console.log('Logout clicked')}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </SheetTrigger>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
