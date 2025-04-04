
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import DynamicChart from '@/components/charts/DynamicChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, LineChart, PieChart, ArrowUp, ArrowDown, BookOpen,
  Clock, CheckCircle, AlertTriangle, BookText, BookMarked, Medal 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const StudentAnalytics = () => {
  const [refreshingChart, setRefreshingChart] = useState<string | null>(null);
  
  const handleRefreshChart = (chartId: string) => {
    setRefreshingChart(chartId);
    setTimeout(() => setRefreshingChart(null), 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Student Analytics</h1>
            <p className="text-muted-foreground">Track your academic performance and progress</p>
          </div>
          
          <Button>
            Download Reports
          </Button>
        </div>
        
        {/* Performance metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="overflow-hidden border-t-4 border-t-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall GPA</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold">3.8</h3>
                    <span className="ml-2 text-xs font-medium text-green-600 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      0.2
                    </span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Medal className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <Progress value={90} className="mt-4 h-1" />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-t-4 border-t-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold">92%</h3>
                    <span className="ml-2 text-xs font-medium text-green-600 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      3%
                    </span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <Progress value={92} className="mt-4 h-1" />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-t-4 border-t-amber-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assignment Completion</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold">85%</h3>
                    <span className="ml-2 text-xs font-medium text-red-600 flex items-center">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      2%
                    </span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <Progress value={85} className="mt-4 h-1" />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-t-4 border-t-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overdue Tasks</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold">3</h3>
                    <span className="ml-2 text-xs font-medium text-amber-600 flex items-center">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      1
                    </span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                <span>2 assignments</span>
                <span>1 quiz</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="academic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="academic" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Academic</span>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center gap-2">
              <BookText className="h-4 w-4" />
              <span>Assignments</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BookMarked className="h-4 w-4" />
              <span>Progress</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Academic performance tab */}
          <TabsContent value="academic" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleRefreshChart('gpa-trend')}
                  disabled={refreshingChart === 'gpa-trend'}
                >
                  <span className={`h-4 w-4 ${refreshingChart === 'gpa-trend' ? 'animate-spin' : ''}`}>↻</span>
                </Button>
                <DynamicChart
                  type="line"
                  title="GPA Trend"
                  description="Your semester GPA over time"
                  dataKey="gpa"
                  secondaryDataKey="classAvg"
                />
              </div>
              
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleRefreshChart('attendance-trend')}
                  disabled={refreshingChart === 'attendance-trend'}
                >
                  <span className={`h-4 w-4 ${refreshingChart === 'attendance-trend' ? 'animate-spin' : ''}`}>↻</span>
                </Button>
                <DynamicChart
                  type="area"
                  title="Attendance Trend"
                  description="Your monthly attendance percentage"
                  dataKey="attendance"
                  secondaryDataKey="classAvg"
                  colors={['#0F9D58', '#9AA0A6']}
                />
              </div>
              
              <div className="relative lg:col-span-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleRefreshChart('subject-performance')}
                  disabled={refreshingChart === 'subject-performance'}
                >
                  <span className={`h-4 w-4 ${refreshingChart === 'subject-performance' ? 'animate-spin' : ''}`}>↻</span>
                </Button>
                <DynamicChart
                  type="bar"
                  title="Subject Performance"
                  description="Your performance across different subjects"
                  dataKey="score"
                  secondaryDataKey="avgScore"
                  colors={['#4285F4', '#9AA0A6']}
                  height={350}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Assignments tab */}
          <TabsContent value="assignments" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="relative lg:col-span-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleRefreshChart('assignment-scores')}
                  disabled={refreshingChart === 'assignment-scores'}
                >
                  <span className={`h-4 w-4 ${refreshingChart === 'assignment-scores' ? 'animate-spin' : ''}`}>↻</span>
                </Button>
                <DynamicChart
                  type="line"
                  title="Assignment Scores"
                  description="Your recent assignment scores"
                  dataKey="score"
                  secondaryDataKey="avgScore"
                  colors={['#DB4437', '#9AA0A6']}
                  height={350}
                />
              </div>
              
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleRefreshChart('assignment-status')}
                  disabled={refreshingChart === 'assignment-status'}
                >
                  <span className={`h-4 w-4 ${refreshingChart === 'assignment-status' ? 'animate-spin' : ''}`}>↻</span>
                </Button>
                <DynamicChart
                  type="pie"
                  title="Assignment Status"
                  description="Distribution of your assignments"
                  colors={['#4285F4', '#0F9D58', '#DB4437', '#F4B400']}
                  height={350}
                />
              </div>
              
              <div className="relative lg:col-span-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleRefreshChart('submission-timing')}
                  disabled={refreshingChart === 'submission-timing'}
                >
                  <span className={`h-4 w-4 ${refreshingChart === 'submission-timing' ? 'animate-spin' : ''}`}>↻</span>
                </Button>
                <DynamicChart
                  type="bar"
                  title="Submission Timing"
                  description="When you typically submit assignments relative to deadlines"
                  dataKey="count"
                  colors={['#673AB7']}
                  height={300}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Progress tab */}
          <TabsContent value="progress" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleRefreshChart('course-completion')}
                  disabled={refreshingChart === 'course-completion'}
                >
                  <span className={`h-4 w-4 ${refreshingChart === 'course-completion' ? 'animate-spin' : ''}`}>↻</span>
                </Button>
                <DynamicChart
                  type="radialBar"
                  title="Course Completion"
                  description="Progress across your courses"
                  colors={['#4285F4', '#0F9D58', '#DB4437', '#F4B400']}
                  height={350}
                />
              </div>
              
              <div className="relative lg:col-span-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleRefreshChart('skill-growth')}
                  disabled={refreshingChart === 'skill-growth'}
                >
                  <span className={`h-4 w-4 ${refreshingChart === 'skill-growth' ? 'animate-spin' : ''}`}>↻</span>
                </Button>
                <DynamicChart
                  type="area"
                  title="Skill Growth Over Time"
                  description="Improvement in key competency areas"
                  dataKey="rating"
                  secondaryDataKey="benchmark"
                  colors={['#0F9D58', '#9AA0A6']}
                  height={350}
                />
              </div>
              
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Credit Completion Progress</CardTitle>
                    <CardDescription>Track your progress toward your degree requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Overall Credit Completion</span>
                          <span className="text-sm font-medium">75 / 120 credits (62.5%)</span>
                        </div>
                        <Progress value={62.5} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h3 className="text-sm font-medium mb-2">Core Courses</h3>
                          <Progress value={75} className="h-2 mb-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>30 / 40 credits</span>
                            <span>75%</span>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h3 className="text-sm font-medium mb-2">Major Requirements</h3>
                          <Progress value={60} className="h-2 mb-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>24 / 40 credits</span>
                            <span>60%</span>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h3 className="text-sm font-medium mb-2">Electives</h3>
                          <Progress value={52.5} className="h-2 mb-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>21 / 40 credits</span>
                            <span>52.5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentAnalytics;
