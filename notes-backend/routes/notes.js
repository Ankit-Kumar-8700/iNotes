const express = require('express');
const router=express.Router();
const noteSchema=require('../schemas/noteSchema');
var fetchuser=require('../middlewares/fetchuser');
const {body,validationResult}=require('express-validator');

router.get('/getnotes',fetchuser,async (req,res)=>{
    try{
        const notes=await noteSchema.find({user:req.user.id})
        res.json(notes);
    }catch(err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/addnote',fetchuser,[
    body('title','Title length should be minimum 3 characters').isLength({min:3}),
    body('description','Provide a description').exists()
    ],async (req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {title,description,tag,img}=req.body;
        const note=new noteSchema({
            title,description,tag,img,user:req.user.id
        })
        const saveNote=await note.save();
        res.json(saveNote);
    }catch(err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}
)


router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try{
        const {title,description,tag}=req.body;
        let newNote={};
        if(title){
            // if(!title.toString().isLength({min :3})){
            //     res.send("Note title is too small");
            // }
            newNote.title=title;
        }
        if(description) {newNote.description=description;}
        if(tag) {newNote.tag=tag;}

        let note=await noteSchema.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note Not Found");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("You cant edit other's notes");
        }
        note=await noteSchema.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json({note});
    } catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})


router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try{
        let note=await noteSchema.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note Not Found");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("You cant remove other's notes");
        }
        note=await noteSchema.findByIdAndDelete(req.params.id);
        res.json({"Success:":"Note deleted",note:note});
    } catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router