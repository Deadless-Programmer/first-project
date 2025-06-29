import { RequestHandler } from 'express';

import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';



const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
 
   

    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body)

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Accademic department is created successfully',
      data: result,
    });
  
}
);


const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Accademic department is retrieved successfully',
    data: result,
  });
});



const getSingleAcademicDepartment = catchAsync(async(req, res)=>{
  const {departmentId}=req.params;
  const result = await AcademicDepartmentServices.getSingleAcademicDeparmentFromDB(departmentId);
  sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Accademic department is retrieved successfully',
      data: result,
    });
});


const updateAcademicDepartment =catchAsync(async(req, res)=>{
  const {departmentId}= req.params;
  const result = await AcademicDepartmentServices.UpadteAcademicDeparmentIntoDB(departmentId,req.body);
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Accademic department is updated successfully',
      data: result,
    });
})

export const AcademicDepartmentControllers = {
 createAcademicDepartment,getAllAcademicDepartments,getSingleAcademicDepartment, updateAcademicDepartment
};
