import { Router } from 'express';
import { UserRoutes } from '../Modules/user/user.route';
import { StudentRoutes } from '../Modules/student/student.route';
import { AcademicSemesterRoutes } from '../Modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../Modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../Modules/academicDepartment/academicDepartment.route';
import { CourseRoutes } from '../Modules/course/course.route';
import { FacultyRoutes } from '../Modules/Faculty/faculty.route';
import { semesterRegistrationRoutes } from '../Modules/semesterRegistration/semesterRegistration.route';
import { offeredCourseRoutes } from '../Modules/offeredCourse/OfferedCourse.route';
import { AuthRoutes } from '../Modules/auth/auth.route';
import { EnrolledCourseRoutes } from '../Modules/EnrolledCourse/enrolledCourse.route';

const router = Router();

const moduleRoutes = [
   {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },

    {
    path: '/faculties',
    route: FacultyRoutes,
  },
 
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },


   {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },

   {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
   {
    path: '/auth',
    route: AuthRoutes,
  },
   {
    path: '/enrolled-courses',
    route: EnrolledCourseRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/students', StudentRoutes)
// router.use('/users', UserRoutes)

export default router;
