import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    content :{
        type : String,
        required : true
    },
    mood : {
        type : String,
        enum : ["happy", "sad", "calm", "angry", "anxious", "excited", "neutral"]
    },
    tags : {
        type :[String]
    }
},
    {
        timestamps : true
})

const Entry = mongoose.model("Entry",entrySchema);

export default Entry;