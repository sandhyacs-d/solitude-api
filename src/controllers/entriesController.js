import Entry from "../models/entry.js";
import { AppError } from "../middleware/appError.js";

export async function getEntries(req,res){
    const {page, limit } = req.pagination;
    const {fields, search} = req.query;

    const skip = (page - 1) * limit;

    const filter ={
        user : req.user
    };

    if(req.query.mood){
        filter.mood = req.query.mood;
    }

    if(req.query.tag){
        filter.tags = req.query.tag;
    }

    if(search){
       filter.$or =[
        { title : {$regex : search , $options :"i"}},
        { content : {$regex : search , $options :"i"}}
       ];
    };

    let sortOption = {};

    if(req.query.sort === "newest"){
        sortOption = { createdAt : -1};
    }

    if(req.query.sort === "oldest"){
        sortOption = { createdAt : 1};
    }

    let query = Entry.find(filter);

    if(fields){
        const selectedFields = fields.split(",").join(" ");
        query = query.select(selectedFields);
    }

    const entries = await query
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

    return res.status(200).json(entries);
}

export async function createEntries(req,res){
    const {title, content, mood, tags} = req.body;

    const entry = await Entry.create({
        title,
        content,
        mood,
        tags,
        user : req.user
    });

    return res.status(201).json(entry);

}

export async function getEntryById(req,res){
    const id = req.params.id;

    const entry = await Entry.findOne({
        _id : id,
        user : req.user
});


    if(!entry){
        throw new AppError("Entry not found",404);
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
    
    const entry = await Entry.findOneAndUpdate(
        {_id : id,
        user : req.user},
         updateData, {returnDocument : "after"})

    if(!entry){
         throw new AppError("Entry not found",404)
        };


    return res.status(200).json(entry);
    
}

export async function deleteEntry(req,res){
   const id = req.params.id;

   const entry = await Entry.findOneAndDelete({
    _id : id,
    user : req.user
   });

   if(!entry){
    throw new AppError("Entry not found",404);
   }

   return res.status(200).json({
    message : "Entry successfully deleted"
   })
}