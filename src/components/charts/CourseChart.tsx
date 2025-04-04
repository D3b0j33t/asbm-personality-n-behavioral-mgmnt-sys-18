
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, LineChart, PieChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CourseChartProps {
  courseId: number;
  height?: number;
}

const generateRandomData = () => {
  // Assignment Completion Rate
  const assignmentData = Array.from({ length: 10 }, (_, i) => ({
    name: `Assignment ${i + 1}`,
    completed: Math.floor(Math.random() * 40) + 60, // 60-100
  }));

  // Attendance Data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const attendanceData = months.slice(0, 6).map(month => ({
    name: month,
    attendance: Math.floor(Math.random() * 30) + 70, // 70-100
    average: 85,
  }));

  // Grade Distribution
  const gradeDistribution = [
    { name: 'A', value: Math.floor(Math.random() * 20) + 10 },
    { name: 'B', value: Math.floor(Math.random() * 20) + 15 },
    { name: 'C', value: Math.floor(Math.random() * 15) + 10 },
    { name: 'D', value: Math.floor(Math.random() * 10) + 5 },
    { name: 'F', value: Math.floor(Math.random() * 5) + 1 },
  ];

  // Engagement Metrics
  const engagementData = months.slice(0, 6).map(month => ({
    name: month,
    participation: Math.floor(Math.random() * 40) + 60,
    assignments: Math.floor(Math.random() * 30) + 70,
    quizzes: Math.floor(Math.random() * 35) + 65,
  }));

  return { assignmentData, attendanceData, gradeDistribution, engagementData };
};

const COLORS = ['#4285F4', '#0F9D58', '#DB4437', '#F4B400', '#673AB7'];

const CourseChart: React.FC<CourseChartProps> = ({ courseId, height = 350 }) => {
  const [data, setData] = useState(() => generateRandomData());

  useEffect(() => {
    // This would typically fetch data for the specific course
    setData(generateRandomData());
  }, [courseId]);

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Course Analytics</CardTitle>
        <CardDescription>Key performance metrics for this course</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="attendance" className="w-full">
          <TabsList className="mb-4 grid grid-cols-4">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="attendance" className="mt-0">
            <div className="h-[350px]">
              <ChartContainer
                config={{
                  attendance: { color: "#4285F4", label: "Attendance %" },
                  average: { color: "#DB4437", label: "Class Average" },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      name="Attendance %" 
                      stroke="#4285F4" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="average" 
                      name="Class Average" 
                      stroke="#DB4437" 
                      strokeDasharray="5 5"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="assignments" className="mt-0">
            <div className="h-[350px]">
              <ChartContainer
                config={{
                  completed: { color: "#0F9D58", label: "Completion Rate %" },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.assignmentData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar 
                      dataKey="completed" 
                      name="Completion Rate %" 
                      fill="#0F9D58"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="grades" className="mt-0">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value} students`, `Grade ${name}`]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="mt-0">
            <div className="h-[350px]">
              <ChartContainer
                config={{
                  participation: { color: "#4285F4", label: "Class Participation" },
                  assignments: { color: "#0F9D58", label: "Assignments Submitted" },
                  quizzes: { color: "#F4B400", label: "Quiz Performance" },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="participation" 
                      stroke="#4285F4" 
                      strokeWidth={2} 
                      dot={{ r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="assignments" 
                      stroke="#0F9D58" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="quizzes" 
                      stroke="#F4B400" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CourseChart;
