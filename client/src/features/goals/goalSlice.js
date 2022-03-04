import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
    goals: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

// Get All Goals
export const getGoals = createAsyncThunk('/goals/get', async (_, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return await goalService.getGoals(token);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkApi.rejectWithValue(message);
    }
})

// Create a Goal
export const createGoal = createAsyncThunk('/goals/create', async (text, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return await goalService.createGoal(token, text);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkApi.rejectWithValue(message);
    }
})

// Update a Goal
export const updateGoal = createAsyncThunk('/goals/update', async ({ text, id }, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return await goalService.updateGoal(token, text, id);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkApi.rejectWithValue(message);
    }
})

// Delete a Goal
export const deleteGoal = createAsyncThunk('/goals/delete', async (id, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        return await goalService.deleteGoal(token, id);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkApi.rejectWithValue(message);
    }
})


export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGoals.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isSuccess = false
                state.goals = []
            })
            .addCase(createGoal.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.message = ''
                state.isSuccess = true
                state.goals = [...state.goals, action.payload]
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isSuccess = false
            })
            .addCase(updateGoal.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.message = ''
                state.isSuccess = true
                state.goals = state.goals.map(goal => goal._id.toString() == action.payload._id.toString() ? action.payload : goal);
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isSuccess = false
            })
            .addCase(deleteGoal.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.message = ''
                state.isSuccess = true
                state.goals = state.goals.filter(goal => goal._id != action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isSuccess = false
            })
    }
})

// export const { reset } = goalSlice.actions;
export default goalSlice.reducer;