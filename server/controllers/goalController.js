const asyncHandler = require('express-async-handler');

const Goal = require('../models/Goal');

// @Desc    Get All Goals
// @Route   GET /api/goals
// @Access  Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: 'Get Goals' });
})

// @Desc    Create New Goal
// @Route   POST /api/goals
// @Access  Private
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.text) {
        res.status(400)
        throw new Error('Please add a goal');
    }
    res.status(201).json({ msg: req.body });
})

// @Desc    Update Goal
// @Route   PUT /api/goals
// @Access  Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: `Update Goal ${req.params.id}` });
})


// @Desc    Delete Goal
// @Route   DELETE /api/goals
// @Access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: `Delete Goal ${req.params.id}` });
})

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}