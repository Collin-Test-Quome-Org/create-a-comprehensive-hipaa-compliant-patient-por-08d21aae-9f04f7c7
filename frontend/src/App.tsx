import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Providers } from './Providers';
// Pages
import { HomePage } from '@/pages/index';
import { PrescriptionsPage } from '@/pages/PrescriptionsPage';
import { PrescriptionDetailPage } from '@/pages/PrescriptionDetailPage';
import { MedicalRecordsPage } from '@/pages/MedicalRecordsPage';
import { MedicalRecordDetailPage } from '@/pages/MedicalRecordDetailPage';
import { MessagesPage } from '@/pages/MessagesPage';
import { MessageThreadPage } from '@/pages/MessageThreadPage';
import { NewMessagePage } from '@/pages/NewMessagePage';
import { SupportPage } from '@/pages/SupportPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { StaffAppointmentsPage } from '@/pages/StaffAppointmentsPage';
import { StaffAppointmentDetailPage } from '@/pages/StaffAppointmentDetailPage';
import { StaffPatientListPage } from '@/pages/StaffPatientListPage';
import { StaffPatientProfilePage } from '@/pages/StaffPatientProfilePage';
import { StaffPrescriptionsPage } from '@/pages/StaffPrescriptionsPage';
import { StaffPrescriptionDetailPage } from '@/pages/StaffPrescriptionDetailPage';
import { StaffDocumentsPage } from '@/pages/StaffDocumentsPage';
import { StaffNotificationsPage } from '@/pages/StaffNotificationsPage';
import { AdminSettingsPage } from '@/pages/AdminSettingsPage';
import { AdminUsersPage } from '@/pages/AdminUsersPage';
import { AdminAuditLogsPage } from '@/pages/AdminAuditLogsPage';
import { TermsPage } from '@/pages/TermsPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function App() {
  return (
    <Router>
      <Providers>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/prescriptions" element={<PrescriptionsPage />} />
              <Route path="/prescriptions/:id" element={<PrescriptionDetailPage />} />
              <Route path="/medical-records" element={<MedicalRecordsPage />} />
              <Route path="/medical-records/:id" element={<MedicalRecordDetailPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/messages/new" element={<NewMessagePage />} />
              <Route path="/messages/thread/:id" element={<MessageThreadPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/staff/appointments" element={<StaffAppointmentsPage />} />
              <Route path="/staff/appointments/:id" element={<StaffAppointmentDetailPage />} />
              <Route path="/staff/patients" element={<StaffPatientListPage />} />
              <Route path="/staff/patients/:id" element={<StaffPatientProfilePage />} />
              <Route path="/staff/prescriptions" element={<StaffPrescriptionsPage />} />
              <Route path="/staff/prescriptions/:id" element={<StaffPrescriptionDetailPage />} />
              <Route path="/staff/documents" element={<StaffDocumentsPage />} />
              <Route path="/staff/notifications" element={<StaffNotificationsPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
        </div>
      </Providers>
    </Router>
  );
}
