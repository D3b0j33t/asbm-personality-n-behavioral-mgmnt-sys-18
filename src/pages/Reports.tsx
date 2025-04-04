
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import OverviewStats from '@/components/reports/OverviewStats';
import ReportFilters from '@/components/reports/ReportFilters';
import ReportTabs from '@/components/reports/ReportTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { DownloadIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import DynamicChart from '@/components/charts/DynamicChart';

const Reports = () => {
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefreshData = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data refreshed",
        description: "Report data has been updated with latest information.",
      });
    }, 1500);
  };

  const handleExportReport = () => {
    toast({
      title: "Report exported",
      description: "Your report has been downloaded successfully.",
    });
  };

  const currentDate = format(new Date(), 'MMMM d, yyyy');

  return (
    <PageLayout backgroundImage="/lovable-uploads/7afce98d-f21c-40c0-a054-0b0431ca10c9.png">
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Behavioral Reports</h1>
            <p className="text-white">Track student behavior and performance metrics</p>
            <p className="text-sm text-white/70 mt-1">Last updated: {currentDate}</p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
            <ReportFilters
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
            />
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleRefreshData}
                disabled={isRefreshing}
                className="bg-white"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleExportReport}
                className="bg-white"
              >
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 animate-fade-in">
          <Card className="bg-white/95 backdrop-blur-lg shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Report Summary</CardTitle>
              <CardDescription>
                {selectedStudent === 'all' 
                  ? 'Overall behavioral statistics for all students' 
                  : `Detailed behavioral statistics for ${selectedStudent.charAt(0).toUpperCase() + selectedStudent.slice(1)}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  <TabsTrigger value="behavior">Behavior</TabsTrigger>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-0">
                  <OverviewStats />
                </TabsContent>
                
                <TabsContent value="attendance" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DynamicChart 
                      type="line" 
                      title="Attendance Trends" 
                      description="Monthly attendance percentage trends"
                      dataKey="attendance"
                      secondaryDataKey="average"
                      height={300}
                    />
                    <DynamicChart 
                      type="pie" 
                      title="Attendance Distribution" 
                      description="Distribution of attendance across courses"
                      height={300}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="behavior" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DynamicChart 
                      type="bar" 
                      title="Behavior Incidents" 
                      description="Monthly behavioral incidents"
                      dataKey="minor"
                      secondaryDataKey="major"
                      height={300}
                    />
                    <DynamicChart 
                      type="radialBar" 
                      title="Behavior Score Distribution" 
                      description="Distribution of behavior scores"
                      height={300}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="academic" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DynamicChart 
                      type="area" 
                      title="Academic Performance" 
                      description="Monthly academic performance"
                      dataKey="score"
                      secondaryDataKey="average"
                      height={300}
                    />
                    <DynamicChart 
                      type="bar" 
                      title="Subject Performance" 
                      description="Performance across different subjects"
                      height={300}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <ReportTabs />
        </div>
      </div>
    </PageLayout>
  );
};

export default Reports;
