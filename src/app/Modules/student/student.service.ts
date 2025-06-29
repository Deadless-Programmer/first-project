import mongoose from 'mongoose';
import { Student } from './student.model';
import { TStudent } from './student.interface';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import status from 'http-status';
import QueryBuilder from '../../builder/QuearyBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  //   const queryObj ={...query}
  //   const studentSearchableFields = ['email', 'name.firstName', 'presentAddress']
  //    let searchTerm ='';

  //    if(query?.searchTerm){
  //     searchTerm = query?.searchTerm as string
  //    }

  //    const searchQueary = Student.find({
  //     $or:studentSearchableFields.map((field)=>({
  //         [field]:{$regex: searchTerm, $options:'i'}
  //     }))
  //   })

  //   // filtering

  //   const excludeFields=['searchTerm','sort','limit','page', 'fields']

  //   excludeFields.forEach(el=> delete queryObj[el])

  //   const FilterQuery =  searchQueary.find(queryObj)
  //     .populate('admissionSemester')
  //     .populate({
  //       path: 'academicDepartment',
  //       populate: {
  //         path: 'academicFaculty',
  //       },
  //     });

  //   let sort ="-createdAt";

  //   if(query.sort){
  //     sort=query.sort as string
  //   }

  //   const sortQuery =  FilterQuery.sort(sort);

  //   let limit= 1
  //   let page=1
  //   let skip =0;

  // if(query.limit){
  //     limit=query.limit as number;
  //   }

  //   if(query.page){
  //     page =Number(query.page)
  //     skip =(page-1)*limit
  //   }

  //   const paiginateQuery= sortQuery.skip(skip);

  //   const limitQuery = paiginateQuery.limit(limit)

  //   // fields limiting
  //  let fields="-__v";
  //  if(query.fields){
  //   fields=(query.fields as string).split(",").join(' ')
  //  }
  // const fieldsQueary = await limitQuery.select(fields)

  // return fieldsQueary;

  const studentQuery = new QueryBuilder(
    Student?.find().populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    ?.search(studentSearchableFields)
    ?.filter()
    .sort()
    ?.paginate()
    ?.fields();

  const result = await studentQuery.modelQuery;
  return result;
};
const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deletedStudentsFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(status.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedSUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedSUser) {
      throw new AppError(status.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deletedStudentsFromDB,
  updateStudentIntoDB,
};
