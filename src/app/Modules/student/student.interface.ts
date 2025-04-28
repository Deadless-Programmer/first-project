export type guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type userName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type localGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: userName;
  gender: 'male' | 'Female';
  dateOfBirth?: string;

  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodgroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: guardian;
  localGuardian: localGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
};
