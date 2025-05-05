import { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,

  StudentModel,
  TUserName,
} from './student/student.interface';
import { func } from 'joi';
import config from '../config';

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

const StudentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true,  maxlength:[20, 'password should be under 20 charecters']},
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

  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // validate: {
    //   validator: (value: string)=> validator.isEmail(value),
    //   message: "{VALUE} is not valid"
    // }
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
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
    trim: true,
  },
  isDeleted:{
    type: Boolean,
    default: false
  }
},{
  toJSON :{
    virtuals:true
  }
});

// virtual field

StudentSchema.virtual('fullnam').get(function(){
  return (`${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName}`)
})

StudentSchema.pre('save', async function(next){

  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round) );
  next();
});


StudentSchema.post('save', function(doc, next){
 
  doc.password =''

  next()
});


StudentSchema.pre('find', function(next){
  this.find({isDeleted: {$ne:true}})
  next();
})
StudentSchema.pre('findOne', function(next){
  this.find({isDeleted: {$ne:true}})
  next();
})


StudentSchema.pre('aggregate', function(next){
     this.pipeline().unshift({$match: {isDeleted : {$ne:true}}})
     next()
})










StudentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({id});
  return existingUser
  
}






// StudentSchema.methods.isUserExists = async function (id:string) {
    
//   const existingUser = await Student.findOne({id});
//   return existingUser
//  }




export const Student = model<TStudent, StudentModel>('Student', StudentSchema);
