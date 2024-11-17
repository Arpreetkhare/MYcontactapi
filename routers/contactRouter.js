const express = require("express");
const router = express.Router();

const { 
    getcontacts, 
    createcontact, 
    updatecontacts, 
    getcontact,
    deletecontacts 
} = require("../controllers/contactController");

const {validateToken} = require ("../middleware/validateToken");

router.route("/getAll").get(validateToken,getcontacts);
router.route("/create").post(validateToken,createcontact);

router.route("/update/:id").put(validateToken,updatecontacts);

router.route("/get/:id").get(validateToken,getcontact);

router.route("/delete/:id").delete(validateToken,deletecontacts);

    



module.exports=router