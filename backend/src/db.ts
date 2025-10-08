
import  mongoose  from "mongoose";
import { model ,Schema } from "mongoose";
const UserSchema = new Schema ({
    userName:{type:String , unique:true},
    password:String
})
const ContentSchema = new Schema({
    title:String,   
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId, ref:'User',required : true}
})
const LinkSchema = new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId, ref:'User',required: true,unique:true}
})
export const LinkModel = model("Links",LinkSchema)
export const UserModel =  model("User",UserSchema)
export const ContentModel = model('Content',ContentSchema)