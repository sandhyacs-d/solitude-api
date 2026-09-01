import Entry from "../models/entry.js";

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
        return res.status(404).json({
            message : "Entry doesnot exist"
        })
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
        return res.status(400).json({
            message : "No field to updated"
        })
    }
    
    const entry = await Entry.findByIdAndUpdate(id, updateData, {returnDocument : "after"})

    if(!entry){
        return res.status(404).json({
            message : "Entry doesnot exist"
        });
    }


    return res.status(200).json(entry);
    
}

export async function deleteEntry(req,res){
   const id = req.params.id;

   const entry = await Entry.findByIdAndDelete(id);

   if(!entry){
    return res.status(400).json({
        message : "Entry not found"
    });
   }

   return res.status(200).json({
    message : "Entry successfully deleted"
   })
}