const Users = require('../models/users');

exports.addUsers = async(req,res,next) =>{
try{
    const {name,email,password } = req.body;

 const newUser = await Users.create({
    name:name,
    email:email.toLowerCase(),
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

exports.checkUser = async(req,res,next)=>{

    const {email,password} = req.body;
try{


    const userPresent=await Users.findOne({
        where:{email:email}
    });

    if(!userPresent){
        return res.status(404).json({error:'Email does not exist'});
    }
    if(userPresent.password != password){
        return res.status(401).json({error:'Incorrect Password'});
    }


return res.status(200).json({message:'Login Successfully',userPresent});

}catch(err){
  return  res.status(500).json({
        error:err
    })
}
}