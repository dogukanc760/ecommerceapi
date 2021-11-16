const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Cart = require("../models/Cart");


//create 
router.post("/", verifyToken, async (req, res)=>{
   const newCart = new Cart(req.body);

   try {
       const savedCart = await newCart.save();
       res.status(201).json(savedCart);
   } catch (error) {
       res.status(500).json(error);
   }
});


//user update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(403).json(error);
  }
});

//user delete

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user
router.get("/find/:userId", verifyTokenAndAuthorization,async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.userId});
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all users
router.get("/", verifyTokenAndadmin, async (req, res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;
