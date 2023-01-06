import mongoose from "mongoose";

import authorModels from "../Models/authorModels";

import cloudinary from "../Config/cloudinary"

import bookModel from "../Models/bookModels";

import {Request, Response} from "express";

// create books:
const createBooks = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const {title, category, summary} = req.body;
        const cloudImg = await cloudinary.uploader.upload(req?.file!.path);
        const myAuthor = await authorModels.findById(req.params.authorBookID);
        const newBooks = await bookModel.create({
            title,
            category,
            summary,
            coverImage: cloudImg.secure_url,
            authorName: myAuthor?.authorName,
        });
        myAuthor?.books.push(new mongoose.Types.ObjectId(newBooks._id));
        myAuthor?.save();
        
        return res.status(201).json({
            message: "Successfully created new book",
            data: newBooks
        })
    } catch (error) {
        return res.status(201).json({
            message: "Couldn't create a new book",
            data: error
        })
    }
}


// getAllBooks:
const getAllBooks = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const getBooks = await bookModel.find();
        return res.status(200).json({
            message: "Successfully got all books",
            data: getBooks
        })
    } catch (error) {
        return res.status(400).json({
            message: "Couldn't get Book details",
            data: error
        })
    }
}
// getBooks:
const getOneBooks = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const getABooks = await bookModel.findById(req.params.bookID);
        return res.status(200).json({
            message: "Successfully got this books",
            data: getABooks
        })
    } catch (error) {
        return res.status(400).json({
            message: "Couldn't get this Book details",
            data: error
        })
    }
}
// deleteBooks:
const deleteBooks = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const bookDeleted = await bookModel.findByIdAndRemove(req.params.bookID);
        return res.status(200).json({
            message: "Successfully deleted this book",
            data: deleteBooks
        })
    } catch (error) {
        return res.status(400).json({
            message: "Error occured in deleting Books",
            data: error
        })
    }
}

export {getAllBooks, getOneBooks, deleteBooks, createBooks};