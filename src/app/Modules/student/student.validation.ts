// // student.validation.ts
// import Joi from 'joi';

// const capitalizedString = Joi.string()
//   .pattern(/^[A-Z][a-z]*$/, 'capitalized')
//   .max(20)
//   .required()
//   .messages({
//     'string.pattern.name': 'First name must be capitalized',
//     'string.max': 'First name can not be more than 20 characters',
//     'any.required': 'First name is required',
//   });

// const userNameValidationSchema = Joi.object({
//   firstName: capitalizedString,
//   middleName: Joi.string().allow('', null).trim(),
//   lastName: Joi.string()
//     .pattern(/^[A-Za-z]+$/, 'alpha')
//     .required()
//     .messages({
//       'string.pattern.name': 'Last name must only contain letters',
//       'any.required': 'Last name is required',
//     }),
// });

// const guardianValidationSchema = Joi.object({
//   fatherName: Joi.string().required(),
//   fatherOccupation: Joi.string().required(),
//   fatherContactNo: Joi.string().required(),
//   motherName: Joi.string().required(),
//   motherOccupation: Joi.string().required(),
//   motherContactNo: Joi.string().required(),
// });

// const localGuardianValidationSchema = Joi.object({
//   name: Joi.string().required(),
//   occupation: Joi.string().required(),
//   contactNo: Joi.string().required(),
//   address: Joi.string().required(),
// });

// export const studentValidationSchema = Joi.object({
//   id: Joi.string().required(),
//   name: userNameValidationSchema.required(),
//   gender: Joi.string()
//     .valid('male', 'Female', 'Other')
//     .required()
//     .messages({ 'any.only': 'Gender must be male, Female, or Other' }),
//   dateOfBirth: Joi.string().optional(),
//   email: Joi.string().email().required(),
//   contactNo: Joi.string().required(),
//   emergencyContactNo: Joi.string().required(),
//   bloodgroup: Joi.string()
//     .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
//     .optional(),
//   presentAddress: Joi.string().required(),
//   permanentAddress: Joi.string().required(),
//   guardian: guardianValidationSchema.required(),
//   localGuardian: localGuardianValidationSchema.required(),
//   isActive: Joi.string().valid('active', 'blocked').default('active'),
// });


import { z } from 'zod';

// Capitalized string check (e.g., "John")
const capitalizedString = z
  .string()
  .max(20, 'First name can not be more than 20 characters')
  .refine(val => /^[A-Z][a-z]*$/.test(val), {
    message: 'First name must start with a capital letter',
  });

const userNameValidationSchema = z.object({
  firstName: capitalizedString,
  middleName: z.string().optional(),
  lastName: z
    .string()
    .refine(val => /^[A-Za-z]+$/.test(val), {
      message: 'Last name must only contain alphabetic characters',
    }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const studentValidationSchema = z.object({
  id: z.string(),
  password:z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'Female', 'Other']),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .email({ message: 'Invalid email address' }),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodgroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false)
});

