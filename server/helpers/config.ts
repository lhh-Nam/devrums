import { diskStorage } from 'multer';
import { extname } from 'path';

export const storageConfig = (folder: string) => {
  return diskStorage({
    destination: `uploads/${folder}`,
    filename(req, file, callback) {
      callback(null, Date.now() + '-' + file.originalname);
    },
  });
};

export const fileFilter = (
  req,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  const ext = extname(file.originalname);
  const allowedExtList = ['.jpg', '.png', '.jped'];

  if (!allowedExtList.includes(ext)) {
    req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtList.toString()}`;
    callback(null, false);
  } else {
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 1024 * 1024 * 10) {
      req.fileValidationError =
        'File size is too large. Accepted file size is less than 5 MB';
      callback(null, false);
    } else {
      callback(null, true);
    }
  }
};
