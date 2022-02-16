const asyncHandler = require('express-async-handler');

const Goal = require('../models/Goal');

// @Desc    Get All Goals
// @Route   GET /api/goals
// @Access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
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
    const goal = new Goal({ text: req.body.text });
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
    const findGoal = await Goal.findById(req.params.id);
    if (!findGoal) {
        res.status(400)
        throw new Error('Goal Not found');
    }
    const goal = await Goal.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
    res.status(200).json(goal);
})


// @Desc    Delete Goal
// @Route   DELETE /api/goals
// @Access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const findGoal = await Goal.findById(req.params.id);
    if (!findGoal) {
        res.status(400)
        throw new Error('Goal Not found');
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