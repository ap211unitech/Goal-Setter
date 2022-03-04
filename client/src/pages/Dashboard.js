import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { getGoals } from "../features/goals/goalSlice";
import GoalItem from '../components/GoalItem';
import GoalForm from '../components/GoalForm';
import { toast } from 'react-toastify';

function Dashboard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { goals, isLoading, isError, message } = useSelector(state => state.goals);

    useEffect(() => {

        if (isError) {
            toast.error(message);
            console.log(message);
        }

        if (!user || !user.token) {
            navigate('/login');
        }
        else {
            dispatch(getGoals());
        }

    }, [user, isError, message, navigate, dispatch])


    if (isLoading) {
        return <Spinner />
    }

    return (
        <Fragment>
            <section className='heading'>
                <h1>Welcome {user && user.name.split(' ')[0]}</h1>
                <p>Goals Dashboard</p>
            </section>

            <GoalForm />

            <section className='content'>
                {goals.length > 0 ? (
                    <div className='goals'>
                        {goals.map((goal) => (
                            <GoalItem key={goal._id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any goals</h3>
                )}
            </section>
        </Fragment>
    )
}

export default Dashboard