import { RequestHandler } from 'express';

import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';


const createAcademicFaculty: RequestHandler = catchAsync(
  async (req, res) => {
 
   

    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body)

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Accademic faculty is created successfully',
      data: result,
    });
  
}
);


const getAllAcademicFaculties = catchAsync(async (req, res) => {
 
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Accademic faculty is retrieved successfully',
    data: result,
  });
});



const getSingleAcademicFaculty = catchAsync(async(req, res)=>{
  const {facultyId}=req.params;
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
  sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Accademic faculty is retrieved successfully',
      data: result,
    });
});


const updateAcademicFaculty =catchAsync(async(req, res)=>{
  const {facultyId}= req.params;
  const result = await AcademicFacultyServices.UpadteAcademicFacultyIntoDB(facultyId,req.body);
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Accademic faculty is updated successfully',
      data: result,
    });
})

export const AcademicFacultyControllers = {
 createAcademicFaculty,getAllAcademicFaculties,getSingleAcademicFaculty, updateAcademicFaculty
};
