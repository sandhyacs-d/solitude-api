import Entry from "../models/entry.js";
import { AppError } from "../middleware/appError.js";

export async function getEntries(req,res){
    const entries = await Entry.find();

    return res.status(200).json(entries);
}

export async function createEntries(req,res){
    const {title, content, mood, tags} = req.body;

    const entry = await Entry.create({
        title,
        content,
        mood,
        tags
    });

    return res.status(201).json(entry);

}

export async function getEntryById(req,res){
    const id = req.params.id;

    const entry = await Entry.findById(id);


    if(!entry){
        throw new AppError("User not found",404);
    }

    return res.status(200).json(entry);
}

export async function updateEntry(req,res){
    const { title, content, mood, tags } = req.body;
    const id = req.params.id;

    const updateData = {};

    if(title !== undefined){
        updateData.title = title;
    }

    if(content !== undefined){
        updateData.content = content;
    }

    if(mood !== undefined){
        updateData.mood = mood;
    }

    if(tags !== undefined){
        updateData.tags = tags;
    }
    
    if(Object.keys(updateData).length === 0){
       throw new AppError("no field to update",400);
    }
    
    const entry = await Entry.findByIdAndUpdate(id, updateData, {returnDocument : "after"})

    if(!entry){
         throw new AppError("Entry not found",404)
        };


    return res.status(200).json(entry);
    
}

export async function deleteEntry(req,res){
   const id = req.params.id;

   const entry = await Entry.findByIdAndDelete(id);

   if(!entry){
    throw new AppError("Entry not found",404);
   }

   return res.status(200).json({
    message : "Entry successfully deleted"
   })
}