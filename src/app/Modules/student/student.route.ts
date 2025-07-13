import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();



router.get('/',auth(USER_ROLE.superAdmin, USER_ROLE.admin), StudentController.getAllStudents);

router.patch('/:studentId', auth(USER_ROLE.superAdmin, USER_ROLE.admin), validateRequest(studentValidations.updateStudentValidationSchema), StudentController.updateStudent);
router.get('/:studentId', auth(USER_ROLE.superAdmin, USER_ROLE.admin), StudentController.getSingleStudent);

router.delete('/:studentId', auth(USER_ROLE.superAdmin, USER_ROLE.admin), StudentController.deleteStudent);

export const StudentRoutes = router;
