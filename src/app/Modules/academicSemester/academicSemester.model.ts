import { Schema, model } from 'mongoose';
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from './academicSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';
import status from 'http-status';
import AppError from '../../errors/AppError';



const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterName,
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    enum: AcademicSemesterCode,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: { // corrected from "endtMonth"
    type: String,
    enum: Months,
    required: true,
  },
});



academicSemesterSchema.pre('save', async function(next){
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name:this.name
  })

  if(isSemesterExists){
    throw new AppError( status.NOT_FOUND, 'This Department does not exist')

  }
  next();
})

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);
