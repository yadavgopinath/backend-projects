const Expenses = require('../models/expenses');
const User = require('../models/users');

const sequalize = require('../util/database');

exports.getUserLeaderBoard = async (req,res,next)=>{
    try{
        const users = await User.findAll();
        const expenses =await Expenses.findAll();
         const userAggregateexpenses = {};
         expenses.forEach((expense) => {
            if(userAggregateexpenses[expense.userId])
            {
                userAggregateexpenses[expense.userId]=userAggregateexpenses[expense.userId] + expense.amount;
                        }else{
              userAggregateexpenses[expense.userId] = expense.amount;      
                        }      
         });
         var leaderBoard =[];
         users.forEach((user)=>{
                  leaderBoard.push({name:user.name,total_cost:userAggregateexpenses[user.id] ||0});
         })
         leaderBoard.sort((a,b)=>b.total_cost-a.total_cost);
         console.log(leaderBoard);
         res.status(200).json(leaderBoard);

    }catch(err){
        res.status(501).json(err);
    }
}