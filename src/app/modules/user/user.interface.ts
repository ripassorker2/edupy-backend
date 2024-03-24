import { Model } from 'mongoose';

export type IUser = {
   fullName: string;
   role: string;
   email: string;
   password: string;
   avatar: string;
   // dateOfBirth: string;
   // parmanentAddress: string;
   // educationalQualification: string;
   // contactNumber: string;
   // nidOrBirthNumber: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
