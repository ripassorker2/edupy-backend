import { Request } from 'express';
import fs from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
   destination: function (req: Request, file: Express.Multer.File, cb: any) {
      let uploadDir: string;

      if (file.fieldname === 'image') {
         uploadDir = './uploads/images';
      } else if (file.fieldname === 'pdf') {
         uploadDir = './uploads/pdfs';
      } else {
         return cb(new Error('Invalid file fieldname'));
      }

      // Check if the upload directory exists, if not, create it
      if (!fs.existsSync(uploadDir)) {
         fs.mkdirSync(uploadDir, { recursive: true });
      }

      cb(null, uploadDir);
   },
   filename: function (req: Request, file: Express.Multer.File, cb: any) {
      cb(null, Date.now() + file.originalname);
   },
});

export const upload = multer({ storage });
