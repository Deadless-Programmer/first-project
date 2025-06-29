import { RequestHandler } from 'express';

import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
 
   

    const result = await AcademicSemesterServices.createAcademicsemesterIntoDB(req.body)

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Accademic semester is created successfully',
      data: result,
    });
  
}
);


const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Accademic semester is retrieved successfully',
    data: result,
  });
});



const getSingleAcademicSemester = catchAsync(async(req, res)=>{
  const {semesterId}=req.params;
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
  sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Accademic semester is retrieved successfully',
      data: result,
    });
});


const updateAcademicSemester =catchAsync(async(req, res)=>{
  const {semesterId}= req.params;
  const result = await AcademicSemesterServices.UpadteAcademicSemesterIntoDB(semesterId,req.body);
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Accademic semester is retrieved successfully',
      data: result,
    });
})

export const AcademicSemesterControllers = {
  createAcademicSemester,getSingleAcademicSemester,updateAcademicSemester, getAllAcademicSemesters
};
