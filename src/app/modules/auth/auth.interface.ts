import { Types } from 'mongoose';

export type ILoginUser = {
   email: string;
   password: string;
};
export type ILoginResponse = {
   accessToken: string;
   id: Types.ObjectId;
   refreshToken?: string;
};
export type IRefreshToken = {
   accessToken: string;
};

export type IChangePassword = {
   oldPassword: string;
   newPassword: string;
};
