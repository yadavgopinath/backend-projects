const Attendence=require('../models/users');

exports.searchDetails=async (req,res,next)=>{
    try{
        const {date}=req.query;

        const attendanceRecord = await Attendence.findByPk(date); 

        if (attendanceRecord) {
          return res.json(attendanceRecord.records);
        } else {
          return res.status(404).json({ message: 'No attendance found for the selected date-' });
        }
   
}catch(err){
    console.error('Error fetching attendance:', err);
    res.status(500).json({ message: 'Error fetching attendance', error: err});
    
};
    
}

exports.postAttendence=async (req,res,next)=>{
    const {date,attendance}=req.body;
    console.log(date,attendance);
    if (!date || !attendance) {
        return res.status(400).json({ message: 'Date and attendance details are required' });
      }

      try {
          await Attendence.create({
            date: date,
            records: attendance
          });
          return res.status(201).json({ message: 'Attendance marked successfully!' });
        
      } catch (error) {
        console.error('Error marking attendance:', error);
        return res.status(500).json({ message: 'Error marking attendance', error: error.message });
      }
    }




exports.fetchdata=async(req,res,next)=>{
   
    try {
        
        const records = await Attendence.findAll();
    
        res.json(records);
      } catch (error) {
        console.error('Error fetching attendance report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }



   
   
}