import React, { Fragment } from 'react'
import { Navigate, useNavigate, Routes, Route } from 'react-router-dom';

const Post = () => {

    const status = 200;
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('Hello')
        navigate('/about')
    }

    if (status === 404) {
        return <Navigate to='/notFound' />
    }

    return (
        <Fragment>
            <h4>Post</h4>
            <button onClick={handleClick}>Click Here</button>

            <Routes>
                <Route
                    path='/show'
                    element={<h1>Hello World</h1>}
                />
            </Routes>
        </Fragment>
    )
}

export default Post