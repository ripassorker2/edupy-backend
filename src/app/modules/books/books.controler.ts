import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IBook } from './books.interface';
import { BookServices } from './books.services';

const createBook = catchAsync(async (req: Request, res: Response) => {
   if (!req.files || !('image' in req.files) || !('pdf' in req.files)) {
      return res
         .status(StatusCodes.BAD_REQUEST)
         .json({ message: 'Image and PDF files are required' });
   }
   const image = req.files?.['image']?.[0].path;
   const pdf = req.files?.['pdf']?.[0].path;

   const result = await BookServices.createBook(req.body, image, pdf);

   sendResponse<IBook>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Book create successfully..!!',
      data: result,
   });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
   const result = await BookServices.getSingleBook(req.params.id);

   sendResponse<IBook>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Single book fetch successfully..!!',
      data: result,
   });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
   const result = await BookServices.getAllBooks();

   sendResponse<IBook[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'All book fetch successfully..!!',
      data: result,
   });
});
const createReview = catchAsync(async (req: Request, res: Response) => {
   const result = await BookServices.createReview(req.body);
   sendResponse<IBook>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Created review successfully',
      data: result,
   });
});

export const BookControler = {
   createBook,
   getSingleBook,
   getAllBooks,
   createReview,
};
