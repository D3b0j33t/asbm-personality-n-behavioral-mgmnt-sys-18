
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, 
  FileText, 
  MessageSquare, 
  Bell, 
  CheckCircle2, 
  BookOpen,
  Calendar
} from 'lucide-react';

const RecentActivityPage = () => {
  const activities = [
    {
      id: 1,
      type: 'assignment',
      title: 'Research Paper graded',
      user: 'Prof. Amit Kumar',
      userAvatar: '',
      course: 'Introduction to AI',
      timestamp: '2023-06-11T14:30:00',
      details: 'Grade: 92/100',
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
    },
    {
      id: 2,
      type: 'announcement',
      title: 'New announcement posted',
      user: 'Dr. Priya Sharma',
      userAvatar: '',
      course: 'General',
      timestamp: '2023-06-11T11:15:00',
      details: 'Campus closure notice',
      icon: <Bell className="h-5 w-5 text-blue-500" />
    },
    {
      id: 3,
      type: 'material',
      title: 'New course material added',
      user: 'Dr. Rajesh Verma',
      userAvatar: '',
      course: 'Data Structures',
      timestamp: '2023-06-11T09:45:00',
      details: 'Week 5 - Lecture Notes',
      icon: <BookOpen className="h-5 w-5 text-amber-500" />
    },
    {
      id: 4,
      type: 'discussion',
      title: 'New reply to your discussion',
      user: 'Meera Patel',
      userAvatar: '',
      course: 'Database Systems',
      timestamp: '2023-06-10T16:20:00',
      details: 'Re: Database Normalization Best Practices',
      icon: <MessageSquare className="h-5 w-5 text-violet-500" />
    },
    {
      id: 5,
      type: 'assignment',
      title: 'New assignment created',
      user: 'Prof. Suresh Reddy',
      userAvatar: '',
      course: 'Computer Networks',
      timestamp: '2023-06-10T14:00:00',
      details: 'Due: Jun 20, 2023',
      icon: <FileText className="h-5 w-5 text-red-500" />
    },
    {
      id: 6,
      type: 'event',
      title: 'Event reminder',
      user: 'System',
      userAvatar: '',
      course: 'Academic Calendar',
      timestamp: '2023-06-10T10:30:00',
      details: 'Guest Lecture tomorrow at 11:00 AM',
      icon: <Calendar className="h-5 w-5 text-indigo-500" />
    }
  ];

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

  const getActivityTypeBadge = (type: string) => {
    switch (type) {
      case 'assignment':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Assignment</Badge>;
      case 'announcement':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Announcement</Badge>;
      case 'discussion':
        return <Badge className="bg-violet-100 text-violet-800 border-violet-300">Discussion</Badge>;
      case 'material':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300">Material</Badge>;
      case 'event':
        return <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300">Event</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recent Activity</h1>
        <p className="text-muted-foreground">
          Track updates and changes across all your courses
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>
                Recent updates from all your courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute inset-0 flex w-2 ml-5 bg-gray-100 z-0"></div>
                <ul className="space-y-6 relative z-10">
                  {activities.map(activity => (
                    <li key={activity.id} className="relative pl-10">
                      <div className="absolute left-0 bg-white rounded-full p-1 border shadow-sm">
                        {activity.icon}
                      </div>
                      <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={activity.userAvatar} alt={activity.user} />
                              <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{activity.user}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getActivityTypeBadge(activity.type)}
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {getTimeSince(activity.timestamp)}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-medium">{activity.title}</h3>
                        <div className="flex flex-col mt-1">
                          <span className="text-sm text-muted-foreground">{activity.course}</span>
                          <span className="text-sm">{activity.details}</span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Activity</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assignments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Activity</CardTitle>
              <CardDescription>Recent updates related to assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Assignment-specific activity will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="announcements" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Announcement Activity</CardTitle>
              <CardDescription>Recent announcements from your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Announcement-specific activity will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="materials" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Materials Activity</CardTitle>
              <CardDescription>Recently added course materials</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Material-specific activity will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="discussions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Discussion Activity</CardTitle>
              <CardDescription>Recent updates from discussions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Discussion-specific activity will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecentActivityPage;
