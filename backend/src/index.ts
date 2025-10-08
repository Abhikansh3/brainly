
import express from "express";
import jwt from "jsonwebtoken"
import { ContentModel, LinkModel, UserModel } from "./db.js";
import {JWT_PASSWORD} from './config.js'
import { userMiddleware } from "./middleware.js";
import  mongoose  from "mongoose";
import { random } from "./utils.js";
import dotenv from "dotenv";
dotenv.config();
const app = express()
app.use(express.json())
app.post('/api/v1/signup',async(req,res) => {
    const userName = req.body.userName
    const password = req.body.password

    try {
        await UserModel.create({
        userName:userName,
        password:password
    })
    res.json({
        msg:"User signed up"
    })
    } catch(e){
        res.status(411).json({
            msg: "User already exists"
        })
    } 
    
})
app.post('/api/v1/signin',async(req,res) => {
    const userName = req.body.userName
    const password = req.body.password
    const existingUser = await UserModel.findOne({
        userName,
        password
    })
    if(existingUser){
        const token = jwt.sign({
            id:existingUser._id
        },JWT_PASSWORD)
        res.json({
            token
        })
    } else {
        res.status(403).json({
            msg:"Incorrect Credentials"
        })
    }
})
app.post('/api/v1/content',userMiddleware,async(req,res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        userId:req.userId,
        tags:[]
    })
    return res.json({
        msg:"Content added"
    })
})
app.get('/api/v1/content',userMiddleware,async(req,res)=>{
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId","userName")
    res.json({
        content:content
    })
})

app.delete('/api/v1/content',userMiddleware,async(req,res)=>{
    const contentId = req.body.contentId
    await ContentModel.deleteMany({
        contentId,
        userId:req.userId
    })
    res.json({
        msg:"deleted"
    })
})
app.post('/api/v1/brain/share',userMiddleware,async (req,res)=>{
    const share = req.body.share;
    if(share){
        await LinkModel.create({
            userId:req.userId,
            hash:random(10)
        })
    } else{
        await LinkModel.deleteOne({
            userId:req.userId
        })
    }
    res.json({
        message:"Updated sharble link"
    })
})
app.get('/api/v1/brain/:sharelink',async(req,res)=>{
    const hash = req.params.sharelink
   const link =  await LinkModel.findOne({
        hash
    })
    if(!link){
        res.status(411).json({
            msg:"Incorrect Input"
        })
        return;
    }
    const content = await ContentModel.find({
        userId:link?.userId
    })
    const user = await UserModel.findOne({
        userId: link.userId
    })
    if(!user){
        res.status(411).json({
            msg:"User not found ideally this error should not happen"
        })
        return
    }
    res.json({
        username:user.userName,
        content:content
    })
})
const dbkey = process.env.MOONGO_URL
async function main(){
    
if(!dbkey){
  throw new Error("MOONGO_URL not defined in .env file");
} 
await mongoose.connect(dbkey) 
      
   console.log("Connected")
   app.listen(3000);
}
main()
