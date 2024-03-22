import { Document, Model } from 'mongoose';

export type IBookUser = {
   name: string;
   email: string;
   image: string;
};

export type IReview = {
   bookId: string;
   rating: number;
   message: string;
   reviewer: IBookUser;
} & Document;

export type IBook = {
   userId: string;
   title: string;
   image: string;
   pdf: string;
   reviews: IReview[];
   rating: number;
} & Document;

export type BookModel = Model<IBook>;
