
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Search, PlusCircle, Clock } from 'lucide-react';

const DiscussionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const discussions = [
    {
      id: 1,
      title: 'Understanding Recursion in Functional Programming',
      course: 'Advanced Programming Paradigms',
      author: 'Prof. Rajesh Verma',
      authorAvatar: '',
      postedAt: '2023-06-10T10:30:00',
      replies: 12,
      lastReplyAt: '2023-06-11T15:45:00',
      lastReplyBy: 'Amit Kumar',
      tags: ['programming', 'recursion', 'functional']
    },
    {
      id: 2,
      title: 'Ethics of AI in Healthcare Applications',
      course: 'Artificial Intelligence Ethics',
      author: 'Dr. Priya Sharma',
      authorAvatar: '',
      postedAt: '2023-06-09T08:20:00',
      replies: 8,
      lastReplyAt: '2023-06-10T12:30:00',
      lastReplyBy: 'Meera Patel',
      tags: ['ai', 'healthcare', 'ethics']
    },
    {
      id: 3,
      title: 'Database Normalization Best Practices',
      course: 'Database Management Systems',
      author: 'Dr. Suresh Reddy',
      authorAvatar: '',
      postedAt: '2023-06-08T14:15:00',
      replies: 5,
      lastReplyAt: '2023-06-09T09:00:00',
      lastReplyBy: 'Rajesh Verma',
      tags: ['database', 'normalization', 'sql']
    },
    {
      id: 4,
      title: 'User Experience Design for Mobile Applications',
      course: 'Human-Computer Interaction',
      author: 'Prof. Meera Patel',
      authorAvatar: '',
      postedAt: '2023-06-07T11:45:00',
      replies: 10,
      lastReplyAt: '2023-06-08T16:20:00',
      lastReplyBy: 'Suresh Reddy',
      tags: ['ux', 'design', 'mobile']
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

  const filteredDiscussions = discussions.filter(discussion => 
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Discussions</h1>
          <p className="text-muted-foreground">
            Engage in academic discussions across all your courses
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          New Discussion
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search discussions by title, course, author, or tags..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Discussions</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="by-course">By Course</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredDiscussions.map(discussion => (
            <Card key={discussion.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                    <AvatarFallback>{discussion.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium hover:text-primary cursor-pointer">{discussion.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>{discussion.course}</span>
                      <span>•</span>
                      <span>Started by {discussion.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 
                        {getTimeSince(discussion.postedAt)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {discussion.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{discussion.replies} replies</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last reply by <span className="font-medium">{discussion.lastReplyBy}</span> {getTimeSince(discussion.lastReplyAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="my-posts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Posts</CardTitle>
              <CardDescription>Discussions you've started or participated in</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your discussion posts will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Discussions with recent updates</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Recent discussion activity will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="by-course" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>By Course</CardTitle>
              <CardDescription>Filter discussions by specific courses</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Course-specific discussions will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiscussionsPage;
