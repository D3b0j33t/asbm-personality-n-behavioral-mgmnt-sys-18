
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  subject: string;
  color: string;
  pendingAssignments?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  instructor,
  subject,
  color,
  pendingAssignments = 0,
}) => {
  return (
    <Link to={`/course/${id}`}>
      <Card className="course-card overflow-hidden border-t-4 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ borderTopColor: color }}>
        <CardHeader className={cn("bg-secondary/50 pb-2")}>
          <h3 className="text-lg font-bold tracking-tight line-clamp-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{subject}</p>
        </CardHeader>
        <CardContent className="pt-4 flex-1">
          <p className="text-sm">
            <span className="font-semibold">Instructor:</span> {instructor}
          </p>
          
          <div className="mt-4 flex items-center text-sm">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>25 students</span>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-secondary/20 flex justify-between pt-2">
          {pendingAssignments > 0 ? (
            <div className="flex items-center text-sm font-medium text-red-500">
              <FileText className="mr-1 h-4 w-4" />
              {pendingAssignments} pending
            </div>
          ) : (
            <div className="flex items-center text-sm text-muted-foreground">
              <FileText className="mr-1 h-4 w-4" />
              No pending work
            </div>
          )}
          <Button variant="ghost" size="sm">
            View
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
