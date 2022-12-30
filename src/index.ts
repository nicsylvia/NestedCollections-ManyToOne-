import express, { Application, Request, Response } from "express";

import cors from "cors";

import authorRouter from "../Router/authorRoutes";
import bookRouter from "../Router/bookRoutes";

const PORT: number = 2000;

require("../Config/db");

const app: Application = express();

app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response): Response =>{
    return res.status(200).json({
        message: "successfully created a server"
    })
});

app.use("/api/authors", authorRouter);
app.use("/api/books", bookRouter);

app.listen(PORT, () =>{
    console.log("LISTENING TO PORT", PORT);
})