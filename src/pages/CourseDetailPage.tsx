import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, User, Calendar, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CourseChart from '@/components/charts/CourseChart';
import PageLayout from '@/components/PageLayout';

const getCourseById = (id: string | number) => {
  const courseId = typeof id === 'string' ? parseInt(id, 10) : id;
  const courses = [
    {
      id: 1,
      title: "Master of Business Administration (MBA)",
      instructor: "Various Faculty Members",
      subject: "Business Administration",
      color: "#4285F4",
      pendingAssignments: 3,
      description: "A two-year full-time residential MBA program with options for single or dual specializations in areas such as Human Resource Management, Financial Management, Marketing Management, Operations & Logistics, and Business Analytics."
    },
    {
      id: 2,
      title: "Bachelor of Business Administration (BBA)",
      instructor: "Various Faculty Members",
      subject: "Business Administration",
      color: "#0F9D58",
      pendingAssignments: 2,
      description: "An undergraduate program focusing on business fundamentals and management principles, designed to develop future business leaders."
    },
    {
      id: 3,
      title: "Master of Commerce (M.Com)",
      instructor: "Various Faculty Members",
      subject: "Commerce",
      color: "#DB4437",
      pendingAssignments: 1,
      description: "A postgraduate program that provides advanced knowledge in commerce, accounting, and finance, preparing students for professional careers in the financial sector."
    },
    {
      id: 4,
      title: "Bachelor of Commerce (B.Com)",
      instructor: "Various Faculty Members",
      subject: "Commerce",
      color: "#F4B400",
      pendingAssignments: 0,
      description: "An undergraduate program offering comprehensive knowledge in commerce, accounting, and business law, laying the foundation for a career in commerce and finance."
    },
    {
      id: 5,
      title: "Master of Arts in Applied Psychology",
      instructor: "Various Faculty Members",
      subject: "Psychology",
      color: "#673AB7",
      pendingAssignments: 2,
      description: "A postgraduate program that explores theoretical concepts in psychology and trains students to address human behavior issues in various settings."
    },
    {
      id: 6,
      title: "Bachelor of Arts in Psychology",
      instructor: "Various Faculty Members",
      subject: "Psychology",
      color: "#FF6D00",
      pendingAssignments: 1,
      description: "An undergraduate program focusing on the study of human behavior and mental processes, preparing students for careers in psychology and related fields."
    },
    {
      id: 7,
      title: "Master of Computer Application (MCA)",
      instructor: "Various Faculty Members",
      subject: "Computer Applications",
      color: "#2196F3",
      pendingAssignments: 3,
      description: "A postgraduate program designed to provide comprehensive knowledge in computer applications and software development."
    },
    {
      id: 8,
      title: "Bachelor of Computer Application (BCA)",
      instructor: "Various Faculty Members",
      subject: "Computer Applications",
      color: "#009688",
      pendingAssignments: 2,
      description: "An undergraduate program that imparts knowledge in computer applications and prepares students for careers in the IT industry."
    },
    {
      id: 9,
      title: "Bachelor of Technology in Computer Science & Information Technology (B.Tech CSIT)",
      instructor: "Various Faculty Members",
      subject: "Engineering",
      color: "#795548",
      pendingAssignments: 4,
      description: "An undergraduate engineering program focusing on computer science and information technology, equipping students with technical skills for the IT industry."
    },
    {
      id: 10,
      title: "BBA LL.B. (Hons.)",
      instructor: "Various Faculty Members",
      subject: "Law",
      color: "#607D8B",
      pendingAssignments: 0,
      description: "An integrated five-year program combining business administration and law, preparing students for careers in corporate law and business management."
    },
    {
      id: 11,
      title: "BA LL.B. (Hons.)",
      instructor: "Various Faculty Members",
      subject: "Law",
      color: "#E91E63",
      pendingAssignments: 1,
      description: "An integrated five-year program combining arts and law, designed to develop legal professionals with a strong foundation in humanities."
    },
    {
      id: 12,
      title: "Master of Laws (LL.M)",
      instructor: "Various Faculty Members",
      subject: "Law",
      color: "#9C27B0",
      pendingAssignments: 2,
      description: "A postgraduate law program offering advanced legal studies with specializations in corporate and commercial law."
    }
  ];

  return courses.find(course => course.id === courseId);
};

