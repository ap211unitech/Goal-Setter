import React, { useState, useEffect, Fragment } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const onChange = (e) => {
        setFormData(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Fragment>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={formData.email}
                            placeholder='Enter your email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={formData.password}
                            placeholder='Enter password'
                            onChange={onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </Fragment>
    )
}

export default Login