import express, { NextFunction, Request, Response } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controler';





const router = express.Router();



router.post('/create-academic-faculty', validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema),
 AcademicFacultyControllers.createAcademicFaculty);


 router.get('/:facultyId',  AcademicFacultyControllers.getSingleAcademicFaculty );


 router.patch('/:facultyId', validateRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema),
  AcademicFacultyControllers.updateAcademicFaculty);
 router.get('/', AcademicFacultyControllers.getAllAcademicFaculties)

export const AcademicFacultyRoutes = router;