
const expenses = require('../models/expenses');
const users = require('../models/users');
const sequalize = require('../util/database');

exports.addexpenses = async(req,res,next)=>{
    const t = await sequalize.transaction();
    const {amount,description,category} = req.body;
    const userid=req.user.id;
   

    if(!amount || !description || !category || !userid){
        return res.status(500).json({message:'All fields are required'});
    }
    
    try{
        const addexp= await expenses.create({
            amount:amount,
            description:description,
            category:category,
            userId:userid
        },{transaction:t});
        const user= await users.findByPk(userid,{
  attributes:['id','total_expenses']
        },{transaction:t});
       

      user.total_expenses+=parseFloat(amount);
      
        await user.save({transaction:t});
        await t.commit();
       

        return res.status(200).json({
            message: 'Expense added successfully!',
            expense: addexp,
          });

    }catch(err){
        await t.rollback();
        console.log(err);
        res.status(500).json({
            error:err,
            message:'Something went wrong'
        })

    }
}

exports.getexpenses = async(req,res,next)=>{
    try{
        
     const Allexpenses=  await expenses.findAll({where:{userid:req.user.id}});
     return res.status(200).json({Allexpenses,success:true});

    }catch(err){
        return res.status(500).json({
            error:err,
            message: 'Server error, please try again.'
        })
    }

}

exports.deleteexpenses =  async(req,res,next)=>{
    const t= await sequalize.transaction();
    const { expid} = req.params;
    
 
try{
 
    const exp = await expenses.findOne({where:{id:expid,userId:req.user.id},
        attributes:['amount','userId','id']
    },{transaction:t});
   
    if(!exp){
        await t.rollback();
        return res.status(404).json({ message: 'Expense not found.' });
    }
 
    const user = await users.findByPk(req.user.id,{
        attributes:['id','total_expenses']
    },{transaction:t})
    user.total_expenses-=parseFloat(exp.amount);
   // Directly update the user's total expenses
   await user.save({ transaction: t });
// Delete the expense
 await exp.destroy({ transaction: t });
 await t.commit();
    return res.status(200).json({ message: 'Expense deleted successfully.' });

}catch(err){
 await t.rollback();
    console.group(err);
    return res.status(500).json({
        error:err,
        message: 'Server error, please try again.'
    })
}

}