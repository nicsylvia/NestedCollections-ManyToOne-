import { booksUploads } from "../Config/multer";

import  {getAllBooks, getOneBooks, deleteBooks, createBooks} from "../Controller/bookController";

import  express  from "express";

const router = express();

router.route("/getbooks").get(getAllBooks);
router.route("/getabooks/:bookID").get(getOneBooks);
router.route("/deletebook/:bookID").delete(deleteBooks);
router.route("/uploadbooks").post(booksUploads,createBooks);

export default router;