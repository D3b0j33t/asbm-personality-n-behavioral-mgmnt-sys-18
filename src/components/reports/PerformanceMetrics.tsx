
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

interface ChartConfig {
  [key: string]: {
    color: string;
  };
}

const PerformanceMetrics = () => {
  const chartConfig: ChartConfig = {
    OnTimeAssignments: { color: "#4CAF50" },
    Participation: { color: "#2196F3" },
    Behavior: { color: "#FFC107" },
    Academic: { color: "#9C27B0" }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Student performance across key metrics</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer 
          config={chartConfig}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4CAF50]" />
                <div className="text-sm font-medium">On-Time Assignments</div>
              </div>
              <div className="mt-2 text-2xl font-bold">92%</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2196F3]" />
                <div className="text-sm font-medium">Class Participation</div>
              </div>
              <div className="mt-2 text-2xl font-bold">78%</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFC107]" />
                <div className="text-sm font-medium">Behavior Score</div>
              </div>
              <div className="mt-2 text-2xl font-bold">85%</div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#9C27B0]" />
                <div className="text-sm font-medium">Academic Performance</div>
              </div>
              <div className="mt-2 text-2xl font-bold">88%</div>
            </div>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
