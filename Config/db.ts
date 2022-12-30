import mongoose from "mongoose";

const URI = "mongodb://localhost/nestedDocs"

mongoose.connect(URI);

mongoose.connection.on(
    "open", () =>{
        console.log("Database is connected to server");
    }
).once(
    "error", error =>{
        console.log("Couldn't connect DATABASE");
    }
)