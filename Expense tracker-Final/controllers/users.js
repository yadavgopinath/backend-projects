const Users = require('../models/users');
const bcrypt = require('bcrypt');

exports.addUsers = async(req,res,next) =>{
try{
    const {name,email,password } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Bad Parameter: Something is missing' });
      }

      const existingUser = await Users.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

      const saltrounds=10;
     
bcrypt.hash(password,saltrounds,async(err,hash)=>{
    console.log(err);
    console.log('hello2');
   
    await Users.create({
        name,
        email:email.toLowerCase(),
        password:hash,
    
     })
     res.status(200).json({
        message:"user added successfully ",
        
     });

})
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

    if(userPresent){
        bcrypt.compare(password,userPresent.password,(err,result)=>{
            if(err)
            {
                throw new Error('Something Went Wrong');
            }
            if(result==true)
            {
                return res.status(200).json({message:'Login Successfully',userPresent});
            }else{
                return res.status(401).json({error:'Incorrect Password'});
            }
        })
       
    }else{
        return res.status(404).json({error:'Email does not exist'});
        
    }




}catch(err){
  return  res.status(500).json({
        error:err
    })
}
}