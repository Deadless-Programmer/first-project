import { Schema, model } from 'mongoose';

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 character'],
    // validate : {
    //   validator : function(value : string){

    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //         return firstNameStr === value
    //   }, message:"{VALUE} is not capitalize format"
    // }
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],

    // validate: {
    //   validator : (value : string)=> validator.isAlpha(value),
    //   message: "{VALUE} is not valid"
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const StudentSchema = new Schema<TStudent, StudentModel>(

  
  {

     id: { type: String,
      required: true},
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user id is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: userNameSchema,

      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'Female', 'Other'],
        message: '{VALUE} is not valid',
      },
      trim: true,
      required: true,
    },

    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true, trim: true },
    bloodgroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      trim: true,
    },
    presentAddress: { type: String, required: true, trim: true },
    permanentAddress: { type: String, required: true, trim: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
       academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
    profileImage: { type: String },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual field

StudentSchema.virtual('fullnam').get(function () {
  return `${this?.name?.firstName}  ${this?.name?.middleName}  ${this?.name?.lastName}`;
});

StudentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
StudentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

StudentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// StudentSchema.methods.isUserExists = async function (id:string) {

//   const existingUser = await Student.findOne({id});
//   return existingUser
//  }

export const Student = model<TStudent, StudentModel>('Student', StudentSchema);
