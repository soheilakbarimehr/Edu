import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ManageProducts } from './store/ManageProducts';
import { CreateProduct } from './store/CreateProduct';
import { SalesReport } from './store/SalesReport';
import { CoursesList } from './courses/CoursesList';
import { CreateCourse } from './courses/CreateCourse';
import { CourseSalesReport } from './courses/CourseSalesReport';
import { RegularUsers } from './users/RegularUsers';
import { PremiumUsers } from './users/PremiumUsers';
import { CreateUser } from './users/CreateUser';
import { ManageExams } from './exams/ManageExams';
import { CreateExam } from './exams/CreateExam';
import { PreviousExams } from './exams/PreviousExams';
import { ExamReports } from './exams/ExamReports';
import { AdminHome } from './AdminHome';

export function AdminDashboard() {
  return (
    <Routes>
      <Route path="/" element={
        <AdminLayout>
          <AdminHome />
        </AdminLayout>
      } />
      <Route path="store/manage" element={
        <AdminLayout showPagination>
          <ManageProducts />
        </AdminLayout>
      } />
      <Route path="store/create" element={
        <AdminLayout>
          <CreateProduct />
        </AdminLayout>
      } />
      <Route path="store/sales" element={
        <AdminLayout>
          <SalesReport />
        </AdminLayout>
      } />
      <Route path="courses/list" element={
        <AdminLayout showPagination>
          <CoursesList />
        </AdminLayout>
      } />
      <Route path="courses/create" element={
        <AdminLayout>
          <CreateCourse />
        </AdminLayout>
      } />
      <Route path="courses/sales" element={
        <AdminLayout>
          <CourseSalesReport />
        </AdminLayout>
      } />
      <Route path="users/regular" element={
        <AdminLayout showPagination>
          <RegularUsers />
        </AdminLayout>
      } />
      <Route path="users/premium" element={
        <AdminLayout showPagination>
          <PremiumUsers />
        </AdminLayout>
      } />
      <Route path="users/create" element={
        <AdminLayout>
          <CreateUser />
        </AdminLayout>
      } />
      <Route path="exams/manage" element={
        <AdminLayout showPagination>
          <ManageExams />
        </AdminLayout>
      } />
      <Route path="exams/create" element={
        <AdminLayout>
          <CreateExam />
        </AdminLayout>
      } />
      <Route path="exams/previous" element={
        <AdminLayout showPagination>
          <PreviousExams />
        </AdminLayout>
      } />
      <Route path="exams/reports" element={
        <AdminLayout>
          <ExamReports />
        </AdminLayout>
      } />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}