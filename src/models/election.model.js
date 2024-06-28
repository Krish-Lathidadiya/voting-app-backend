const mongoose = require('mongoose');

const electionSchema =new mongoose.Schema({
    name: {
        type: String,
        required: [true,"name is required"]
    },
    desc: {
        type: String,
        
    },
    startDate: {
        type: Date,
        required: [true,"start date is required"]

    },
    endDate: {
        type: Date,
        required: [true,"end date is required"]
    },
    startTime: {
        type: String, 
        required: [true,"start time is required"] 
    },
    endTime: {
        type: String,  
        required: [true,"end time is required"]
    }
});

const Election = mongoose.model('Election', electionSchema);
module.exports = Election;
