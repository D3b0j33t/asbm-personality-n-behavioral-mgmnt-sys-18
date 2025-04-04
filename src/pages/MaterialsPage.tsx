
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, FileText, Video, BookOpen, PlusCircle, Download, Folder, File } from 'lucide-react';
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

const MaterialsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const materials = [
    {
      id: 1,
      title: 'Introduction to Programming - Lecture Notes',
      course: 'Introduction to Programming',
      uploadedBy: 'Prof. Amit Kumar',
      uploadedAt: '2023-06-01T10:30:00',
      type: 'pdf',
      size: '2.4 MB',
      downloads: 45
    },
    {
      id: 2,
      title: 'Data Structures Lecture Recording - Week 1',
      course: 'Data Structures and Algorithms',
      uploadedBy: 'Dr. Priya Sharma',
      uploadedAt: '2023-06-02T14:15:00',
      type: 'video',
      size: '340 MB',
      downloads: 32
    },
    {
      id: 3,
      title: 'Database Design - Required Reading',
      course: 'Database Management Systems',
      uploadedBy: 'Prof. Rajesh Verma',
      uploadedAt: '2023-06-03T09:45:00',
      type: 'pdf',
      size: '5.7 MB',
      downloads: 28
    },
    {
      id: 4,
      title: 'AI Ethics Case Studies',
      course: 'Artificial Intelligence',
      uploadedBy: 'Dr. Meera Patel',
      uploadedAt: '2023-06-05T11:20:00',
      type: 'doc',
      size: '3.2 MB',
      downloads: 19
    },
    {
      id: 5,
      title: 'Lab Exercise Templates - Week 2',
      course: 'Computer Networks',
      uploadedBy: 'Prof. Suresh Reddy',
      uploadedAt: '2023-06-08T16:30:00',
      type: 'zip',
      size: '8.5 MB',
      downloads: 22
    },
  ];

  const folders = [
    {
      id: 1,
      name: 'Lecture Notes',
      itemCount: 15,
      lastUpdated: '2023-06-10T10:30:00'
    },
    {
      id: 2,
      name: 'Readings',
      itemCount: 8,
      lastUpdated: '2023-06-08T14:15:00'
    },
    {
      id: 3,
      name: 'Assignments',
      itemCount: 5,
      lastUpdated: '2023-06-09T09:45:00'
    },
    {
      id: 4,
      name: 'Lecture Recordings',
      itemCount: 10,
      lastUpdated: '2023-06-07T11:20:00'
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

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'doc':
        return <FileText className="h-5 w-5 text-blue-700" />;
      case 'zip':
        return <File className="h-5 w-5 text-yellow-500" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const filteredMaterials = materials.filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Course Materials</h1>
          <p className="text-muted-foreground">
            Access and manage lecture notes, readings, and resources
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            New Folder
          </Button>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Upload Material
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search course materials..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="by-course">By Course</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Title</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaterials.map(material => (
                    <TableRow key={material.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getFileIcon(material.type)}
                          <span>{material.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{material.course}</TableCell>
                      <TableCell>{material.uploadedBy}</TableCell>
                      <TableCell>{formatDate(material.uploadedAt)}</TableCell>
                      <TableCell>{material.size}</TableCell>
                      <TableCell>{material.downloads}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">Actions</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="folders" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders.map(folder => (
              <Card key={folder.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Folder className="h-10 w-10 text-blue-500" />
                    <div>
                      <h3 className="font-medium">{folder.name}</h3>
                      <p className="text-sm text-muted-foreground">{folder.itemCount} items</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {formatDate(folder.lastUpdated)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recent" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Added Materials</CardTitle>
              <CardDescription>Materials added in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Recent materials will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="by-course" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Materials by Course</CardTitle>
              <CardDescription>Select a course to view its materials</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Course-specific materials will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialsPage;
