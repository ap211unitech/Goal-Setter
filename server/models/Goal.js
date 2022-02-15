const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    // user: {
    //     ref: 'users'
    // },
    text: {
        type: String,
        required: [true, 'Please add a goal']
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('goals', GoalSchema);