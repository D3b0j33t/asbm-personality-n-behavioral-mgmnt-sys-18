
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import NavigationHeader from '@/components/NavigationHeader';
import { useLocation } from 'react-router-dom';

interface PageLayoutProps {
  children: React.ReactNode;
  backgroundImage?: string;
  overlayOpacity?: number;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  backgroundImage,
  overlayOpacity = 0.3
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background image with overlay if provided */}
      {backgroundImage && (
        <>
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <img 
              src={backgroundImage}
              alt="Background" 
              className="w-full h-full object-cover" 
            />
            <div 
              className="absolute inset-0 bg-primary"
              style={{ opacity: overlayOpacity }}
            ></div>
          </div>
        </>
      )}
      
      {/* Navigation sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-64 bg-background border-r`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <img src="/lovable-uploads/e837c76a-f20c-4215-b385-a87dd3a9f7ee.png" alt="ASBM University" className="h-10 mx-auto" />
            <h1 className="text-center font-semibold mt-2">ASBM Classroom</h1>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Navigation isScrolled={false} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 lg:ml-64 transition-all duration-300 flex flex-col min-h-screen`}>
        {/* Header */}
        <NavigationHeader toggleSidebar={toggleSidebar} />
        
        {/* Main content area with proper padding to avoid header overlap */}
        <main className="flex-1 p-4 md:p-6 pt-20 z-10">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
