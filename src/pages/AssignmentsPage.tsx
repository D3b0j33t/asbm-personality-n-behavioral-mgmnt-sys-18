
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, FilterX, FileText, Calendar, Clock, CheckCircle, AlertCircle, PlusCircle } from 'lucide-react';
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

const AssignmentsPage = () => {
  const [filter, setFilter] = useState('');
  
  const assignments = [
    {
      id: 1,
      title: 'Research Paper on AI Ethics',
      course: 'Introduction to AI',
      dueDate: '2023-06-15T23:59:00',
      status: 'upcoming',
      points: 100,
      submissions: 15,
      totalStudents: 28
    },
    {
      id: 2,
      title: 'Database Design Project',
      course: 'Database Management',
      dueDate: '2023-06-10T23:59:00',
      status: 'late',
      points: 150,
      submissions: 22,
      totalStudents: 25
    },
    {
      id: 3,
      title: 'Algorithm Optimization Challenge',
      course: 'Data Structures',
      dueDate: '2023-06-05T23:59:00',
      status: 'graded',
      points: 75,
      avgGrade: 82,
      submissions: 30,
      totalStudents: 30
    },
    {
      id: 4,
      title: 'UI/UX Design Mockups',
      course: 'Human-Computer Interaction',
      dueDate: '2023-06-20T23:59:00',
      status: 'upcoming',
      points: 120,
      submissions: 5,
      totalStudents: 22
    },
    {
      id: 5,
      title: 'Network Security Analysis',
      course: 'Cybersecurity',
      dueDate: '2023-06-08T23:59:00',
      status: 'graded',
      points: 100,
      avgGrade: 75,
      submissions: 18,
      totalStudents: 20
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Upcoming</Badge>;
      case 'late':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Past Due</Badge>;
      case 'graded':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Graded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'graded':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredAssignments = assignments.filter(assignment => 
    assignment.title.toLowerCase().includes(filter.toLowerCase()) ||
    assignment.course.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">
            Manage and track student assignments across all courses
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            className="pl-8"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <FilterX className="h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
          <TabsTrigger value="late">Past Due</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments.map(assignment => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(assignment.status)}
                          <span>{assignment.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{formatDate(assignment.dueDate)}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(assignment.dueDate).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                      <TableCell>
                        {assignment.submissions} / {assignment.totalStudents}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-primary h-1.5 rounded-full" 
                            style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {assignment.points} pts
                        {assignment.avgGrade && (
                          <div className="text-xs text-muted-foreground">
                            Avg: {assignment.avgGrade}%
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">Actions</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Review Submissions</DropdownMenuItem>
                            <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
                            <DropdownMenuItem>Delete Assignment</DropdownMenuItem>
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
        <TabsContent value="upcoming" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Assignments that are coming up soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Upcoming assignments content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="graded" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Graded Assignments</CardTitle>
              <CardDescription>Assignments that have been graded</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Graded assignments content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="late" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Due Assignments</CardTitle>
              <CardDescription>Assignments that are past their due date</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Past due assignments content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentsPage;
