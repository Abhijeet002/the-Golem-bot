import express from "express";
import OpenAI from "openai";

const port = 3000;

const app = express()
app.use(express.static('public'))

const openai = new OpenAI({
    apiKey: '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'
})



app.post("/", async(req,res)=>{
    try{
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages:[{
                role:"user", content: "hellu"
            }]
        })
        res.status(200).json({message:response.choices[0].message.content})
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})

app.listen(port, ()=>{
    console.log(`listening on port- ${port}`)
})