// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({ storage }).single("file");




import multer from 'multer';

// Set up multer memory storage
const storage = multer.memoryStorage();

// Create the upload middleware
export const singleUpload = multer({ storage }).single('file');  // 'file' should match the field name in the form

