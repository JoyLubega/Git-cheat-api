const express = require('express')
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Category = require('../models/category');
const Cmd = require('../models/commands');


router.get('/:id/commands', async (req, res)=> {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).send({'Error':'No record with given id'})
    }
    try {
      const commands = await Category.findById(req.params.id)
      if (commands) {
        const cmds = await Cmd.find({category: req.params.id})
        return res.send(cmds);
    }
    
    } catch (e) {
      return res.status(400).json(e);
    }
  });

  router.get('/:id/command/:iid', async (req,res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).send({'Error':'No record with given id'})
    }
    
    const category = await Category.findById(req.params.id)
    try{
        if (category) {
            const command = await Cmd.findById(req.params.iid)
            return res.send(command);
        }
    }catch(err){
        res.status(404).json({
            message: `Command with id ${req.params.iid} does not exist`
        })
    }

});

router.post('/:id/command', (req,res)=>{
    
    const cmd = new Cmd({
        command:req.body.command,
        description:req.body.description,
        category: req.params.id
    });
    try{
        cmd.save((err, thecmd)=>{
            if (!err){
                res.status(201);
                res.send({"item":thecmd, "message":"Command  Added"});
            }else{
                console.log('Error in Adding item :'+ JSON.stringify(err, undefined,2))
            }
        });
    }catch(err){
        res.send(err)

    }
});
router.put('/:id/command/:iid',(req, res)=>{
    if (!ObjectId.isValid(req.params.id)){
         res.status(400).send({'Error':'No record with given id'})}
    
    const newCommand   = {
        command:req.body.command,
        description: req.body.description
    };
    try{
        Cmd.findByIdAndUpdate(req.params.iid, {$set: newCommand}, {new: true}, (err, command)=>{
            if(!err){
                res.send(command);
            }else{
                console.log('Error in Command Update :'+ JSON.stringify(err, undefined,2))
            }

        });
    }catch(err){
        res.send(err)
    }

});

router.delete('/:id/command/:iid',(req, res)=>{
    if (!ObjectId.isValid(req.params.id)){
         res.status(400).send({'Error':'No record with given id'})}
    
    Cmd.findByIdAndRemove(req.params.iid, (err, item)=>{
        if(!err){
            res.send({"Message":"Command has been deleted"});
        }else{
            console.log('Error in deleting a command :'+ JSON.stringify(err, undefined,2))
        }
    });
});

  module.exports = router;