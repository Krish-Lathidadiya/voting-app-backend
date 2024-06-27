const mongoose = require('mongoose');

const electionSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,  
    },
    endTime: {
        type: String,  
    }
});

const Election = mongoose.model('Election', electionSchema);
module.exports = Election;
