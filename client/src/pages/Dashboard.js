import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Dashboard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, message, isSuccess } = useSelector(state => state.auth);

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }

        dispatch(reset());

    }, [user, isError, message, navigate, dispatch])


    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard