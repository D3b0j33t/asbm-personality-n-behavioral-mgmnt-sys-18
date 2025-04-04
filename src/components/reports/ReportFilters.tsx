
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface ReportFiltersProps {
  selectedStudent: string;
  setSelectedStudent: (value: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  selectedStudent,
  setSelectedStudent,
  selectedPeriod,
  setSelectedPeriod
}) => {
  return (
    <div className="mt-4 sm:mt-0 flex gap-4">
      <Select value={selectedStudent} onValueChange={setSelectedStudent}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select student" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Students</SelectItem>
          <SelectItem value="rahul">Rahul Sharma</SelectItem>
          <SelectItem value="priya">Priya Patel</SelectItem>
          <SelectItem value="amit">Amit Kumar</SelectItem>
        </SelectContent>
      </Select>
      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Time period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="month">Current Month</SelectItem>
          <SelectItem value="semester">Current Semester</SelectItem>
          <SelectItem value="year">Academic Year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ReportFilters;
