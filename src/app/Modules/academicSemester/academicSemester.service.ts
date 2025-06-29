import status from 'http-status';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import AppError from '../../errors/AppError';

const createAcademicsemesterIntoDB = async (payload: TAcademicSemester) => {
  

//   const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
//     Autumn: '01',
//     Summer: '02',
//     Fall: '03',
//   };

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError( status.NOT_FOUND, 'This Department does not exist')
  }

  const result = await AcademicSemester.create(payload);
  return result;
};


const getAllAcademicSemesterFromDB = async()=>{
    const result = await AcademicSemester.find();
    return result
};



const getSingleAcademicSemesterFromDB = async(id:string)=>{
    const result = await AcademicSemester.findById(id);
    return result;
};


const UpadteAcademicSemesterIntoDB = async(id:string, payload:Partial<TAcademicSemester>)=>{

    if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name]!==payload.code){
       throw new AppError( status.NOT_FOUND, 'This Department does not exist')
    }

    const result =await AcademicSemester.findOneAndUpdate({_id:id},payload,{new :true});
    return result
}


export const AcademicSemesterServices = {
  createAcademicsemesterIntoDB,getAllAcademicSemesterFromDB,getSingleAcademicSemesterFromDB,UpadteAcademicSemesterIntoDB
};



