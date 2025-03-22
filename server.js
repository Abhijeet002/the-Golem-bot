import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";


dotenv.config();
const port = 3000;

const app = express()
app.use(express.static('public'))

const openai = new OpenAI({
    apiKey:  process.env.OPENAI_API_KEY
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