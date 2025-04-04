
import React from 'react';
import { Bell } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface NotificationIconProps {
  isScrolled?: boolean;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ isScrolled = false }) => {
  // Placeholder notifications
  const notifications = [
    { id: 1, text: 'Assignment deadline extended', time: '2 hours ago', type: 'assignment' },
    { id: 2, text: 'New course material available', time: '1 day ago', type: 'material' },
    { id: 3, text: 'Exam scheduled for next week', time: '2 days ago', type: 'exam' },
    { id: 4, text: 'Discussion post requires your attention', time: '3 days ago', type: 'discussion' }
  ];

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'assignment':
        return '📝';
      case 'material':
        return '📚';
      case 'exam':
        return '📋';
      case 'discussion':
        return '💬';
      default:
        return '🔔';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={`relative ${
            isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="font-normal border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold">Notifications</h2>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary">
              Mark all as read
            </Button>
          </div>
        </DropdownMenuLabel>
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="cursor-pointer py-3 px-4 flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 text-lg">{getNotificationIcon(notification.type)}</div>
            <div className="flex-1">
              <p className="text-sm">{notification.text}</p>
              <span className="text-xs text-muted-foreground">{notification.time}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-center text-primary justify-center">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationIcon;
