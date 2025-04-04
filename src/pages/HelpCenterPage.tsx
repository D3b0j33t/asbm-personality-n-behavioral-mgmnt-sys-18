
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, HelpCircle, FileText, Video, MessageSquare, Phone, Mail, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const HelpCenterPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqs = [
    {
      id: '1',
      question: 'How do I create a new course?',
      answer: 'To create a new course, navigate to the Courses page and click on the "Create Course" button. Fill in the course details in the form and click "Create". You can then add materials, assignments, and enroll students in your new course.'
    },
    {
      id: '2',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your registered email address and follow the instructions sent to your email to create a new password.'
    },
    {
      id: '3',
      question: 'How do I add students to my course?',
      answer: 'To add students to your course, go to the specific course page, navigate to the "Students" tab, and click on "Add Students". You can add students by their email addresses or by uploading a CSV file with student information.'
    },
    {
      id: '4',
      question: 'How do I create and grade assignments?',
      answer: 'To create an assignment, go to your course page, select the "Assignments" tab, and click on "Create Assignment". Fill in the assignment details including title, instructions, due date, and points. To grade assignments, navigate to the specific assignment, view student submissions, and enter grades for each submission.'
    },
    {
      id: '5',
      question: 'Can students see each other\'s submissions?',
      answer: 'By default, students cannot see each other\'s submissions. However, you can enable peer review for specific assignments if you want students to be able to review and provide feedback on each other\'s work.'
    },
    {
      id: '6',
      question: 'How do I download grades for my course?',
      answer: 'To download grades, go to the "Grades" tab in your course and click on the "Export" or "Download" button. You can choose to download grades in various formats including CSV and Excel.'
    },
  ];
  
  const helpVideos = [
    {
      id: 1,
      title: 'Getting Started with ASBM Classroom',
      description: 'Learn the basics of navigating and using the platform',
      duration: '5:32',
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      title: 'Creating and Managing Assignments',
      description: 'A complete guide to the assignment workflow',
      duration: '8:17',
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      title: 'Grading Strategies and Best Practices',
      description: 'Tips for efficient and fair assessment',
      duration: '7:45',
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: 4,
      title: 'Advanced Course Management',
      description: 'Take your courses to the next level',
      duration: '10:23',
      thumbnail: 'https://via.placeholder.com/300x200'
    },
  ];
  
  const guides = [
    {
      id: 1,
      title: 'Instructor Guide',
      description: 'Complete guide for course instructors',
      icon: <FileText className="h-8 w-8 text-primary" />
    },
    {
      id: 2,
      title: 'Student Guide',
      description: 'Help students navigate the platform',
      icon: <FileText className="h-8 w-8 text-primary" />
    },
    {
      id: 3,
      title: 'Administrator Guide',
      description: 'System administration documentation',
      icon: <FileText className="h-8 w-8 text-primary" />
    },
    {
      id: 4,
      title: 'Integration Guide',
      description: 'Connect with other systems and tools',
      icon: <FileText className="h-8 w-8 text-primary" />
    },
  ];
  
  const filteredFaqs = searchTerm 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqs;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers, learn how to use the platform, and get support
        </p>
      </div>
      
      <div className="bg-muted/30 p-6 rounded-lg border">
        <h2 className="text-lg font-medium mb-2">How can we help?</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for answers, guides, and help articles..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="bg-background">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Documentation</h3>
                <p className="text-sm text-muted-foreground">Read guides and tutorials</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground">Watch step-by-step guides</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Contact Support</h3>
                <p className="text-sm text-muted-foreground">Get help from our team</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="faq" className="w-full">
        <TabsList>
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="guides">Guides & Resources</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>
        
        {/* FAQ Tab */}
        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to common questions about using the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="py-4 text-center">
                    <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-2 text-lg font-medium">No results found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try searching with different keywords or contact support for help
                    </p>
                  </div>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Video Tutorials Tab */}
        <TabsContent value="videos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>
                Learn how to use the platform with our video guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {helpVideos.map(video => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Button variant="outline" className="text-white border-white hover:bg-white/20">
                          Play Video
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Video Tutorials</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Guides Tab */}
        <TabsContent value="guides" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Guides & Resources</CardTitle>
              <CardDescription>
                Access comprehensive documentation and guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map(guide => (
                  <Card key={guide.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {guide.icon}
                        <div>
                          <h3 className="font-medium">{guide.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                        </div>
                      </div>
                      <Button variant="link" className="mt-4 px-0 flex items-center">
                        View Guide 
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Contact Support Tab */}
        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Get help from our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email Support</h3>
                        <p className="text-sm text-muted-foreground mt-1">24-48 hour response time</p>
                      </div>
                    </div>
                    <a href="mailto:support@asbm.ac.in" className="text-primary font-medium">
                      support@asbm.ac.in
                    </a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Phone Support</h3>
                        <p className="text-sm text-muted-foreground mt-1">Available 9am-5pm IST</p>
                      </div>
                    </div>
                    <a href="tel:+918000123456" className="text-primary font-medium">
                      +91 8000 123 456
                    </a>
                  </CardContent>
                </Card>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium text-lg mb-4">Submit a Support Ticket</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="Brief description of your issue" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Please describe your issue in detail"
                      className="w-full p-3 rounded-md border border-input bg-background"
                    ></textarea>
                  </div>
                  
                  <div>
                    <Button type="submit">Submit Ticket</Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpCenterPage;
