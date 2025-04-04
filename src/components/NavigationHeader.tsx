
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import UserAvatar from './UserAvatar';
import NotificationIcon from './NotificationIcon';
import { Menu, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationHeaderProps {
  toggleSidebar: () => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ toggleSidebar }) => {
  const { userName, userRole, userAvatar, logout } = useAuth();
  
  return (
    <header className="h-16 border-b flex items-center px-4 md:px-6 bg-background z-30 fixed top-0 right-0 left-0 lg:left-64 transition-all duration-300">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden mr-2">
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex items-center flex-1">
        <Link to="/" className="lg:hidden flex items-center gap-2">
          <img src="/lovable-uploads/e837c76a-f20c-4215-b385-a87dd3a9f7ee.png" alt="ASBM University" className="h-8" />
          <span className="font-semibold text-lg hidden md:inline-block">ASBM Classroom</span>
        </Link>
        
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="hidden md:flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Create</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>New Assignment</DropdownMenuItem>
              <DropdownMenuItem>New Announcement</DropdownMenuItem>
              <DropdownMenuItem>New Material</DropdownMenuItem>
              <DropdownMenuItem>New Question</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <NotificationIcon />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <UserAvatar
                  name={userName || ''}
                  avatarUrl={userAvatar || ''}
                  role={userRole}
                  size="md"
                  showBadge={true}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName || 'Guest'}</p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">
                    {userRole || 'User'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/help" className="cursor-pointer">Help Center</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-500 focus:text-red-500"
                onClick={logout}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
