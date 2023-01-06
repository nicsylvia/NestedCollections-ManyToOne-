import authorModels from "../Models/authorModels";

import cloudinary from "../Config/cloudinary";

import { Request, Response } from "express";

// get:
const getAuthor = async (req: Request, res: Response): Promise<Response> => {
    try {
      const authorDetails = await authorModels.find();
      return res.status(200).json({
        message: "Successfully got author details",
        data: authorDetails,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Couldn't get Author details",
        data: error,
      });
    }
  };

//  getOneAuthor:
const getOneAuthor = async (req: Request, res: Response): Promise<Response> => {
    try {
      const authorDetails = await authorModels.findById(req.params.authorID);
      return res.status(200).json({
        message: `${req.params.authorID} gotten Sucessfully`,
        data: authorDetails,
      });
    } catch (error) {
      return res.status(400).json({
        message: `Couldn't get ${req.params.authorID}`,
        data: error,
      });
    }
  };

// Post:
const postAuthors = async (req: Request, res: Response): Promise<Response> => {
    try {
        const cloudImg = await cloudinary.uploader.upload(req?.file!.path)
      const { authorName, bio, authorImg } = req.body;
      const newAuthor = await authorModels.create({
        authorName,
        authorImg: authorImg ? cloudImg.secure_url : authorName.charAt(0) ,
        bio: bio ? bio : `My name is ${authorName}. Please enjoy reading my books`,
      });
      return res.status(201).json({
        message: "Successfully uploaded a new author",
        data: newAuthor,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Couldn't create authors",
        data: error,
      });
    }
  };

// Update: 
const updateAuthors = async (req: Request, res: Response): Promise<Response> => {
    try {
        const cloudImg = await cloudinary.uploader.upload(req?.file!.path)
        const {bio, authorImg} = req.body;
        const authorsUpdate = await authorModels.findByIdAndUpdate(
            req.params.authorID,
            {
                bio,
                authorImg: cloudImg.secure_url
            },
            {new: true}
        )
        return res.status(200).json({
            message: "Successfully updated Authors details",
            data: authorsUpdate
        })
    } catch (error) {
        return res.status(400).json({
            message: "Couldn't update Authors details",
            data: error
        })
    }
};

// Delete: 
const deleteAuthors = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const authorsDelete = await authorModels.findByIdAndRemove(req.params.authorID);
        return res.status(200).json({
            message: "Successfully deleted Authors details",
            data: authorsDelete
        })
    } catch (error) {
        return res.status(400).json({
            message: "An error occured while deleting Authors",
            data: error
        })
    }
}


  export {getAuthor, getOneAuthor, postAuthors, updateAuthors, deleteAuthors}