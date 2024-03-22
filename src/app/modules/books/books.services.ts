import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IBook, IReview } from './books.interface';
import { Book } from './books.model';

const createBook = async (
   payload: Partial<IBook>,
   image: string,
   pdf: string
): Promise<IBook | null> => {
   const book = {
      userId: payload.userId,
      title: payload.title,
      image: image,
      pdf: pdf,
      reviews: [],
      rating: 0,
   };

   return await Book.create(book);
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
   return await Book.findById(id);
};
const getAllBooks = async (): Promise<IBook[] | null> => {
   return await Book.find().sort({ createdAt: -1 });
};
const createReview = async (payload: IReview): Promise<IBook | null> => {
   const book = await Book.findOne({ _id: payload.bookId });
   if (!book) throw new ApiError(StatusCodes.NOT_FOUND, 'Book not found');

   const reviews = book.reviews;
   const isExsitReview = reviews.find(
      review => review.reviewer.email === payload.reviewer.email
   );

   if (isExsitReview)
      throw new ApiError(StatusCodes.CONFLICT, 'Review already submitted');
   reviews.push(payload);

   let totalRating = 0;
   for (const review of reviews) {
      totalRating += review.rating;
   }

   const averageRating = totalRating / reviews.length;
   book.rating = averageRating;
   book.reviews = reviews;
   return await book.save();
};
export const BookServices = {
   createBook,
   getSingleBook,
   getAllBooks,
   createReview,
};
