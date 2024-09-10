const Userexp=require('../models/users');

exports.addExpense=(req,res,next)=>{
    try{
    console.log(req.body);
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

   Userexp.create({
   amount:amount,
   description:description,
   category:category,
    
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

exports.getexpense=(req,res,next)=>{
Userexp.findAll().then(user=>{
    if(user){
        res.send(user);
    }
   
   
}).catch(err=>{
    console.log(err);
    res.send(500).json({
        error:er
    })
})

}
exports.deleteexpense=(req,res,next)=>{
   
    const id=req.params.userid;
    

    Userexp.findByPk(id).then(expense=>{
        if (!expense) {
            // If the user is not found, send a 404 response
            return res.status(404).json({ message: 'User not found' });
        }
        return expense.destroy();
    }).then(result=>{
        res.status(200).json({ message: 'User deleted successfully' });
    }).catch(err=>{
        console.log(err);
    })
   
}
exports.updateExp=(req,res,next)=>{
   
    const updateid=req.params.userid;
    const updateamount=req.body.amount;
    const updatedescription=req.body.description;
    const updatecategory=req.body.category;


    Userexp.findByPk(updateid).then(expenses=>{
        expenses.id=updateid;
        expenses.amount=updateamount;
        expenses.description=updatedescription;
        expenses.category=updatecategory;
        return expenses.save();
      }).then(result=>{
        res.send(req.body);
      }).catch(err=>{
        console.log(err);
      })



   
   
}