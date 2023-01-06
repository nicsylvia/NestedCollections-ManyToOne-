import { authorUploads } from "../Config/multer";

import express from "express";

import {getAuthor, getOneAuthor, postAuthors, updateAuthors, deleteAuthors} from "../Controller/authorController";

const router = express.Router();

router.route("/getauthors").get(getAuthor);
router.route("/getauthor/:authorID").get(getOneAuthor);
router.route("/createauthors").post(authorUploads, postAuthors);
router.route("/updateauthors/:authorID").patch(updateAuthors);
router.route("/deleteauthors/:authorID").delete(deleteAuthors);

export default router;