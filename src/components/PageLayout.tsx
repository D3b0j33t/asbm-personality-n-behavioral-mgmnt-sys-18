
import React from 'react';
import Navigation from '@/components/Navigation';

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
              className={`absolute inset-0 bg-primary`}
              style={{ opacity: overlayOpacity }}
            ></div>
          </div>
        </>
      )}
      
      <Navigation />
      
      <main className="flex-1 p-4 md:p-6 mt-16 md:mt-16 z-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
