import axios from 'axios';

const URL = 'api/goals';

const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL, config);
    return res.data;
}

const createGoal = async (token, text) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const body = { text };
    const res = await axios.post(URL, body, config);
    return res.data;
}

const deleteGoal = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(`${URL}/${id}`, config);
    return res.data;
}

export default {
    getGoals,
    createGoal,
    deleteGoal
};