const express=require('express');
const noteRouter=express.Router()
const {NoteModel}=require('../model/Note.model')

noteRouter.post('/create',async(req,res)=>{
    try {
        const note=new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"New note added"})
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})

noteRouter.get('/',async(req,res)=>{
    try {
        const notes=await NoteModel.find({authorID:req.body.authorID})
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})

noteRouter.patch('/update/:noteID',async(req,res)=>{
    const {noteID}=req.params
    const note=await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.authorID!==note.authorID){
            res.send("Not authorised")
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).send({"msg":`Note with id${noteID} Updated!!`})
        }
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})

noteRouter.delete('/delete/:noteID',async(req,res)=>{
    const {noteID}=req.params
    const note=await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.authorID!==note.authorID){
            res.send("Not authorised")
        }else{
            await NoteModel.findByIdAndDelete({_id:noteID},req.body)
            res.status(200).send({"msg":`Note with id${noteID} Deleted!!`})
        }
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})

module.exports={noteRouter}