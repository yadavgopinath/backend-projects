const Expenses = require('../models/expenses');
const User = require('../models/users');
const Sequelize = require('sequelize');

const sequalize = require('../util/database');

exports.getUserLeaderBoard = async (req,res,next)=>{
    try{
        const leaderBoard = await User.findAll({
        attributes: [
            'id',
            'name',
            [Sequelize.fn('sum', Sequelize.col('expenses.amount')), 'total_cost'] 
        ],
        include: [
            {
                model: Expenses, 
                attributes: []   
            }
        ],
        group: ['users.id'],
        order: [[Sequelize.fn('sum', Sequelize.col('expenses.amount')), 'DESC']] 
    });

    res.status(200).json(leaderBoard); 
    }catch(err){
        res.status(501).json(err);
    }
}