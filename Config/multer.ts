import multer, { Multer } from "multer";

import {Request} from "express";

type DestinationCallBack = (error: Error | null, destination: string) => void
type FileCallBack = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: DestinationCallBack
    ) => {
        cb(null, "Uploads")
    },

    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: FileCallBack,
    ) => {
        cb(null, file.originalname )
    }
});

const authorUploads = multer({
    storage: storage
}).single("authorImage")

const booksUploads = multer({
    storage: storage
}).single("coverImage")

export { authorUploads, booksUploads}



