const asyncHandler = require('express-async-handler');

const Goal = require('../models/Goal');
const User = require('../models/User');

// @Desc    Get All Goals
// @Route   GET /api/goals
// @Access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user._id });
    res.status(200).json(goals);
})

// @Desc    Create New Goal
// @Route   POST /api/goals
// @Access  Private
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.text) {
        res.status(400)
        throw new Error('Please add a goal');
    }
    const goal = new Goal({ user: req.user._id, text: req.body.text });
    await goal.save();
    res.status(201).json(goal);
})

// @Desc    Update Goal
// @Route   PUT /api/goals
// @Access  Private
const updateGoal = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.text) {
        res.status(400)
        throw new Error('Please add a goal');
    }

    // Check if user exists
    const userExists = await User.findById(req.user._id);
    if (!userExists) {
        res.status(400)
        throw new Error('User not exists');
    }

    // Check if goal exists
    const findGoal = await Goal.findById(req.params.id);
    if (!findGoal) {
        res.status(400)
        throw new Error('Goal Not found');
    }

    // Check if owner of Goal and logged in user are same 
    if (userExists._id.toString() !== findGoal.user.toString()) {
        res.status(400)
        throw new Error('Not authorized to update this goal');
    }

    const goal = await Goal.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
    res.status(200).json(goal);
})


// @Desc    Delete Goal
// @Route   DELETE /api/goals
// @Access  Private
const deleteGoal = asyncHandler(async (req, res) => {

    // Check if user exists
    const userExists = await User.findById(req.user._id);
    if (!userExists) {
        res.status(400)
        throw new Error('User not exists');
    }

    // Check if goal exists
    const findGoal = await Goal.findById(req.params.id);
    if (!findGoal) {
        res.status(400)
        throw new Error('Goal Not found');
    }

    // Check if owner of Goal and logged in user are same 
    if (userExists._id.toString() !== findGoal.user.toString()) {
        res.status(400)
        throw new Error('Not authorized to delete this goal');
    }

    await Goal.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ id: req.params.id, msg: 'Goal Deleted' });
})

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}