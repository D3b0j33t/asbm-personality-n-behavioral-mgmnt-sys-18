
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import NavigationHeader from '@/components/NavigationHeader';

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
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {backgroundImage && (
        <>
          <div className="absolute inset-0 -z-10 overflow-hidden">
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
      
      <div className="flex h-full">
        {/* Main content area */}
        <div className="flex flex-col w-full">
          <NavigationHeader toggleSidebar={toggleSidebar} />
          
          <main className="flex-1 p-4 md:p-6 mt-16 z-10">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
