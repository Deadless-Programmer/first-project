import express, { NextFunction, Request, Response } from 'express';
import { AcademicSemesterControllers } from './academicsemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicsemesterValidations } from './academicSemester.validation';




const router = express.Router();



router.post('/create-academic-semester', validateRequest(academicsemesterValidations.createAcademicsemesterValidationSchema),
 AcademicSemesterControllers.createAcademicSemester);


 router.get('/:semesterId',  AcademicSemesterControllers.getSingleAcademicSemester );
 router.patch('/:semesterId', validateRequest(academicsemesterValidations.updateAcademicSemesterValidatoinSchema),
  AcademicSemesterControllers.updateAcademicSemester);
 router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)

export const AcademicSemesterRoutes = router;