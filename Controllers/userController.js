const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');


const User = require('../Models/user');


router.get('/users', async (req, res)=> {
    try {
      const users = await User.find()
      return res.status(200).json(users);
    } catch (e) {
      return res.status(400).json(e);
    }
  });

router.post('/register', async (req, res)=>{
    const  user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    });
    try {
        const exist_user= await User.findOne({email:req.body.email,password:req.body.password})
          if(exist_user !== null){
              return res.status(400).json({Message: 'This user already exists'});

          }else{
        const usr = await user.save();
          return   res.status(200).json({"Message":"User Registered successfully",
                                           "user": usr});
          }
      } catch (e) {
        return res.status(400).json(e); 
      }

});

router.post('/login', async (req, res)=>{
    
    try {
        const exist_user= await User.findOne({email:req.body.email,password:req.body.password})
        if(exist_user === null){
            return res.json({Message: 'Wrong credentials'});

        }else{
            const token = jwt.sign({id: exist_user._id}, 'super', {
                expiresIn: 86400,
              });
              return res.json({'message': 'User '+  exist_user.name + ' has succesfully logged in', 'token': token});
        }
      } catch (e) {
        return res.status(400).json({"error":e.message});
      }

});


module.exports = router;