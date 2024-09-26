const expenses = require('../models/expenses');


exports.addexpenses = async(req,res,next)=>{
    const {amount,description,category} = req.body;
    if(!amount || !description || !category){
        return res.status(500).json({message:'All fields are required'});
    }
    
    try{
        const addexp= await expenses.create({
            amount,description,category
        });

        return res.status(200).json({
            message: 'Expense added successfully!',
            expense: addexp,
          });

    }catch(err){
        res.status(500).json({
            error:err,
            message:'Something went wrong'
        })

    }
}

exports.getexpenses = async(req,res,next)=>{
    try{
     const Allexpenses=  await expenses.findAll();
     return res.status(200).json(Allexpenses);

    }catch(err){
        return res.status(500).json({
            error:err,
            message: 'Server error, please try again.'
        })
    }

}

exports.deleteexpenses =  async(req,res,next)=>{
    const { expid} = req.params;
 
try{

    const delexp = await expenses.destroy({where:{id:expid}})
    if(!delexp){
        return res.status(404).json({ message: 'Expense not found.' });
    }
    return res.status(200).json({ message: 'Expense deleted successfully.' });

}catch(err){
    return res.status(500).json({
        error:err,
        message: 'Server error, please try again.'
    })
}

}