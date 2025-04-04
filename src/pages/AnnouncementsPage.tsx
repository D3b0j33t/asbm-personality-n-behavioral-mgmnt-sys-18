
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, PlusCircle, Bell, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const AnnouncementsPage = () => {
  const announcements = [
    {
      id: 1,
      author: 'Dr. Amit Kumar',
      avatar: '',
      role: 'Instructor',
      course: 'Introduction to Computer Science',
      title: 'Project deadline extended',
      content: 'Due to the upcoming holiday, I am extending the deadline for the final project to next Friday. Please use this extra time to polish your submissions.',
      postedAt: '2023-06-10T10:30:00',
      comments: 5,
    },
    {
      id: 2,
      author: 'Dr. Priya Sharma',
      avatar: '',
      role: 'Administrator',
      course: 'General',
      title: 'Campus closure notice',
      content: 'Please be informed that the campus will be closed on Monday due to the national holiday. All classes will resume as normal on Tuesday.',
      postedAt: '2023-06-09T15:45:00',
      comments: 2,
    },
    {
      id: 3,
      author: 'Prof. Rajesh Verma',
      avatar: '',
      role: 'Instructor',
      course: 'Data Structures and Algorithms',
      title: 'Guest lecture next week',
      content: 'I am pleased to announce that we will have a guest lecture from Dr. Meera Patel, a leading researcher in algorithm optimization, next Thursday. Attendance is mandatory.',
      postedAt: '2023-06-08T09:15:00',
      comments: 8,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">
            View and manage all announcements across your courses
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Create Announcement
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Announcements</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="by-course">By Course</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          {announcements.map(announcement => (
            <Card key={announcement.id} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={announcement.avatar} alt={announcement.author} />
                      <AvatarFallback>{announcement.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{announcement.author}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 
                        {getTimeSince(announcement.postedAt)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2">
                  <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  <CardDescription className="text-sm">{announcement.course}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>{announcement.content}</p>
                <div className="flex items-center gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" /> 
                    {announcement.comments} Comments
                  </Button>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="unread" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Unread Announcements</CardTitle>
              <CardDescription>You have 2 unread announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content for unread announcements will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="by-course" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Announcements by Course</CardTitle>
              <CardDescription>Select a course to view its announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Course-specific announcements will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnnouncementsPage;
