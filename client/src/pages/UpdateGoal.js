import React, { useState, useEffect, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

function UpdateGoal(props) {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const [text, setText] = useState((location && location.state) ? location.state.text : '');

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }

    }, [user])

    const onSubmit = (e) => {
        e.preventDefault()

        if (text.trim().length == 0) {
            toast.error('Goal can not be empty');
        }
        else {
            // dispatch(createGoal(text))
            setText('');
            navigate('/');
            toast.success('Goal Updated');
        }
    }


    return (
        <Fragment>
            <section className='heading'>
                <h1>
                    <FaEdit /> Edit Goal
                </h1>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='text'>Goal</label>
                        <input
                            type='text'
                            name='text'
                            id='text'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block' type='submit'>
                            Edit Goal
                        </button>
                    </div>
                </form>
            </section>
        </Fragment>
    )
}

export default UpdateGoal