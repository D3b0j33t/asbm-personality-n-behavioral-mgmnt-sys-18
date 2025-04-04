
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#4285F4', '#0F9D58', '#F4B400', '#DB4437'];

const performanceData = [
  { name: 'On Time Assignments', value: 82 },
  { name: 'Participation', value: 78 },
  { name: 'Behavior', value: 90 },
  { name: 'Academic', value: 85 },
];

const PerformanceMetrics = () => {
  const total = performanceData.reduce((sum, item) => sum + item.value, 0);
  const average = Math.round(total / performanceData.length);
  
  return (
    <Card className="shadow-md border-none">
      <CardHeader className="bg-gray-50 border-b pb-3">
        <CardTitle className="text-xl">Performance Metrics</CardTitle>
        <CardDescription>Overall student performance across key areas</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[400px] w-full">
          <ChartContainer 
            config={{
              OnTimeAssignments: { color: "#4285F4" },
              Participation: { color: "#0F9D58" },
              Behavior: { color: "#F4B400" },
              Academic: { color: "#DB4437" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="block text-4xl font-bold text-primary">{average}%</span>
                <span className="text-sm text-gray-500">Average Score</span>
              </div>
            </div>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
