import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {

    if(await Student.isUserExists(studentData.id)){
            throw new Error('User already exists validated by static method')
    }
    const result = await Student.create(studentData); // build in static method
    return result;

//   const student = new Student(studentData);

//    if(await student.isUserExists(studentData.id)){
//      throw new Error('User already exists')
//    }

//   const result = await student.save(); // build in instance method
//   return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{$match:{id:id}}])
  return result;
};
const deletedStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, {isDeleted: true});
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deletedStudentsFromDB
};
