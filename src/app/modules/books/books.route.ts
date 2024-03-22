import express from 'express';
import { upload } from '../../../helpers/upload';
import { BookControler } from './books.controler';
const router = express.Router();

router.post(
   '/',
   // auth(USER_ROLE.ADMIN),
   upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
   ]),
   BookControler.createBook
);
router.get('/:id', BookControler.getSingleBook);
router.get('/', BookControler.getAllBooks);
router.post('/review', BookControler.createReview);

export const BookRoutes = router;
