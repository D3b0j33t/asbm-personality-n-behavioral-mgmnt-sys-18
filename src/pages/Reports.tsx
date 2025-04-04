
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import OverviewStats from '@/components/reports/OverviewStats';
import ReportFilters from '@/components/reports/ReportFilters';
import ReportTabs from '@/components/reports/ReportTabs';

const Reports = () => {
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('semester');

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Behavioral Reports</h1>
              <p className="text-muted-foreground">Track student behavior and performance metrics</p>
            </div>
            <ReportFilters
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
            />
          </div>

          <OverviewStats />
          <ReportTabs />
        </div>
      </main>
    </div>
  );
};

export default Reports;
