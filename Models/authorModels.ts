import mongoose from "mongoose";

interface Authors{
    authorName: string;
    bio: string;
    authorImage: string;
    books: {}[];
};

interface iAuthors extends Authors, mongoose.Document{};

const authorSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    authorImage: {
        type: String,
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "booksCollections",
        }
    ]
});

const authorModels = mongoose.model<iAuthors>("authorsCollections", authorSchema);
export default authorModels