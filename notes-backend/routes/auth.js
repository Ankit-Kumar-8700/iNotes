const express = require('express');
const router=express.Router();
const userSchema=require('../schemas/userSchema');
const {body,validationResult}=require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../middlewares/fetchuser');

router.post('/signup',[
  body('name','Enter valid name').isLength({ min: 3 }),
  // email must be an email
  body('email','Email is invalid').isEmail(),
  // password must be at least 5 chars long
  body('password','Password length should be minimum 5 characters').isLength({ min: 5 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    userSchema.create({
      name: req.body.name,
      email:req.body.email,
      password: hash,
    }).then(user => {
      const data={
        user:{ 
          id: user.id 
        }
      }
      var token = jwt.sign(data, process.env.JWT_SECRET);
      var success=true;
      res.json({success,token});
    })
    .catch(err=>{
    res.json({'success':false,'error':"This email is already signed in"})});
  },
);


router.post('/login',[
  // email must be an email
  body('email','Email is invalid').isEmail(),
  // password must be entered
  body('password','Password cant be empty').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
      let user=await userSchema.findOne({email});
      if(!user){
        return res.status(400).json({success:false,error:'This email in not signed in'});
      }
      const passwordCheck=await bcrypt.compare(password,user.password);
      if(!passwordCheck){
        return res.status(400).json({success:false,error:'Incorrect Password'});
      }
      const data={
        user:{ 
          id: user.id 
        }
      }
      var token = jwt.sign(data, process.env.JWT_SECRET);
      res.json({success:true,token});
    }
    catch(err){
      // console.log(err);
    res.json({success:false,error:"Internal Server error"});
  }
});


router.post('/getuser',fetchuser,async(req,res)=>{
  try{
    let userId=req.user.id;
    const user=await userSchema.findById(userId).select("-password");
    res.send(user);
  } catch(err){
    console.log(err.message);
    res.status(500).send("Internal server error");
  }
})

module.exports=router;