
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, BookOpen, BookText, Filter } from 'lucide-react';
import { mockCourses } from '@/utils/mockData';

const CourseListingPage = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  
  // Get all unique subjects for the filter
  const subjects = ['all', ...new Set(mockCourses.map(course => course.subject))];
  
  // Filter courses based on search term and subject filter
  useEffect(() => {
    let filtered = mockCourses;
    
    // Apply subject filter
    if (subjectFilter !== 'all') {
      filtered = filtered.filter(course => course.subject === subjectFilter);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        course => course.title.toLowerCase().includes(search) || 
                course.subject.toLowerCase().includes(search)
      );
    }
    
    setCourses(filtered);
  }, [searchTerm, subjectFilter]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Courses</h1>
          <p className="text-muted-foreground">Browse through our wide range of academic programs</p>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Statistics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-lg shadow-sm border border-blue-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-blue-800">Total Courses</h3>
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mt-2">{mockCourses.length}</p>
          <p className="text-sm text-blue-700 mt-1">Available for enrollment</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-lg shadow-sm border border-green-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-green-800">Subjects</h3>
            <BookText className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold mt-2">{subjects.length - 1}</p>
          <p className="text-sm text-green-700 mt-1">Different disciplines</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-6 rounded-lg shadow-sm border border-amber-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-amber-800">Undergraduate</h3>
            <Filter className="h-6 w-6 text-amber-600" />
          </div>
          <p className="text-3xl font-bold mt-2">{mockCourses.filter(c => c.title.includes('Bachelor')).length}</p>
          <p className="text-sm text-amber-700 mt-1">Bachelor programs</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-6 rounded-lg shadow-sm border border-purple-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-purple-800">Postgraduate</h3>
            <Filter className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mt-2">{mockCourses.filter(c => c.title.includes('Master')).length}</p>
          <p className="text-sm text-purple-700 mt-1">Master programs</p>
        </div>
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              instructor={course.instructor}
              subject={course.subject}
              color={course.color}
              pendingAssignments={course.pendingAssignments}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No courses found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter to find what you're looking for.</p>
            <Button onClick={() => {
              setSearchTerm('');
              setSubjectFilter('all');
            }}>Reset filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseListingPage;
