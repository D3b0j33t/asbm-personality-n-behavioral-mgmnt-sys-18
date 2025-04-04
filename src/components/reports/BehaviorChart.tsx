
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

// Mock behavioral incidents data for demonstration
const behavioralIncidentsData = [
  { month: 'Jan', minor: 5, major: 1 },
  { month: 'Feb', minor: 3, major: 0 },
  { month: 'Mar', minor: 4, major: 2 },
  { month: 'Apr', minor: 2, major: 0 },
  { month: 'May', minor: 1, major: 0 },
  { month: 'Jun', minor: 0, major: 0 },
];

const BehaviorChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Behavioral Incidents</CardTitle>
        <CardDescription>Monthly record of behavioral incidents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ChartContainer 
            config={{
              minor: { color: "#F4B400" },
              major: { color: "#DB4437" },
            }}
          >
            <BarChart data={behavioralIncidentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="minor" name="Minor Incidents" fill="#F4B400" />
              <Bar dataKey="major" name="Major Incidents" fill="#DB4437" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BehaviorChart;
