
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import CourseListingPage from './pages/CourseListingPage';
import CourseDetailPage from './pages/CourseDetailPage';
import StudentAnalytics from './pages/StudentAnalytics';
import StudentDetail from './pages/StudentDetail';
import CalendarPage from './pages/Calendar';
import Reports from './pages/Reports';

// Define routes configuration
export const routes = [
  {
    path: '/',
    element: <CourseListingPage />
  },
  {
    path: '/admin',
    element: <AdminPanel />
  },
  {
    path: '/courses',
    element: <CourseListingPage />
  },
  {
    path: '/course/:courseId',
    element: <CourseDetailPage />
  },
  {
    path: '/studentanalytics',
    element: <StudentAnalytics />
  },
  {
    path: '/student/:studentId',
    element: <StudentDetail />
  },
  {
    path: '/calendar',
    element: <CalendarPage />
  },
  {
    path: '/reports',
    element: <Reports />
  },
  {
    // Fallback route - redirect to dashboard if no match
    path: '*',
    element: <Navigate to="/" replace />
  }
];
