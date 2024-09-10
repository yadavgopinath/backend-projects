const Users=require('../models/users');

exports.addusers=(req,res,next)=>{
    try{
    console.log(req.body);
    const username = req.body.username;
    const phone = req.body.phone;
    const email = req.body.email;

   Users.create({
    username:username,
    phone:phone,
    email:email,
    
   }).then(result=>{
    res.json(result);
    
   }).catch(err=>{
    console.log(err);
   })
}catch(err){
    res.status(500).json({
        error:err
    })
    
};
    
}

exports.getdata=(req,res,next)=>{
Users.findAll().then(user=>{
    res.send(user);
}).catch(err=>{
    console.log(err);
    res.send(500).json({
        error:er
    })
})

}
exports.deleteuser=(req,res,next)=>{
    console.log(req.params.userid);
    const id=req.params.userid;
    

    Users.findByPk(id).then(users=>{
        if (!users) {
            // If the user is not found, send a 404 response
            return res.status(404).json({ message: 'User not found' });
        }
        return users.destroy();
    }).then(result=>{
        res.status(200).json({ message: 'User deleted successfully' });
    }).catch(err=>{
        console.log(err);
    })
   
}