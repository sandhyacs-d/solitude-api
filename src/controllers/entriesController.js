const entries = [
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
    const { id, title, content, mood, tags} = req.body;

    const newEntry = [
        id,
        title,
        content,
        mood,
        tags
    ]

    entries.push(newEntry);
    return res.status(200).json(newEntry);
}