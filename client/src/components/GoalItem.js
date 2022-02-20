import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function GoalItem({ goal }) {
    const dispatch = useDispatch();

    const onDelete = () => {
        dispatch(deleteGoal(goal._id))
        toast.success('Goal Deleted');
    }

    return (
        <div className='goal'>
            <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
            <h2>{goal.text}</h2>
            <Link to='/update' state={{ text: goal.text, id: goal._id }} className='close' style={{ marginRight: 22, marginTop: -3 }} >
                <FaEdit />
            </Link>
            <button onClick={onDelete} className='close'>
                <FaTrash />
            </button>
        </div >
    )
}

export default GoalItem