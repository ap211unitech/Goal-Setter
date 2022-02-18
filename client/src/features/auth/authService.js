import axios from 'axios';

const URL = 'api/users';

// Register User
const register = async (user) => {
    const res = await axios.post(URL, user);
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data;
}

// Login User
const login = async (user) => {
    const res = await axios.post(`${URL}/login`, user);
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data;
}

// Logout User
const logout = () => {
    localStorage.removeItem('user');
}


export default {
    register,
    login,
    logout
}