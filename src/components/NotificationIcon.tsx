
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationIconProps {
  isScrolled?: boolean;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ isScrolled }) => {
  return (
    <Button 
      variant="ghost" 
      size="icon"
      className={`${
        isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
      }`}
    >
      <Bell className="h-5 w-5" />
      <span className="sr-only">Notifications</span>
    </Button>
  );
};

export default NotificationIcon;
