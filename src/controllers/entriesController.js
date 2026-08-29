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
    res.status(200).json(entries);
}