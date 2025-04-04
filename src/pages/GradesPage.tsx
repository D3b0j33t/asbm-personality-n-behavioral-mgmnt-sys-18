
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Download, BarChart3, PieChart, LineChart, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GradesPage = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  
  const courses = [
    { id: 'cs101', name: 'Introduction to Computer Science' },
    { id: 'math202', name: 'Advanced Calculus' },
    { id: 'eng101', name: 'English Composition' },
    { id: 'phys101', name: 'Physics I' },
    { id: 'bio201', name: 'Molecular Biology' },
  ];
  
  const students = [
    {
      id: 1,
      name: 'Amit Kumar',
      courses: {
        cs101: { grade: 94, assignments: 12, lastSubmission: '2023-06-08' },
        math202: { grade: 87, assignments: 10, lastSubmission: '2023-06-10' },
        eng101: { grade: 78, assignments: 8, lastSubmission: '2023-06-05' },
      }
    },
    {
      id: 2,
      name: 'Priya Sharma',
      courses: {
        cs101: { grade: 89, assignments: 11, lastSubmission: '2023-06-09' },
        phys101: { grade: 92, assignments: 9, lastSubmission: '2023-06-11' },
        bio201: { grade: 95, assignments: 10, lastSubmission: '2023-06-07' },
      }
    },
    {
      id: 3,
      name: 'Rajesh Verma',
      courses: {
        math202: { grade: 76, assignments: 9, lastSubmission: '2023-06-06' },
        phys101: { grade: 81, assignments: 8, lastSubmission: '2023-06-09' },
        eng101: { grade: 85, assignments: 7, lastSubmission: '2023-06-10' },
      }
    },
    {
      id: 4,
      name: 'Meera Patel',
      courses: {
        cs101: { grade: 97, assignments: 12, lastSubmission: '2023-06-11' },
        bio201: { grade: 90, assignments: 10, lastSubmission: '2023-06-08' },
        math202: { grade: 92, assignments: 11, lastSubmission: '2023-06-09' },
      }
    },
    {
      id: 5,
      name: 'Suresh Reddy',
      courses: {
        eng101: { grade: 82, assignments: 8, lastSubmission: '2023-06-07' },
        phys101: { grade: 88, assignments: 9, lastSubmission: '2023-06-10' },
        cs101: { grade: 85, assignments: 11, lastSubmission: '2023-06-06' },
      }
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getGradeLetter = (grade: number) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredStudents = students
    .filter(student => 
      (selectedCourse === 'all' || student.courses[selectedCourse]) &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === 'grade' && selectedCourse !== 'all') {
        const gradeA = a.courses[selectedCourse]?.grade || 0;
        const gradeB = b.courses[selectedCourse]?.grade || 0;
        return sortOrder === 'asc' ? gradeA - gradeB : gradeB - gradeA;
      }
      return 0;
    });

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    
    return sortOrder === 'asc' 
      ? <ArrowUp className="h-3 w-3 ml-1" />
      : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Grades</h1>
          <p className="text-muted-foreground">
            Track student performance across all courses
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Grades
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-[200px]">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map(course => (
                <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Grade List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Student Name
                        {getSortIcon('name')}
                      </div>
                    </TableHead>
                    {selectedCourse === 'all' ? (
                      courses.map(course => (
                        <TableHead key={course.id}>{course.name}</TableHead>
                      ))
                    ) : (
                      <>
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => handleSort('grade')}
                        >
                          <div className="flex items-center">
                            Grade
                            {getSortIcon('grade')}
                          </div>
                        </TableHead>
                        <TableHead>Assignments Completed</TableHead>
                        <TableHead>Last Submission</TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map(student => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      
                      {selectedCourse === 'all' ? (
                        courses.map(course => (
                          <TableCell key={course.id}>
                            {student.courses[course.id] ? (
                              <div className={getGradeColor(student.courses[course.id].grade)}>
                                {student.courses[course.id].grade}% ({getGradeLetter(student.courses[course.id].grade)})
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Not enrolled</span>
                            )}
                          </TableCell>
                        ))
                      ) : (
                        student.courses[selectedCourse] ? (
                          <>
                            <TableCell>
                              <div className={`font-medium ${getGradeColor(student.courses[selectedCourse].grade)}`}>
                                {student.courses[selectedCourse].grade}% ({getGradeLetter(student.courses[selectedCourse].grade)})
                              </div>
                            </TableCell>
                            <TableCell>{student.courses[selectedCourse].assignments} / 12</TableCell>
                            <TableCell>{formatDate(student.courses[selectedCourse].lastSubmission)}</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell colSpan={3}>
                              <span className="text-muted-foreground">Not enrolled in this course</span>
                            </TableCell>
                          </>
                        )
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Grade Analytics</CardTitle>
              <CardDescription>Performance trends and insights</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <div className="flex items-center justify-center gap-4">
                <BarChart3 className="h-32 w-32 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-lg text-muted-foreground">Grade analytics visualization will appear here</p>
                  <Button size="sm" className="mt-2">Generate Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="distribution" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Distribution of grades across all courses</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <div className="flex items-center justify-center gap-4">
                <PieChart className="h-32 w-32 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-lg text-muted-foreground">Grade distribution visualization will appear here</p>
                  <Button size="sm" className="mt-2">Download Chart</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GradesPage;
