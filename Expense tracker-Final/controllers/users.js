const Users = require('../models/users');

exports.addUsers = async(req,res,next) =>{
try{
    const {name,email,password } = req.body;

 const newUser = await Users.create({
    name:name,
    email:email,
    password:password,

 });

 return res.status(200).json({
    message:"user added successfully ",
    user:newUser
 });

}catch(err){
    if(err.name==='SequelizeUniqueConstraintError'){
     return    res.status(400).json({
            message:'Email Already Exist '
        });
    }
 res.status(500).json({
    error:err
 });




}

};