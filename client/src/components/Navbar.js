import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';

function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);

    const onLogOut = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <header className='header' >
            <div className="logo">
                <Link to='/'>GoalSetter</Link>
            </div>

            {user && user.token ?
                <ul>
                    <li>
                        <button className='btn' onClick={onLogOut} >
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>

                </ul> :
                <ul>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt />Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser />Register
                        </Link>
                    </li>
                </ul>
            }
        </header>
    )
}

export default Navbar