const generateMockAssignments = (courseId: number) => {
  const today = new Date();

  const assignmentTypes = [
    "Essay",
    "Research Paper",
    "Case Study",
    "Group Project",
    "Presentation",
    "Quiz",
    "Exam"
  ];

  const subjects = [
    "Financial Management",
    "Marketing Management",
    "Human Resources",
    "Operations Management",
    "Business Ethics",
    "Strategic Management",
    "Business Analytics"
  ];

  const statusOptions = ["completed", "pending", "upcoming"];
  
  return Array.from({ length: 8 }, (_, i) => {
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + (Math.floor(Math.random() * 30) - 10));
    
    const type = assignmentTypes[Math.floor(Math.random() * assignmentTypes.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    return {
      id: `${courseId}-${i + 1}`,
      title: `${type}: ${subject}`,
      dueDate,
      status,
      description: `Complete the ${type.toLowerCase()} on ${subject} as per the guidelines provided. Focus on analyzing real-world applications and demonstrate critical thinking.`,
      maxMarks: 100,
      marksObtained: status === "completed" ? Math.floor(Math.random() * 30) + 70 : null
    };
  });
};

const generateMockClassSchedule = () => {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekdays.map(day => ({
    day,
    schedules: Array.from({ length: Math.floor(Math.random() * 2) + 1 }, (_, i) => {
      const startHour = 9 + i * 3;
      return {
        id: `${day}-${i}`,
        startTime: `${startHour}:00 ${startHour < 12 ? "AM" : "PM"}`,
        endTime: `${startHour + 2}:00 ${(startHour + 2) < 12 ? "AM" : "PM"}`,
        room: `Room ${100 + Math.floor(Math.random() * 20)}`,
        professor: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]}`
      };
    })
  }));
};

const generateMockAnnouncements = (courseId: number) => {
  const today = new Date();
  
  const announcementTypes = [
    "Assignment Update", 
    "Exam Schedule", 
    "Class Cancellation", 
    "Additional Resources", 
    "Reminder", 
    "Important Notice"
  ];
  
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 20));
    
    const type = announcementTypes[Math.floor(Math.random() * announcementTypes.length)];
    
    let message = "";
    switch(type) {
      case "Assignment Update":
        message = "The deadline for the recent assignment has been extended by one week.";
        break;
      case "Exam Schedule":
        message = "Mid-term exams will be held between the 15th and 20th of next month.";
        break;
      case "Class Cancellation":
        message = "Classes on Friday are cancelled due to faculty development program.";
        break;
      case "Additional Resources":
        message = "Additional study materials have been uploaded to the course repository.";
        break;
      case "Reminder":
        message = "Don't forget to submit your assignments by the end of this week.";
        break;
      case "Important Notice":
        message = "There will be a guest lecture next week by an industry expert.";
        break;
      default:
        message = "Please check the course portal for important updates.";
    }
    
    return {
      id: `ann-${courseId}-${i}`,
      date,
      type,
      message
    };
  }).sort((a, b) => b.date.getTime() - a.date.getTime());
};

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [classSchedule, setClassSchedule] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    if (courseId) {
      setLoading(true);
      
      setTimeout(() => {
        const fetchedCourse = getCourseById(courseId);
        setCourse(fetchedCourse);
        
        if (fetchedCourse) {
          setAssignments(generateMockAssignments(fetchedCourse.id));
          setClassSchedule(generateMockClassSchedule());
          setAnnouncements(generateMockAnnouncements(fetchedCourse.id));
        }
        
        setLoading(false);
      }, 500);
    }
  }, [courseId]);
  
  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-lg">Loading course details...</div>
        </div>
      </PageLayout>
    );
  }
  
  if (!course) {
    return (
      <PageLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4">Course Not Found</h2>
          <p className="mb-6">Sorry, we couldn't find the course you're looking for.</p>
          <Button asChild>
            <Link to="/courses">Return to Course Listings</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  const handleEnrollClick = () => {
    toast({
      title: "Enrollment Successful",
      description: `You have successfully enrolled in ${course.title}`,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const groupedAssignments = assignments.reduce((acc, assignment) => {
    if (!acc[assignment.status]) {
      acc[assignment.status] = [];
    }
    acc[assignment.status].push(assignment);
    return acc;
  }, { completed: [], pending: [], upcoming: [] } as Record<string, any[]>);

  return (
    <PageLayout backgroundImage="/lovable-uploads/7afce98d-f21c-40c0-a054-0b0431ca10c9.png">
      <div className="animate-fade-in">
        <div className="mb-6">
          <Link to="/courses" className="inline-flex items-center text-primary hover:text-primary/80 mb-4 bg-white/90 px-3 py-1 rounded-md">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Courses
          </Link>
          
          <Card className="bg-white/95 backdrop-blur-lg shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
                  <CardDescription className="mt-1">{course.subject}</CardDescription>
                </div>
                <Badge 
                  className="mt-1" 
                  style={{ backgroundColor: course.color, color: 'white' }}
                >
                  {course.subject}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{course.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      <p className="font-medium">{course.instructor}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Assignments</p>
                      <p className="font-medium">
                        {assignments.length} ({course.pendingAssignments} pending)
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Schedule</p>
                      <p className="font-medium">{classSchedule.length} days per week</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">4 Semesters</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                onClick={handleEnrollClick}
              >
                Enroll Now
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <CourseChart courseId={parseInt(courseId || "1", 10)} />
        
        <div className="mt-6">
          <Tabs defaultValue="assignments" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assignments" className="mt-0 space-y-4">
              <Card className="bg-white/95 backdrop-blur-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="pending">
                    <TabsList className="mb-4 grid grid-cols-3">
                      <TabsTrigger value="pending" className="relative">
                        Pending
                        {groupedAssignments.pending.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {groupedAssignments.pending.length}
                          </span>
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    
                    {['pending', 'upcoming', 'completed'].map((status) => (
                      <TabsContent key={status} value={status} className="mt-0 space-y-3">
                        {groupedAssignments[status].length > 0 ? (
                          groupedAssignments[status].map((assignment) => (
                            <div 
                              key={assignment.id} 
                              className="p-4 border rounded-lg assignment-item flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                            >
                              <div className="flex-1">
                                <h3 className="font-medium">{assignment.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                  {assignment.description}
                                </p>
                                <div className="flex items-center mt-2">
                                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span className="text-sm">
                                    Due: {formatDate(assignment.dueDate)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 md:space-x-4">
                                {status === 'completed' && assignment.marksObtained && (
                                  <div className="bg-green-50 border border-green-200 px-3 py-1 rounded text-green-800 font-medium text-sm">
                                    Score: {assignment.marksObtained}/{assignment.maxMarks}
                                  </div>
                                )}
                                <Badge 
                                  variant={
                                    status === 'completed' ? "default" :
                                    status === 'pending' ? "destructive" : "outline"
                                  }
                                  className={`capitalize ${status === 'completed' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                >
                                  {status === 'completed' ? (
                                    <><CheckCircle2 className="h-3 w-3 mr-1" /> {status}</>
                                  ) : status === 'pending' ? (
                                    <><XCircle className="h-3 w-3 mr-1" /> {status}</>
                                  ) : (
                                    <><Calendar className="h-3 w-3 mr-1" /> {status}</>
                                  )}
                                </Badge>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center py-8 text-muted-foreground">No {status} assignments.</p>
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schedule" className="mt-0">
              <Card className="bg-white/95 backdrop-blur-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {classSchedule.map((daySchedule) => (
                      <Card key={daySchedule.day} className={daySchedule.day === 'Saturday' || daySchedule.day === 'Sunday' ? "border-dashed" : ""}>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-lg">{daySchedule.day}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          {daySchedule.schedules.length > 0 ? (
                            <div className="space-y-3">
                              {daySchedule.schedules.map((schedule) => (
                                <div key={schedule.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-muted/50 rounded-lg">
                                  <div className="flex items-center mb-2 md:mb-0">
                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{schedule.startTime} - {schedule.endTime}</span>
                                  </div>
                                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                    <div className="flex items-center">
                                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                      <span>{schedule.professor}</span>
                                    </div>
                                    <Badge variant="outline">{schedule.room}</Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center py-2 text-muted-foreground">No classes scheduled</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="announcements" className="mt-0">
              <Card className="bg-white/95 backdrop-blur-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  {announcements.length > 0 ? (
                    <div className="space-y-4">
                      {announcements.map((announcement) => (
                        <Card key={announcement.id} className="staggered-item">
                          <CardHeader className="p-4 pb-2">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <CardTitle className="text-base">{announcement.type}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(announcement.date)}
                              </p>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p>{announcement.message}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-muted-foreground">No announcements at this time.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default CourseDetailPage;
