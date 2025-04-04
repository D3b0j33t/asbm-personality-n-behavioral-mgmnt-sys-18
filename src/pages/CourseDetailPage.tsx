
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCourses, mockStudents, mockTeachers } from '@/utils/mockData';
import { ArrowLeft, BookOpen, Calendar, Clock, GraduationCap, Users, FileText, BarChart, BookText } from 'lucide-react';
import UserAvatar from '@/components/UserAvatar';
import { Progress } from '@/components/ui/progress';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(mockCourses[0]);
  const [courseTeachers, setCourseTeachers] = useState([]);
  const [courseStudents, setCourseStudents] = useState([]);
  const [progressValues, setProgressValues] = useState({
    assignments: 0,
    discussions: 0,
    quizzes: 0,
    overall: 0
  });
  
  useEffect(() => {
    // Find the course by ID
    const foundCourse = mockCourses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Filter teachers who might teach this subject
      const teachers = mockTeachers.filter(t => 
        t.subject.toLowerCase().includes(foundCourse.subject.toLowerCase()) ||
        t.department.toLowerCase().includes(foundCourse.subject.toLowerCase())
      );
      setCourseTeachers(teachers);
      
      // Filter students who might be enrolled in this course
      const students = mockStudents.filter(s => 
        s.course.includes(foundCourse.title) || 
        s.course.includes(foundCourse.subject)
      );
      setCourseStudents(students);
      
      // Simulate progress loading for a smoother UX
      setProgressValues({
        assignments: 0,
        discussions: 0,
        quizzes: 0,
        overall: 0
      });
      
      const timer1 = setTimeout(() => {
        setProgressValues(prev => ({
          ...prev,
          assignments: 65
        }));
      }, 500);
      
      const timer2 = setTimeout(() => {
        setProgressValues(prev => ({
          ...prev,
          discussions: 80
        }));
      }, 800);
      
      const timer3 = setTimeout(() => {
        setProgressValues(prev => ({
          ...prev,
          quizzes: 50
        }));
      }, 1100);
      
      const timer4 = setTimeout(() => {
        setProgressValues(prev => ({
          ...prev,
          overall: 70
        }));
      }, 1400);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [courseId]);
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
            <p className="mb-4">The course you are looking for does not exist.</p>
            <Link to="/courses">
              <Button>Back to Courses</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Generate random data for course statistics charts
  const generateRandomData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map(month => ({
      month,
      submissions: Math.floor(Math.random() * 20) + 10,
      average: Math.floor(Math.random() * 15) + 15
    }));
  };

  // Generate mock assignments
  const mockAssignments = [
    { id: 1, title: "Mid-Term Project", dueDate: "2025-04-15", status: "pending", score: null },
    { id: 2, title: "Research Paper", dueDate: "2025-05-10", status: "pending", score: null },
    { id: 3, title: "Case Study Analysis", dueDate: "2025-03-22", status: "completed", score: 85 },
    { id: 4, title: "Group Presentation", dueDate: "2025-05-30", status: "pending", score: null },
    { id: 5, title: "Quiz 1", dueDate: "2025-03-10", status: "completed", score: 92 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        {/* Course header */}
        <div className="border-b" style={{ borderTopColor: course.color, borderTopWidth: '4px' }}>
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <Link to="/courses" className="inline-flex items-center text-sm text-muted-foreground mb-3 hover:text-primary transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to courses
                </Link>
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{course.subject}</Badge>
                    <span className="text-sm text-muted-foreground">Course ID: {course.id}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button>Enroll Now</Button>
                <Button variant="outline">View Syllabus</Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full max-w-4xl mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            {/* Overview tab */}
            <TabsContent value="overview" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{course.description || "No description available for this course."}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-medium">4 Semesters</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Academic Year</p>
                            <p className="font-medium">2024-2025</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Students Enrolled</p>
                            <p className="font-medium">{courseStudents.length || 25}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <GraduationCap className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Qualification</p>
                            <p className="font-medium">{course.title.includes('Bachelor') ? 'Undergraduate' : 'Postgraduate'}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Faculty</CardTitle>
                      <CardDescription>Instructors teaching this course</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {courseTeachers.length > 0 ? (
                          courseTeachers.slice(0, 4).map((teacher) => (
                            <div key={teacher.id} className="flex items-start gap-3 p-3 rounded-lg border">
                              <UserAvatar 
                                name={teacher.name} 
                                avatarUrl={teacher.avatar} 
                                role="teacher"
                                size="md"
                              />
                              <div>
                                <h4 className="font-medium">{teacher.name}</h4>
                                <p className="text-sm text-muted-foreground">{teacher.designation}</p>
                                <p className="text-xs mt-1">{teacher.qualification}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-4 text-muted-foreground">
                            No faculty information available for this course.
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Your Progress</CardTitle>
                      <CardDescription>Track your course completion</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Overall Completion</span>
                          <span className="font-medium">{progressValues.overall}%</span>
                        </div>
                        <Progress value={progressValues.overall} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Assignments</span>
                          <span className="font-medium">{progressValues.assignments}%</span>
                        </div>
                        <Progress value={progressValues.assignments} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Discussions</span>
                          <span className="font-medium">{progressValues.discussions}%</span>
                        </div>
                        <Progress value={progressValues.discussions} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Quizzes</span>
                          <span className="font-medium">{progressValues.quizzes}%</span>
                        </div>
                        <Progress value={progressValues.quizzes} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button variant="outline" className="w-full">
                        View Detailed Analytics
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Pending Assignments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {course.pendingAssignments > 0 ? (
                        <>
                          {mockAssignments.filter(a => a.status === "pending").map((assignment) => (
                            <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <h4 className="font-medium text-sm">{assignment.title}</h4>
                                <p className="text-xs text-muted-foreground">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                              </div>
                              <Button variant="outline" size="sm">View</Button>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto opacity-20 mb-2" />
                          <p>No pending assignments</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Assignments tab */}
            <TabsContent value="assignments" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Course Assignments</CardTitle>
                  <CardDescription>View and submit your assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockAssignments.map((assignment) => (
                      <div key={assignment.id} className="p-4 border rounded-lg transition-all hover:shadow-md">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium mb-1">{assignment.title}</h3>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" />
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                              </div>
                              <Badge variant={assignment.status === "completed" ? "outline" : "default"}>
                                {assignment.status === "completed" ? "Completed" : "Pending"}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            {assignment.status === "completed" ? (
                              <div className="text-right">
                                <span className="block text-sm font-medium">Score</span>
                                <span className="text-lg font-bold">{assignment.score}%</span>
                              </div>
                            ) : (
                              <Button>Submit</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Discussions tab */}
            <TabsContent value="discussions" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Course Discussions</CardTitle>
                  <CardDescription>Engage with your peers and instructors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center space-y-2">
                      <div className="bg-muted p-4 rounded-full inline-block">
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mt-2">Discussion forums will be activated soon</h3>
                      <p className="text-sm text-muted-foreground">Check back later for updates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Resources tab */}
            <TabsContent value="resources" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Course Resources</CardTitle>
                  <CardDescription>Access study materials and additional resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="p-4 border rounded-lg transition-all hover:shadow-md hover:border-primary">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <BookText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{["Lecture Notes", "Textbook", "Reference Material", "Tutorial Guide", "Practice Quiz", "Case Study"][i % 6]}</h4>
                            <p className="text-xs text-muted-foreground">PDF • {Math.floor(Math.random() * 10) + 1} MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4 w-full">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics tab */}
            <TabsContent value="analytics" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Course Analytics</CardTitle>
                  <CardDescription>Track your performance and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Assignment Submissions Trend</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                            <div className="text-center space-y-2">
                              <BarChart className="h-8 w-8 text-muted-foreground mx-auto" />
                              <p className="text-sm font-medium">Chart will be rendered here</p>
                              <p className="text-xs text-muted-foreground">Using randomly generated data</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-4 mt-4">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                              <span className="text-xs">Your submissions</span>
                            </div>
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-gray-300 mr-1"></div>
                              <span className="text-xs">Class average</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="space-y-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Grade Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="text-3xl font-bold">87%</div>
                          <p className="text-sm text-muted-foreground">Current Average</p>
                          <Progress value={87} className="h-2 mt-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                            <span>Class Lowest: 65%</span>
                            <span>Class Highest: 98%</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Engagement Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <BookOpen className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Resource Views</p>
                                <p className="text-xs text-muted-foreground">Last 30 days</p>
                              </div>
                            </div>
                            <p className="text-lg font-bold">24</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <FileText className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Assignments</p>
                                <p className="text-xs text-muted-foreground">Completed</p>
                              </div>
                            </div>
                            <p className="text-lg font-bold">2/5</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <Users className="h-4 w-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Discussion Posts</p>
                                <p className="text-xs text-muted-foreground">Your contributions</p>
                              </div>
                            </div>
                            <p className="text-lg font-bold">7</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
