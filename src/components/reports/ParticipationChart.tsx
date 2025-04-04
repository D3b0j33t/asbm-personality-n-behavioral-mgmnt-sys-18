
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

// Mock participation data for demonstration
const participationData = [
  { month: 'Jan', participation: 75 },
  { month: 'Feb', participation: 80 },
  { month: 'Mar', participation: 85 },
  { month: 'Apr', participation: 70 },
  { month: 'May', participation: 90 },
  { month: 'Jun', participation: 88 },
];

const ParticipationChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Participation</CardTitle>
        <CardDescription>Monthly class participation scores</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ChartContainer 
            config={{
              participation: { color: "#0F9D58" },
            }}
          >
            <BarChart data={participationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar 
                dataKey="participation" 
                name="Participation Score" 
                fill="#0F9D58" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipationChart;
