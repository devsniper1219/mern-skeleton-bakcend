const Lottery = require('../models/lottery.model')

const getLotteryData = async (req, res) => {
    try {
      const {index} = req.params;
  
      const limit = 5; // Number of items per page
      const skip = (index - 1) * limit; // Calculate the number of documents to skip
  
      // Fetch lotteries with pagination
      const voteLotteries = await Lottery.find({ type: 'vote' })
        .sort({ id: -1 }) // Sort by id descending
        .skip(skip)
        .limit(limit);
  
      const predictLotteries = await Lottery.find({ type: 'predict' })
        .sort({ id: -1 }) // Sort by id descending
        .skip(skip)
        .limit(limit);
  
      // Combine both types
      let topLotteries = [...voteLotteries, ...predictLotteries];
  
      res.status(200).json(topLotteries);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching lottery information', error });
    }
  };
  
const saveLotteries = async (req, res) => {  
    try {  
        let lotteries = [  
            { id: 1, date: '2025-03-21', startTime: '11:30:00', status: 'ended', type: 'predict' },  
            { id: 2, date: '2025-03-24', startTime: '12:00:00', status: 'upcoming', type: 'vote' },  
            { id: 3, date: '2025-03-22', startTime: '09:00:00', status: 'upcoming', type: 'vote' },  
            { id: 4, date: '2025-03-24', startTime: '11:15:00', status: 'ended', type: 'predict' },  
            { id: 5, date: '2025-03-23', startTime: '10:30:00', status: 'upcoming', type: 'vote' },  
            { id: 6, date: '2025-03-22', startTime: '14:00:00', status: 'ended', type: 'predict' },  
            { id: 7, date: '2025-03-23', startTime: '10:00:00', status: 'ended', type: 'vote' },  
            { id: 8, date: '2025-03-24', startTime: '09:30:00', status: 'upcoming', type: 'predict' },  
            { id: 9, date: '2025-03-21', startTime: '15:45:00', status: 'ended', type: 'vote' },  
            { id: 10, date: '2025-03-23', startTime: '12:15:00', status: 'ended', type: 'predict' },  
            { id: 11, date: '2025-03-24', startTime: '10:00:00', status: 'upcoming', type: 'vote' },  
            { id: 12, date: '2025-03-25', startTime: '09:00:00', status: 'upcoming', type: 'predict' },  
            { id: 13, date: '2025-03-20', startTime: '18:00:00', status: 'ended', type: 'vote' },  
            { id: 14, date: '2025-03-22', startTime: '12:30:00', status: 'ended', type: 'predict' },  
            { id: 15, date: '2025-03-25', startTime: '14:15:00', status: 'upcoming', type: 'vote' },  
            { id: 16, date: '2025-03-23', startTime: '11:00:00', status: 'ended', type: 'vote' },  
            { id: 17, date: '2025-03-24', startTime: '12:45:00', status: 'upcoming', type: 'predict' },  
            { id: 18, date: '2025-03-22', startTime: '16:00:00', status: 'ended', type: 'vote' },  
            { id: 19, date: '2025-03-20', startTime: '15:00:00', status: 'ended', type: 'predict' },  
            { id: 20, date: '2025-03-25', startTime: '10:30:00', status: 'upcoming', type: 'vote' },  
            { id: 21, date: '2025-03-21', startTime: '09:15:00', status: 'ended', type: 'predict' },  
            { id: 22, date: '2025-03-25', startTime: '11:00:00', status: 'upcoming', type: 'vote' },  
            { id: 23, date: '2025-03-24', startTime: '10:00:00', status: 'ended', type: 'predict' },  
            { id: 24, date: '2025-03-21', startTime: '12:00:00', status: 'upcoming', type: 'vote' },  
            { id: 25, date: '2025-03-25', startTime: '13:15:00', status: 'upcoming', type: 'predict' },  
            { id: 26, date: '2025-03-24', startTime: '11:00:00', status: 'ended', type: 'vote' },  
            { id: 27, date: '2025-03-22', startTime: '14:30:00', status: 'ended', type: 'predict' },  
            { id: 28, date: '2025-03-20', startTime: '16:45:00', status: 'ended', type: 'vote' },  
            { id: 29, date: '2025-03-23', startTime: '09:00:00', status: 'upcoming', type: 'predict' },  
            { id: 30, date: '2025-03-25', startTime: '12:00:00', status: 'upcoming', type: 'vote' },  
            { id: 31, date: '2025-03-21', startTime: '13:00:00', status: 'ended', type: 'predict' },  
            { id: 32, date: '2025-03-20', startTime: '14:00:00', status: 'ended', type: 'vote' },  
            { id: 33, date: '2025-03-24', startTime: '12:15:00', status: 'upcoming', type: 'predict' },  
            { id: 34, date: '2025-03-23', startTime: '18:30:00', status: 'ended', type: 'vote' },  
            { id: 35, date: '2025-03-21', startTime: '09:30:00', status: 'ended', type: 'predict' },  
            { id: 36, date: '2025-03-25', startTime: '14:30:00', status: 'upcoming', type: 'vote' },  
            { id: 37, date: '2025-03-23', startTime: '11:45:00', status: 'ended', type: 'predict' },  
            { id: 38, date: '2025-03-22', startTime: '17:00:00', status: 'upcoming', type: 'vote' },  
            { id: 39, date: '2025-03-20', startTime: '15:30:00', status: 'ended', type: 'predict' },  
            { id: 40, date: '2025-03-24', startTime: '10:00:00', status: 'upcoming', type: 'vote' },  
            { id: 41, date: '2025-03-25', startTime: '11:45:00', status: 'ended', type: 'predict' },  
            { id: 42, date: '2025-03-23', startTime: '12:30:00', status: 'upcoming', type: 'vote' },  
            { id: 43, date: '2025-03-21', startTime: '14:15:00', status: 'ended', type: 'predict' },  
            { id: 44, date: '2025-03-25', startTime: '16:00:00', status: 'upcoming', type: 'vote' },  
            { id: 45, date: '2025-03-22', startTime: '10:45:00', status: 'ended', type: 'predict' },  
            { id: 46, date: '2025-03-20', startTime: '12:30:00', status: 'ended', type: 'vote' },  
            { id: 47, date: '2025-03-24', startTime: '12:00:00', status: 'upcoming', type: 'predict' },  
            { id: 48, date: '2025-03-23', startTime: '16:30:00', status: 'ended', type: 'vote' },  
            { id: 49, date: '2025-03-25', startTime: '09:45:00', status: 'upcoming', type: 'predict' },  
            { id: 50, date: '2025-03-22', startTime: '11:30:00', status: 'ended', type: 'vote' },  
        ];  

        const savedLotteries = await Lottery.insertMany(lotteries); // Save all lotteries at once  
        res.status(201).json(savedLotteries); // Return the saved lotteries  
    } catch (error) {  
        res.status(400).json({ error: error.message });  
    }  
};  

module.exports = { getLotteryData, saveLotteries };
