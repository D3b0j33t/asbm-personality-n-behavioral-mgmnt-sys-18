
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  BarChart3, 
  LineChart, 
  Users, 
  Home, 
  CalendarIcon, 
  FileText,
  MessageSquare,
  BellRing,
  Book,
  GraduationCap,
  Settings,
  HelpCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface NavigationProps {
  isScrolled: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isScrolled }) => {
  const { pathname } = useLocation();

  const mainNavItems = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/courses', label: 'Courses', icon: <BookOpen className="h-5 w-5" /> },
    { path: '/studentanalytics', label: 'Student Analytics', icon: <LineChart className="h-5 w-5" /> },
    { path: '/calendar', label: 'Calendar', icon: <CalendarIcon className="h-5 w-5" /> },
    { path: '/reports', label: 'Reports', icon: <FileText className="h-5 w-5" /> }
  ];

  const classroomNavItems = [
    { path: '/announcements', label: 'Announcements', icon: <BellRing className="h-5 w-5" /> },
    { path: '/assignments', label: 'Assignments', icon: <FileText className="h-5 w-5" /> },
    { path: '/discussions', label: 'Discussions', icon: <MessageSquare className="h-5 w-5" /> },
    { path: '/materials', label: 'Materials', icon: <Book className="h-5 w-5" /> },
    { path: '/grades', label: 'Grades', icon: <GraduationCap className="h-5 w-5" /> }
  ];

  const utilNavItems = [
    { path: '/admin', label: 'Admin Panel', icon: <BarChart3 className="h-5 w-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
    { path: '/help', label: 'Help Center', icon: <HelpCircle className="h-5 w-5" /> },
    { path: '/recent', label: 'Recent Activity', icon: <Clock className="h-5 w-5" /> }
  ];

  const renderNavItems = (items: any[]) => {
    return items.map((item) => (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
          pathname === item.path 
            ? 'bg-primary/10 text-primary font-medium' 
            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
        }`}
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    ));
  };

  return (
    <nav className="p-2 flex flex-col gap-1">
      <div className="space-y-1">
        {renderNavItems(mainNavItems)}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Classroom Tools
        </h3>
        {renderNavItems(classroomNavItems)}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Administration
        </h3>
        {renderNavItems(utilNavItems)}
      </div>

      <div className="mt-auto pt-4">
        <Button variant="outline" className="w-full justify-start">
          <Users className="h-4 w-4 mr-2" />
          Create Class
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
