import express, { NextFunction, Request, Response } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { academicDeparmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controler';






const router = express.Router();



router.post('/create-academic-department', validateRequest(academicDeparmentValidation.createAcademicDepartmentValidationSchema),
 AcademicDepartmentControllers.createAcademicDepartment);


 router.get('/:departmentId',  AcademicDepartmentControllers.getSingleAcademicDepartment );


 router.patch('/:departmentId', validateRequest(academicDeparmentValidation.updateAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.updateAcademicDepartment);
  
 router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments)

export const AcademicDepartmentRoutes = router;