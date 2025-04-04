
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import CourseListingPage from './pages/CourseListingPage';
import CourseDetailPage from './pages/CourseDetailPage';
import StudentAnalytics from './pages/StudentAnalytics';
import StudentDetail from './pages/StudentDetail';
import CalendarPage from './pages/Calendar';
import Reports from './pages/Reports';
import PageLayout from './components/PageLayout';
import AnnouncementsPage from './pages/AnnouncementsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import DiscussionsPage from './pages/DiscussionsPage';
import MaterialsPage from './pages/MaterialsPage';
import GradesPage from './pages/GradesPage';
import SettingsPage from './pages/SettingsPage';
import HelpCenterPage from './pages/HelpCenterPage';
import RecentActivityPage from './pages/RecentActivityPage';

// Define routes configuration with consistent layout
export const routes = [
  {
    path: '/',
    element: (
      <PageLayout>
        <CourseListingPage />
      </PageLayout>
    )
  },
  {
    path: '/admin',
    element: (
      <PageLayout>
        <AdminPanel />
      </PageLayout>
    )
  },
  {
    path: '/courses',
    element: (
      <PageLayout>
        <CourseListingPage />
      </PageLayout>
    )
  },
  {
    path: '/course/:courseId',
    element: (
      <PageLayout>
        <CourseDetailPage />
      </PageLayout>
    )
  },
  {
    path: '/studentanalytics',
    element: (
      <PageLayout>
        <StudentAnalytics />
      </PageLayout>
    )
  },
  {
    path: '/student/:studentId',
    element: (
      <PageLayout>
        <StudentDetail />
      </PageLayout>
    )
  },
  {
    path: '/calendar',
    element: (
      <PageLayout>
        <CalendarPage />
      </PageLayout>
    )
  },
  {
    path: '/reports',
    element: (
      <PageLayout backgroundImage="/lovable-uploads/7afce98d-f21c-40c0-a054-0b0431ca10c9.png">
        <Reports />
      </PageLayout>
    )
  },
  // New Google Classroom-like pages
  {
    path: '/announcements',
    element: (
      <PageLayout>
        <AnnouncementsPage />
      </PageLayout>
    )
  },
  {
    path: '/assignments',
    element: (
      <PageLayout>
        <AssignmentsPage />
      </PageLayout>
    )
  },
  {
    path: '/discussions',
    element: (
      <PageLayout>
        <DiscussionsPage />
      </PageLayout>
    )
  },
  {
    path: '/materials',
    element: (
      <PageLayout>
        <MaterialsPage />
      </PageLayout>
    )
  },
  {
    path: '/grades',
    element: (
      <PageLayout>
        <GradesPage />
      </PageLayout>
    )
  },
  {
    path: '/settings',
    element: (
      <PageLayout>
        <SettingsPage />
      </PageLayout>
    )
  },
  {
    path: '/help',
    element: (
      <PageLayout>
        <HelpCenterPage />
      </PageLayout>
    )
  },
  {
    path: '/recent',
    element: (
      <PageLayout>
        <RecentActivityPage />
      </PageLayout>
    )
  },
  {
    // Fallback route - redirect to dashboard if no match
    path: '*',
    element: <Navigate to="/" replace />
  }
];
