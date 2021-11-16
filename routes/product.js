const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Product = require("../models/Product");


//create 
router.post("/", verifyTokenAndadmin, async (req, res)=>{
   const newProduct = new Product(req.body);

   try {
       const savedProduct = await newProduct.save();
       res.status(201).json(savedProduct);
   } catch (error) {
       res.status(500).json(error);
   }
});


//user update
router.put("/:id", verifyTokenAndadmin, async (req, res) => {
  
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(403).json(error);
  }
});

//user delete

router.delete("/:id", verifyTokenAndadmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all users
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
      let products;
      
      if(qNew){
          products = await Product.find().sort({createdAt:-1}).limit(5);
      }
      else if(qCategory){
          products = await Product.find({categories:{
              $in: [qCategory],
          }})
      }
      else{
          products = await Product.find();
      }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// //get user stats

// router.get("/stats", verifyTokenAndadmin, async (req, res)=>{
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear()-1));

//     try {
//         const data = await User.aggregate([
//             {$match: {createdAt: {$gte:lastYear}}},
//             {
//                 $project:{
//                     month:{$mont: "$createdAt"},
//                 }
//             },
//             {
//                 $group:{
//                     _id:"$month",
//                     total:{$sum:1}
//                 }
//             }
//         ]);
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });


module.exports = router;
