let entries = [
    {
        id: 1,
        title: "A quiet evening",
        content: "Today was peaceful.",
        mood: "calm",
        tags: ["evening", "peace"]
    },
    {
        id: 2,
        title: "Bad day",
        content: "Everything felt overwhelming.",
        mood: "sad",
        tags: ["rough-day"]
    }
]

export function getEntries(req,res){
    return res.status(200).json(entries);
}

export function createEntries(req,res){
    const contents = req.body;

    const id = entries.length + 1;

    const newEntry = {
        id,
        ...contents
    }
    entries.push(newEntry);
    return res.status(200).json({
        message : "entry successfully created"
    });
}

export function getEntryById(req,res){
    const id = req.params.id;

    const entry = entries.find((entry)=>{
        return entry.id === Number(id);
    });

    if(!entry){
        return res.status(404).json({
            message : "entry not found"
        })
    }

    return res.status(200).json(entry);
}

export function updateEntry(req,res){
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

    const entry = entries.find((entry)=>{
        return entry.id === Number(id);
    });

    if(!entry){
        return res.status(404).json({
            message : "Entry doesnot exist"
        });
    }

    Object.assign(entry, updateData);

    return res.status(200).json(entry);
    
}

export function deleteEntry(req,res){
    const id = req.params.id;

    const entry = entries.find((entry)=>{
        return entry.id === Number(id);
    })

    if(!entry){
        return res.status(400).json({
            message : "Entry not found"
        });
    }

    entries = entries.filter((entry)=>{
       return entry.id !== Number(id);
    })

    return res.status(200).json({
        message : "Entry deleted sucessfully"
    })
}