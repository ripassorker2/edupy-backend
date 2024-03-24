import { Schema, model } from 'mongoose';
import { BookModel, IBook, IReview } from './books.interface';

const reviewSchema = new Schema<IReview>(
   {
      bookId: { type: String },
      rating: {
         type: Number,
         required: true,
      },
      // message: {
      //    type: String,
      //    required: true,
      // },
      reviewer: {
         type: Object,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const bookSchema = new Schema<IBook, BookModel>(
   {
      userId: {
         type: String,
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      pdf: {
         type: String,
         required: true,
      },
      reviews: [reviewSchema],
      rating: {
         type: Number,
         default: 0,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);
export const Book = model<IBook, BookModel>('Book', bookSchema);
