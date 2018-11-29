const express = require('express')
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;


const Category = require('../models/category');


router.get('/categories', async (req, res)=> {
    try {
      const categories = await Category.find()
      
      if (categories.length == 0){
        return res.status(200).json({"message":"No categories found"});

      }else{
      return res.status(200).json(categories);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  });

router.post('/category', async (req, res)=>{
    const  category = new Category({
        category: req.body.category

    });
    
    try {
        const exists= await Category.findOne({category:req.body.category})
        console.log(exists)
        if (exists === null){
            const cat = await category.save();
          return   res.status(200).json(cat);
            
        }else{
            return res.status(400).json({Message: 'The category Already exists'});
        
        }
      } catch (e) {
        return res.status(400).json({"error": e.message});
      }

});

router.get( '/category/:id', async (req, res)=> {
    try {
      const category = await Category.findById(req.params.id);
        return res.status(200).json(category);
      
    } catch (e) {
      return res.status(400).json({"error": e.message});
    }
  });

router.put('/category/:id', async (req, res)=> {
    try {
      const category = await Category.findById(req.params.id);
      Object.keys(req.body).forEach(key   => {
        category[key] = req.body[key];
      });
  
      return res.status(200).json(await category.save());
    } catch (e) {
      return res.status(400).json({"error": e.message});
    }
  });

router.delete( '/category/:id', async (req, res)=> {
    try {
      const category = await Category.findByIdAndRemove(req.params.id);
      return res.status(200).json({"message":"category has been deleted"});
    } catch (e) {
      return res.status(400).json({"error": e.message});
    }
  });

module.exports = router;