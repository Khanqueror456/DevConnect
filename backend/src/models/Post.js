import mongoose from "mongoose";

const commetSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    text : {
        type : String,
        required : true,
    },
},
    {timestamps : true}
);

const postSchema = new mongoose.Schema({
    
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    content : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        default : "",
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ],
    comments : [commetSchema],
},
    {timestamps : true}
);

const Post = mongoose.model("Post", postSchema);

export default Post;