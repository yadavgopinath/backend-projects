const Player=require('../models/users');

exports.addplayer=async (req,res,next)=>{
    try{
      const { name, dateOfBirth, photoUrl, birthPlace, careerInfo, matches,score, fifties, centuries, wickets, average } = req.body;

      if (!name || !dateOfBirth || !photoUrl || !birthPlace || !careerInfo || !matches || !fifties || !centuries || !wickets || !average) {
        return res.status(400).json({ error: "All fields are required." });
      }
      const newPlayer = await Player.create({
        name: name.toLowerCase(),
        dateOfBirth: dateOfBirth,
        photoUrl: photoUrl,
        birthPlace: birthPlace,
        careerInfo: careerInfo,
        matches: matches,
        score:score,
        fifties: fifties,
        centuries: centuries,
        wickets: wickets,
        average: average
      });
      res.status(201).json(newPlayer);
   
}catch(err){
  console.error(err);
  res.status(500).json({ error: "Error creating player." });
    
};
    
}

exports.getplayer=async (req,res,next)=>{
  try {
    const playerName = req.params.name.toLowerCase();
console.log('heloo');
   console.log(playerName);
    const player = await Player.findOne({
      where: { name: playerName }
    });

    if (!player) {
      return res.status(404).json({ error: "Player not found." });
    }

   
    res.status(200).json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching player details." });
  }
};




exports.editplayer=async(req,res,next)=>{
   
    try {
      const { name, dateOfBirth, photoUrl, birthPlace, careerInfo, matches,score, fifties, centuries, wickets, average } = req.body;

      const playerName = req.params.name.toLowerCase();
      


      const player = await Player.findOne({ where: { name: playerName } });
      if (!player) {
        return res.status(404).json({ error: 'Player not found.' });
      }
      await Player.update({
        name:name,
        dateOfBirth: dateOfBirth,
        photoUrl: photoUrl,
        birthPlace: birthPlace,
        careerInfo: careerInfo,
        matches: matches,
        fifties: fifties,
        centuries: centuries,
        wickets: wickets,
        average: average,
        score: score
      }, { where: { name: playerName } });
  
      res.status(200).json({ message: 'Player updated successfully.' });
    

      } catch (error) {
        console.error('Error fetching attendance report:', error);
        res.status(500).json(error);
      }



   
   
}