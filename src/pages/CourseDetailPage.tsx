
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  FileText, 
  BarChart3, 
  CalendarIcon, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Loader2,
  Download,
  Upload,
  AlertCircle,
  Search
} from 'lucide-react';
import { mockCourses } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAssignments, setSelectedAssignments] = useState<string[]>([]);
  const [markingIndex, setMarkingIndex] = useState<number | null>(null);
  
  // Find the course by ID or use a default
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0];
  
  // Mock data for students
  const students = [
    { id: '1', name: 'Amit Kumar', email: 'amit.k@example.com', attendance: '95%', grade: 'A', lastActive: '2 hours ago' },
    { id: '2', name: 'Priya Sharma', email: 'priya.s@example.com', attendance: '88%', grade: 'B+', lastActive: '1 day ago' },
    { id: '3', name: 'Rajesh Verma', email: 'rajesh.v@example.com', attendance: '78%', grade: 'B', lastActive: '3 days ago' },
    { id: '4', name: 'Meera Patel', email: 'meera.p@example.com', attendance: '92%', grade: 'A-', lastActive: '5 hours ago' },
    { id: '5', name: 'Suresh Reddy', email: 'suresh.r@example.com', attendance: '85%', grade: 'B', lastActive: '2 days ago' },
  ];
  
  // Mock data for assignments
  const assignments = [
    { 
      id: 'a1', 
      title: 'Mid-term Project', 
      dueDate: '2023-06-15', 
      status: 'Graded',
      submissions: 23,
      maxScore: 100,
      avgScore: 82
    },
    { 
      id: 'a2', 
      title: 'Research Paper', 
      dueDate: '2023-07-01', 
      status: 'Open',
      submissions: 18,
      maxScore: 50,
      avgScore: 42
    },
    { 
      id: 'a3', 
      title: 'Group Presentation', 
      dueDate: '2023-07-10', 
      status: 'Upcoming',
      submissions: 0,
      maxScore: 40,
      avgScore: 0
    },
  ];
  
  // Mock data for materials
  const materials = [
    { 
      id: 'm1', 
      title: 'Introduction to Course', 
      type: 'Slides', 
      uploadDate: '2023-05-01',
      size: '2.4 MB',
      downloads: 45
    },
    { 
      id: 'm2', 
      title: 'Required Reading - Chapter 1-3', 
      type: 'PDF', 
      uploadDate: '2023-05-05',
      size: '8.7 MB',
      downloads: 38
    },
    { 
      id: 'm3', 
      title: 'Lecture Recording - Week 1', 
      type: 'Video', 
      uploadDate: '2023-05-07',
      size: '340 MB',
      downloads: 27
    },
    { 
      id: 'm4', 
      title: 'Lab Exercise Templates', 
      type: 'ZIP', 
      uploadDate: '2023-05-10',
      size: '5.2 MB',
      downloads: 32
    },
  ];
  
  // Mock student submissions
  const studentSubmissions = [
    { id: 's1', student: 'Amit Kumar', submissionDate: '2023-06-10', status: 'Graded', score: '92/100' },
    { id: 's2', student: 'Priya Sharma', submissionDate: '2023-06-12', status: 'Graded', score: '88/100' },
    { id: 's3', student: 'Rajesh Verma', submissionDate: '2023-06-11', status: 'Pending', score: 'N/A' },
    { id: 's4', student: 'Meera Patel', submissionDate: '2023-06-09', status: 'Graded', score: '95/100' },
    { id: 's5', student: 'Suresh Reddy', submissionDate: '2023-06-14', status: 'Pending', score: 'N/A' },
  ];
  
  // Handle assignment marking
  const handleMarkAssignment = (index: number) => {
    setMarkingIndex(index);
    // Simulate API call
    setTimeout(() => {
      setMarkingIndex(null);
      
      // Clone and update the student submissions array
      const updatedSubmissions = [...studentSubmissions];
      if (updatedSubmissions[index].status === 'Pending') {
        updatedSubmissions[index].status = 'Graded';
        updatedSubmissions[index].score = `${Math.floor(Math.random() * 11) + 85}/100`;
      }
      
      toast({
        title: "Assignment Marked",
        description: `${updatedSubmissions[index].student}'s assignment has been graded.`,
      });
    }, 1500);
  };
  
  // Toggle select assignment
  const toggleSelectAssignment = (id: string) => {
    setSelectedAssignments(prev => 
      prev.includes(id) 
        ? prev.filter(a => a !== id) 
        : [...prev, id]
    );
  };
  
  // Get background color class based on course color
  const getBgColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-50',
      green: 'bg-green-50',
      amber: 'bg-amber-50',
      pink: 'bg-pink-50',
      violet: 'bg-violet-50',
      red: 'bg-red-50',
      indigo: 'bg-indigo-50',
      cyan: 'bg-cyan-50'
    };
    
    return colorMap[color] || 'bg-gray-50';
  };
  
  // Get border color class based on course color
  const getBorderColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'border-blue-200',
      green: 'border-green-200',
      amber: 'border-amber-200',
      pink: 'border-pink-200',
      violet: 'border-violet-200',
      red: 'border-red-200',
      indigo: 'border-indigo-200',
      cyan: 'border-cyan-200'
    };
    
    return colorMap[color] || 'border-gray-200';
  };
  
  // Get text color class based on course color
  const getTextColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'text-blue-700',
      green: 'text-green-700',
      amber: 'text-amber-700',
      pink: 'text-pink-700',
      violet: 'text-violet-700',
      red: 'text-red-700',
      indigo: 'text-indigo-700',
      cyan: 'text-cyan-700'
    };
    
    return colorMap[color] || 'text-gray-700';
  };
  
  // Format date string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Graded':
        return <Badge className="bg-green-100 hover:bg-green-200 text-green-800 border-green-200">Graded</Badge>;
      case 'Open':
        return <Badge variant="outline" className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200">Open</Badge>;
      case 'Upcoming':
        return <Badge variant="outline" className="bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-200">Upcoming</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
          <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className={`p-6 rounded-lg mb-6 border ${getBgColorClass(course.color)} ${getBorderColorClass(course.color)}`}>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className={`text-2xl font-bold mb-1 ${getTextColorClass(course.color)}`}>
              {course.title}
            </h1>
            <p className="text-muted-foreground mb-2">
              Instructor: {course.instructor}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline">{course.subject}</Badge>
              <Badge variant="outline">Spring 2023</Badge>
              <Badge variant="outline">3 Credits</Badge>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Course Syllabus
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Join Meeting
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Students</span>
                <span className="text-2xl font-bold">{students.length}</span>
              </div>
              <div className={`p-3 rounded-full ${getBgColorClass(course.color)}`}>
                <Users className={`h-5 w-5 ${getTextColorClass(course.color)}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Assignments</span>
                <span className="text-2xl font-bold">{assignments.length}</span>
              </div>
              <div className={`p-3 rounded-full ${getBgColorClass(course.color)}`}>
                <FileText className={`h-5 w-5 ${getTextColorClass(course.color)}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Resources</span>
                <span className="text-2xl font-bold">{materials.length}</span>
              </div>
              <div className={`p-3 rounded-full ${getBgColorClass(course.color)}`}>
                <BookOpen className={`h-5 w-5 ${getTextColorClass(course.color)}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Avg. Grade</span>
                <span className="text-2xl font-bold">B+</span>
              </div>
              <div className={`p-3 rounded-full ${getBgColorClass(course.color)}`}>
                <BarChart3 className={`h-5 w-5 ${getTextColorClass(course.color)}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This course provides a comprehensive introduction to {course.subject}. 
                    Students will explore fundamental concepts, theories, and practical applications
                    through lectures, discussions, and hands-on projects. The curriculum is designed
                    to develop critical thinking skills and prepare students for advanced study in the field.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Announcements</CardTitle>
                  <Button size="sm" variant="outline">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-medium mb-1">Midterm Project Guidelines</h3>
                      <div className="flex items-center mb-2">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Posted 2 days ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The midterm project guidelines have been posted. Please review the requirements 
                        and deadlines carefully. Office hours this week will be dedicated to project Q&A.
                      </p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <h3 className="font-medium mb-1">Guest Lecturer Next Week</h3>
                      <div className="flex items-center mb-2">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Posted 5 days ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We will have a guest lecturer next Thursday. Dr. Sharma from the National Research 
                        Institute will be presenting her recent work. Attendance is mandatory.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map(assignment => (
                      <div key={assignment.id} className="flex items-start pb-4 last:pb-0 border-b last:border-0">
                        <div className={`p-2 rounded-full mr-3 ${getBgColorClass(course.color)}`}>
                          <CalendarIcon className={`h-4 w-4 ${getTextColorClass(course.color)}`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{assignment.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            Due {formatDate(assignment.dueDate)}
                          </p>
                        </div>
                        <div className="ml-auto">
                          {getStatusBadge(assignment.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Class Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between pb-2 border-b">
                      <div>
                        <p className="font-medium">Lectures</p>
                        <p className="text-sm text-muted-foreground">Mon, Wed</p>
                      </div>
                      <p className="text-sm">10:00 AM - 11:30 AM</p>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <div>
                        <p className="font-medium">Lab Sessions</p>
                        <p className="text-sm text-muted-foreground">Friday</p>
                      </div>
                      <p className="text-sm">2:00 PM - 4:00 PM</p>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Office Hours</p>
                        <p className="text-sm text-muted-foreground">Tuesday</p>
                      </div>
                      <p className="text-sm">1:00 PM - 3:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="students">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Students Enrolled</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-60">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="sm">
                  Export List
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Current Grade</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map(student => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.attendance}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.lastActive}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem>View Submissions</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assignments">
          <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">Course Assignments</h2>
              <p className="text-muted-foreground">Manage and track student assignments</p>
            </div>
            <div className="flex gap-2">
              <Button>Create Assignment</Button>
              {selectedAssignments.length > 0 && (
                <Button variant="outline">
                  Edit Selected ({selectedAssignments.length})
                </Button>
              )}
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map(assignment => (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedAssignments.includes(assignment.id)}
                          onChange={() => toggleSelectAssignment(assignment.id)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{formatDate(assignment.dueDate)}</TableCell>
                      <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                      <TableCell>
                        {assignment.submissions} / {students.length}
                      </TableCell>
                      <TableCell>
                        {assignment.status !== 'Upcoming' ? (
                          <div className="flex flex-col">
                            <span>{assignment.avgScore} / {assignment.maxScore}</span>
                            <span className="text-xs text-muted-foreground">
                              {Math.round((assignment.avgScore / assignment.maxScore) * 100)}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
                            <DropdownMenuItem>View Submissions</DropdownMenuItem>
                            <DropdownMenuItem>Download All</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <h3 className="text-lg font-bold mt-8 mb-4">Recent Submissions</h3>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Submitted On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentSubmissions.map((submission, index) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.student}</TableCell>
                      <TableCell>{formatDate(submission.submissionDate)}</TableCell>
                      <TableCell>
                        {submission.status === 'Graded' ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>Graded</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <span>Pending</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{submission.score}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button 
                            size="sm"
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            disabled={markingIndex === index}
                            onClick={() => handleMarkAssignment(index)}
                          >
                            {markingIndex === index ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                {submission.status === 'Graded' ? (
                                  <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                  <Upload className="h-4 w-4" />
                                )}
                              </>
                            )}
                            <span className="sr-only">
                              {submission.status === 'Graded' ? 'Update Grade' : 'Mark Assignment'}
                            </span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="materials">
          <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">Course Materials</h2>
              <p className="text-muted-foreground">Access lecture notes, readings, and resources</p>
            </div>
            <div className="flex gap-2">
              <Button>Upload Material</Button>
              <Button variant="outline">Create Folder</Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map(material => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">{material.title}</TableCell>
                      <TableCell>{material.type}</TableCell>
                      <TableCell>{formatDate(material.uploadDate)}</TableCell>
                      <TableCell>{material.size}</TableCell>
                      <TableCell>{material.downloads}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Move</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Upload New Material</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <Input id="title" placeholder="Enter material title" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea id="description" placeholder="Enter a brief description" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">File</label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm mb-1">Drag and drop files here or click to browse</p>
                      <p className="text-xs text-muted-foreground">Max file size: 100MB</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Upload Material</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetailPage;
