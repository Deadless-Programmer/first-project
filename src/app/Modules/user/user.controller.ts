import { RequestHandler } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(
  async (req, res) => {
 
    const { password, student: studentData } = req.body;
//  console.log(password)
    const result = await UserService.createStudentIntoDB(password, studentData);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  
}
)

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password,facultyData, );

  sendResponse(res, {
     statusCode: status.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});


const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(
    // req.file,
    password,
    adminData,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});







export const UserControllers = {
  createStudent,createFaculty, createAdmin
};
