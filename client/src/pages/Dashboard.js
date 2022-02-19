import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { getGoals } from "../features/goals/goalSlice";
import GoalItem from '../components/GoalItem';
import GoalForm from '../components/GoalForm';

function Dashboard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { goals, isLoading, isError, message, isSuccess } = useSelector(state => state.goals);

    useEffect(() => {

        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login');
        }

        dispatch(getGoals());

    }, [user, isSuccess, isError, message, navigate, dispatch])


    if (isLoading) {
        return <Spinner />
    }

    return (
        <Fragment>
            <section className='heading'>
                <h1>Welcome {user && user.name}</h1>
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