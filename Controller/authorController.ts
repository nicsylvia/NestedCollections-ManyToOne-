import authorModels from "../Models/authorModels";

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

  export {getAuthor}